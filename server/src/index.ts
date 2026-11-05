import './loadEnv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import productRoutes from './routes/productRoutes';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from "./routes/authRoutes";

const start = async () => {
  await connectDB();

  const app = express();
  const PORT = process.env.PORT || 5000;

  // Middleware
  app.use(cors({ origin: 'http://localhost:3000' }));
  app.use(express.json());

  // Routes
  app.use('/api/products', productRoutes);
  app.use('/api/auth', authRoutes);
  // Error handler
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start().catch((err) => {
  console.error('Server start failed:', err);
  process.exit(1);
});