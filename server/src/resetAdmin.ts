import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User';

dotenv.config();

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dubai-desert-adventures');
    
    await User.deleteOne({ email: 'admin@dubaidesert.com' });
    
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    await User.create({
      name: 'Super Admin',
      email: 'admin@dubaidesert.com',
      password: hashedPassword,
      role: 'admin',
      isVerified: true
    });
    
    console.log('Admin reset successfully with password: admin123');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

resetAdmin();
