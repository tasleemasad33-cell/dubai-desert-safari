import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  tour: mongoose.Types.ObjectId;
  bookingDate: Date;
  tourDate: Date;
  numberOfGuests: number;
  totalPrice: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  bookingStatus: 'confirmed' | 'cancelled' | 'completed';
  paymentId?: string;
  promoCode?: string;
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tour: { type: Schema.Types.ObjectId, ref: 'Tour', required: true },
  bookingDate: { type: Date, default: Date.now },
  tourDate: { type: Date, required: true },
  numberOfGuests: { type: Number, required: true, min: 1 },
  totalPrice: { type: Number, required: true },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'failed', 'refunded'], 
    default: 'pending' 
  },
  bookingStatus: { 
    type: String, 
    enum: ['confirmed', 'cancelled', 'completed'], 
    default: 'confirmed' 
  },
  paymentId: { type: String },
  promoCode: { type: String },
  specialRequests: { type: String },
}, { timestamps: true });

export default mongoose.model<IBooking>('Booking', BookingSchema);
