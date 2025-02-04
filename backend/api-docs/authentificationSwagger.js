/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with email, password, and username.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *               username:
 *                 type: string
 *                 description: The user's chosen username.
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 user:
 *                   type: object
 *                   description: The created user object
 *       400:
 *         description: Missing or invalid fields.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /registerWithProfile:
 *   post:
 *     summary: Register a new user with a default profile
 *     description: Registers a new user and creates a default profile for them.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       201:
 *         description: User and profile created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: The created user object.
 *                 profile:
 *                   type: object
 *                   description: The created profile object.
 *       400:
 *         description: Missing or invalid fields.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     description: Logs a user in and returns a JWT token.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in and token returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticating further requests.
 *       400:
 *         description: Invalid credentials.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /getAllEmails:
 *   get:
 *     summary: Get all user emails
 *     description: Retrieves a list of all registered user emails.
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user emails.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 emails:
 *                   type: array
 *                   items:
 *                     type: string
 *       403:
 *         description: Forbidden access (unauthorized).
 *       404:
 *         description: No users found.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /deleteUser/{userId}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user by their ID along with their profile (if available).
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User and their profile (if found) deleted successfully.
 *       400:
 *         description: Invalid or missing user ID.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */