import { Router } from 'express';
import {
  addActivity,
  getActivities,
  updateActivity,
  deleteActivity
} from '../controllers/activity.controller';

const router = Router();

// Do NOT invoke the functions. Just pass their references.
router.post('/', addActivity);
router.get('/', getActivities);
router.put('/:id', updateActivity);
router.delete('/:id', deleteActivity);

export default router;
