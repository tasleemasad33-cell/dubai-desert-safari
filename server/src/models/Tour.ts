import mongoose, { Schema, Document } from 'mongoose';

export interface ITour extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice?: number;
  type: 'tour' | 'experience';
  category: string;
  duration: string;
  location: string;
  images: string[];
  videoUrl?: string;
  itinerary: {
    title: string;
    description: string;
  }[];
  included: string[];
  excluded: string[];
  pickupInfo: string;
  maxGroupSize: number;
  difficulty: 'easy' | 'moderate' | 'hard';
  ratingsAverage: number;
  ratingsQuantity: number;
  isFeatured: boolean;
  availability: {
    date: Date;
    slots: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const TourSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  type: { type: String, enum: ['tour', 'experience'], default: 'tour' },
  category: { type: String, required: true },
  duration: { type: String, required: true },
  location: { type: String, required: true },
  images: [{ type: String }],
  videoUrl: { type: String },
  itinerary: [{
    title: { type: String },
    description: { type: String }
  }],
  included: [{ type: String }],
  excluded: [{ type: String }],
  pickupInfo: { type: String },
  maxGroupSize: { type: Number },
  difficulty: { type: String, enum: ['easy', 'moderate', 'hard'], default: 'easy' },
  ratingsAverage: { type: Number, default: 4.5 },
  ratingsQuantity: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  availability: [{
    date: { type: Date },
    slots: { type: Number }
  }],
}, { timestamps: true });

export default mongoose.model<ITour>('Tour', TourSchema);
