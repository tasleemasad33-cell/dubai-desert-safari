import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin' | 'guide';
  avatar?: string;
  phone?: string;
  wishlist: mongoose.Types.ObjectId[];
  isVerified: boolean;
  otp?: string;
  otpExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ['user', 'admin', 'guide'], default: 'user' },
  avatar: { type: String },
  phone: { type: String },
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Tour' }],
  isVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpires: { type: Date },
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
