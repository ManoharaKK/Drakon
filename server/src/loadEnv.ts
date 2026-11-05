import path from 'path';
import dotenv from 'dotenv';

// Must run before any module that reads process.env (e.g. cloudinary config).
dotenv.config({ path: path.join(process.cwd(), '.env') });
dotenv.config({ path: path.join(process.cwd(), 'src', '.env'), override: true });
