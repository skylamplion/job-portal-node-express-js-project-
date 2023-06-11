import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
    createJobsController,
    deleteJobController,
    getAllJobsController,
    jobsStatsController,
    updateJobController
} from '../controllers/jobsController.js'

const router = express.Router()

//routes

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       properties:
 *         company:
 *           type: string
 *           description: Company name
 *         position:
 *           type: string
 *           description: Job position
 *           maxLength: 100
 *         description:
 *           type: string
 *           description: Job description
 *           minLength: 100
 *         status:
 *           type: string
 *           description: Job status
 *           enum: [pending, reject, interview]
 *         workType:
 *           type: string
 *           description: Job work type
 *           enum: [full-time, part-time, internship, contract]
 *           default: full-time
 *         workLocation:
 *           type: string
 *           description: Job work location
 *           default: Mumbai
 *         createdBy:
 *           type: string
 *           description: ID of the user who created the job
 *       required:
 *         - company
 *         - position
 */

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job operations
 */

/**
 * @swagger
 * /create-job:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Error creating job

 */

//create Routes || post
router.post('/create-job', userAuth, createJobsController)

/**
 * @swagger
 * /get-job:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *       401:
 *         description: Unauthorized request
 *       500:
 *         description: Error retrieving jobs

 */

//GET jobs || GET
router.get('/get-job', userAuth, getAllJobsController)

/**
 * @swagger
 * /update-job/{id}:
 *   patch:
 *     summary: Update a job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the job
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: Job updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: Job not found
 *       500:
 *         description: Error updating job

 */

//UPDATE JOBS ||PUT ||PATCH
router.patch('/update-job/:id', userAuth, updateJobController)

/**
 * @swagger
 * /delete-job/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the job
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: Job not found
 *       500:
 *         description: Error deleting job

 */

//delete job || PUT|| PATCH
router.delete('/delete-job/:id', userAuth, deleteJobController)

/**
 * @swagger
 * /job-stats:
 *   get:
 *     summary: Get job statistics
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Job statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                   count:
 *                     type: number
 *       401:
 *         description: Unauthorized request
 */

//JOBS STATS FILTER || GET
router.get('/job-stats', userAuth, jobsStatsController)

export default router