import express from 'express';
import { getAllTours, getTourBySlug, createTour, updateTour, deleteTour } from '../controllers/tourController';
import { adminAuth } from '../middleware/auth';

const router = express.Router();

router.get('/', getAllTours);
router.get('/:slug', getTourBySlug);
router.post('/', adminAuth, createTour);
router.put('/:id', adminAuth, updateTour);
router.delete('/:id', adminAuth, deleteTour);

export default router;
