// src/api/v1/routes/auth.routes.ts
import { Router } from 'express';
import { signup, login } from '../controllers/auth.controller';

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication related operations (signup, login)
 */

const router = Router();

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Missing or invalid fields
 *       500:
 *         description: Server error while registering user
 */
router.post('/signup', signup);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login an existing user and get an authentication token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully logged in, returns JWT token
 *       400:
 *         description: Invalid email or password
 *       401:
 *         description: Unauthorized, invalid credentials
 *       500:
 *         description: Server error while logging in user
 */
router.post('/login', login);

export default router;
