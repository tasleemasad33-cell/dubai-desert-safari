const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ['user', 'admin', 'guide'], default: 'user' },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

async function createAdmin() {
  await mongoose.connect("mongodb+srv://tasleemasad33:Asad5762@cluster0.cgidqcu.mongodb.net/dubai-desert-adventures?retryWrites=true&w=majority&appName=Cluster0");
  
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  try {
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@dubaisafari.com',
      password: hashedPassword,
      role: 'admin',
      isVerified: true
    });
    console.log('Admin created successfully!');
    console.log('Email: admin@dubaisafari.com');
    console.log('Password: admin123');
  } catch (error) {
    if (error.code === 11000) {
      console.log('Admin already exists with this email.');
    } else {
      console.error(error);
    }
  }
  process.exit(0);
}

createAdmin().catch(console.error);
