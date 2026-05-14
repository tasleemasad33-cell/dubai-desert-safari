import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import tourRoutes from './routes/tourRoutes';
import bookingRoutes from './routes/bookingRoutes';
import userRoutes from './routes/userRoutes';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

// Basic Route
app.get('/', (req: Request, res: Response) => {
  res.send('Dubai Desert Adventures API is running...');
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://tasleemasad33:Asad5762@cluster0.cgidqcu.mongodb.net/dubai-desert-adventures?retryWrites=true&w=majority&appName=Cluster0';
console.log('--- DB CONNECTION ATTEMPT ---');
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
if (process.env.MONGODB_URI) {
    console.log('URI Start:', process.env.MONGODB_URI.substring(0, 15));
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Successfully connected to MongoDB'))
  .catch((err) => {
      console.error('❌ MongoDB connection error:', err);
  });

// For Vercel, we export the app
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
