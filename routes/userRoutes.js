import express from "express";
import userAuth from './../middlewares/authMiddleware.js';
import { updateUserController } from "../controllers/userController.js";

//router object
const router = express.Router()

//routes
//GET USER || GET

/**
 * @swagger
 * /api/v1/update-user:
 *   put:
 *     summary: Update user information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */

//UDATE USER || PUT
router.put('/update-user', userAuth, updateUserController);

export default router;