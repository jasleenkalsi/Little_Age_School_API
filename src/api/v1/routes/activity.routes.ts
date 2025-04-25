import { Router } from 'express';
import {
  addActivity,
  getActivities,
  updateActivity,
  deleteActivity
} from '../controllers/activity.controller';

/**
 * @swagger
 * tags:
 *   - name: Activities
 *     description: Activities related operations
 */
const router = Router();

/**
 * @swagger
 * /api/v1/activities:
 *   post:
 *     tags: [Activities]
 *     summary: Add a new activity
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *               createdBy:
 *                 type: string
 *               participants:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Activity added successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Failed to add activity
 */
router.post('/', addActivity);

/**
 * @swagger
 * /api/v1/activities:
 *   get:
 *     tags: [Activities]
 *     summary: Retrieve all activities
 *     responses:
 *       200:
 *         description: List of all activities
 *       500:
 *         description: Failed to fetch activities
 */
router.get('/', getActivities);

/**
 * @swagger
 * /api/v1/activities/{id}:
 *   put:
 *     tags: [Activities]
 *     summary: Update an existing activity
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the activity to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Activity updated successfully
 *       404:
 *         description: Activity not found
 *       500:
 *         description: Failed to update activity
 */
router.put('/:id', updateActivity);

/**
 * @swagger
 * /api/v1/activities/{id}:
 *   delete:
 *     tags: [Activities]
 *     summary: Delete an activity
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the activity to delete
 *     responses:
 *       200:
 *         description: Activity deleted successfully
 *       404:
 *         description: Activity not found
 *       500:
 *         description: Failed to delete activity
 */
router.delete('/:id', deleteActivity);

export default router;
