import { Request, Response } from 'express';
import Tour from '../models/Tour';

export const getAllTours = async (req: Request, res: Response) => {
  try {
    const filter = req.query.type ? { type: req.query.type } : {};
    const tours = await Tour.find(filter).sort({ createdAt: -1 });
    res.status(200).json(tours);
  } catch (error) {
    console.error('Error fetching tours:', error);
    res.status(500).json({ message: 'Error fetching tours', error });
  }
};

export const getTourBySlug = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findOne({ slug: req.params.slug });
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.status(200).json(tour);
  } catch (error) {
    console.error('Error fetching tour:', error);
    res.status(500).json({ message: 'Error fetching tour', error });
  }
};

export const createTour = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json(tour);
  } catch (error) {
    res.status(500).json({ message: 'Error creating tour', error });
  }
};

export const updateTour = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: 'Error updating tour', error });
  }
};

export const deleteTour = async (req: Request, res: Response) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Tour deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tour', error });
  }
};
