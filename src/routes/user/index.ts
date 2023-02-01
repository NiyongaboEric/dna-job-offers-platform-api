/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import handleValidation from '../../middleware/handleValidation'
import AuthController from '../../controller/AuthController'
import User from '../../controller/UserController'
import verifyToken from '../../middleware/verifyToken'
import isAdmin from '../../middleware/checkAdmin'

const authenticate = new AuthController()
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
routes.post('/signup', handleValidation, authenticate.signup)

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
routes.post('/signin', handleValidation, authenticate.signin)

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: The Admin managing API
 * /api/v1/user/all:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: check token authentication
 *
 *     responses:
 *       200:
 *         description: The users response
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The users not found
 */
routes.get('/all', verifyToken, isAdmin, user.viewAllUsers)

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: The Admin/any user managing API
 * /api/v1/user/{user_id}:
 *   get:
 *     summary: Get a specific users
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: check token authentication
 *
 *       - in: path
 *         name: user_id
 *         description: name that need to be fetched
 *         required: true
 *         schema:
 *           type: string

 *     responses:
 *       200:
 *         description: The users response
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The users not found
 */
routes.get('/:user_id', handleValidation, verifyToken, user.viewSingleUser)

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Admin/any user managing API
 * /api/v1/user/edit/{user_id}:
 *   put:
 *     summary: (Admin all users/Any user own profile) Edit a specific users
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: check token authentication
 *
 *       - in: path
 *         name: user_id
 *         description: name that need to be deleted
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       Summary: Create a new user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditUser'
 *         application/xml:
 *           schema:
 *             $ref: '#/components/schemas/EditUser'

 *     responses:
 *       200:
 *         description: The users response
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EditUser'
 *       404:
 *         description: The users not found
 *
 * components:
 *   schemas:
 *     EditUser:
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
 *         user_id:
 *           type: string
 *           example: YOUR UUID ID
 *       xml:
 *       name: User
 */
routes.put('/edit/:user_id', handleValidation, verifyToken, user.editSingleUser)

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: The Admin/any user managing API
 * /api/v1/user/{user_id}:
 *   delete:
 *     summary: Delete any user as an admin and owner user self delete
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: check token authentication
 *
 *       - in: path
 *         name: user_id
 *         description: name that need to be deleted
 *         required: true
 *         schema:
 *           type: string

 *     responses:
 *       200:
 *         description: The users response
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The users not found
 */
routes.delete('/:user_id', handleValidation, verifyToken, user.deleteSingleUser)

export default routes
