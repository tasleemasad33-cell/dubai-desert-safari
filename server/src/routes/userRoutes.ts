import express from 'express';
import { getAllUsers, deleteUser } from '../controllers/userController';
import { adminAuth } from '../middleware/auth';

const router = express.Router();

router.get('/', adminAuth, getAllUsers);
router.delete('/:id', adminAuth, deleteUser);

export default router;
