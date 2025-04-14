import { Router } from 'express';
import { createFee, getFees, deleteFee } from '../controllers/fee.controller';

const router = Router();

router.post('/:student_id', createFee);
router.get('/:student_id', getFees);
router.delete('/:fee_id', deleteFee);

export default router;
