import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI ?? process.env.MONGO_URI;
    if (!uri) {
      console.error('Database connection failed: missing MONGODB_URI/MONGO_URI');
      process.exit(1);
      return;
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Migration to stop: E11000 duplicate key ... dup key: { slug: null }
    // Reason: unique index on `slug` treats missing/null values as duplicates.
    // Fix:
    // 1) delete existing docs with slug:null
    // 2) recreate the `slug` unique index as sparse
    const db = mongoose.connection.db;
    if (!db) return;

    const coll = db.collection('products');

    const nullCount = await coll.countDocuments({ slug: null });
    if (nullCount > 0) {
      console.log(`[db] deleting ${nullCount} product(s) with slug:null`);
      await coll.deleteMany({ slug: null });
    }

    try {
      await coll.dropIndex('slug_1');
      console.log('[db] dropped old unique index slug_1');
    } catch (e: any) {
      const msg = String(e?.message || '');
      // Ignore "index not found" errors.
      if (!msg.toLowerCase().includes('index not found')) {
        console.log('[db] dropIndex(slug_1) skipped:', msg);
      }
    }

    await coll.createIndex(
      { slug: 1 },
      { unique: true, sparse: true, name: 'slug_1' }
    );
    console.log('[db] ensured sparse unique index on slug');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;