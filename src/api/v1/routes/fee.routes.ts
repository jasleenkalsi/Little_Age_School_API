import { Router } from 'express';
import { createFee, getAllFees } from '../controllers/fee.controller';

const router = Router();

router.post('/', createFee);
router.get('/', getAllFees);

export default router;
