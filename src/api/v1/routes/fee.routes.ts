// src/api/v1/routes/fee.routes.ts
import { Router } from 'express';
import { createFee, getFees, deleteFee } from '../controllers/fee.controller';

/**
 * @swagger
 * tags:
 *   - name: Fees
 *     description: Fee related operations (create, get, delete fees)
 */

const router = Router();

/**
 * @swagger
 * /api/v1/fees/{student_id}:
 *   post:
 *     tags: [Fees]
 *     summary: Add a fee for a student
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 format: float
 *               datePaid:
 *                 type: string
 *                 format: date
 *               term:
 *                 type: string
 *     responses:
 *       201:
 *         description: Fee successfully added
 *       400:
 *         description: Invalid data provided
 *       500:
 *         description: Server error while adding fee
 */
router.post('/:student_id', createFee);

/**
 * @swagger
 * /api/v1/fees/{student_id}:
 *   get:
 *     tags: [Fees]
 *     summary: Get all fees for a student
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of all fees for the student
 *       404:
 *         description: No fees found for the student
 *       500:
 *         description: Server error while fetching fees
 */
router.get('/:student_id', getFees);

/**
 * @swagger
 * /api/v1/fees/{fee_id}:
 *   delete:
 *     tags: [Fees]
 *     summary: Delete a fee record
 *     parameters:
 *       - in: path
 *         name: fee_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fee successfully deleted
 *       404:
 *         description: Fee record not found
 *       500:
 *         description: Server error while deleting fee
 */
router.delete('/:fee_id', deleteFee);

export default router;
