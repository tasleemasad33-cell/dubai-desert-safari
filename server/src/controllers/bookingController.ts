import { Request, Response } from 'express';
import Booking from '../models/Booking';
import Tour from '../models/Tour';

export const createBooking = async (req: any, res: Response) => {
  try {
    const { tourId, tourDate, numberOfGuests, specialRequests } = req.body;

    const tour = await Tour.findById(tourId);
    if (!tour) return res.status(404).json({ message: 'Tour not found' });

    // Calculate total price
    const totalPrice = tour.price * numberOfGuests;

    const booking = await Booking.create({
      user: req.userId,
      tour: tourId,
      tourDate,
      numberOfGuests,
      totalPrice,
      specialRequests,
      paymentStatus: 'pending',
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
};

export const getMyBookings = async (req: any, res: Response) => {
  try {
    const bookings = await Booking.find({ user: req.userId }).populate('tour');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find().populate('tour').populate('user', 'name email');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { bookingStatus: status }, { new: true });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking status', error });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error });
  }
};
