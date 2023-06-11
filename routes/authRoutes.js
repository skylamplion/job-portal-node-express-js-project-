import express from "express";
import { registerController, loginController } from "../controllers/authController.js";
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

//router object 
const router = express.Router()

//routes
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - lastName
 *         - email
 *         - password
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           description: The Auto-generated ID of the user collection
 *           example: F873XIODG0RH
 *         name:
 *           type: string
 *           description: User name
 *         lastName:
 *           type: string
 *           description: User last name
 *         password:
 *           type: string
 *           description: User password (length should be greater than 8 characters)
 *         email:
 *           type: string
 *           description: User email address
 *         location:
 *           type: string
 *           description: User location (city or country)
 *       example:
 *         id: NFIWEH354FBJ868GMV
 *         name: mike
 *         lastName: doe
 *         password: 12345678
 *         email: email@gmail.com
 *         location: hyderabad || india
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       require: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *          discription: internal server error 
 */


// register || post
router.post('/register', limiter, registerController)


/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         description: Login unsuccessful
 */

//login|| post
router.post('/login', limiter, loginController)

//export 
export default router