import express from 'express';
import { createBooking, getMyBookings, getAllBookings, updateBookingStatus, deleteBooking } from '../controllers/bookingController';
import { auth, adminAuth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, createBooking);
router.get('/my', auth, getMyBookings);
router.get('/all', adminAuth, getAllBookings);
router.put('/:id/status', adminAuth, updateBookingStatus);
router.delete('/:id', adminAuth, deleteBooking);

export default router;
