/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import handleValidation from '../../middleware/handleValidation'
import User from '../../controller/UserController'

const user = new User()

const routes = express.Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users API
 * /api/v1/user/signup:
 *   post:
 *     tags: [Users]
 *     summary: Sign up new users
 *     requestBody:
 *       Summary: Create a new user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *         application/xml:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       default:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *         application/xml:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *       201:
 *         description: The new user signup.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       422:
 *         description: Un processed entity
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: mail@domain.com
 *         password:
 *           type: string
 *           example: 123Pass!@
 *         fullName:
 *           type: string
 *           example: 'John Doe'
 *       xml:
 *       name: User
 */
routes.post('/signup', handleValidation, user.signup)

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users API
 * /api/v1/user/signin:
 *   post:
 *     tags: [Users]
 *     summary: Sign in new users
 *     requestBody:
 *       Summary: Sign in a new user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *         application/xml:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       default:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *         application/xml:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *       201:
 *         description: The new user signed in.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       422:
 *         description: Un processed entity
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */
routes.post('/signin', handleValidation, user.signin)

export default routes
