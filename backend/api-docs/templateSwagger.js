/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     description: Fetches a user from the database using their unique ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to fetch.
 *         schema:
 *           type: string
 *           example: 60d21b4667d0d8992e610c85
 *     responses:
 *       200:
 *         description: Successfully retrieved the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user's ID.
 *                   example: 60d21b4667d0d8992e610c85
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                   example: example@example.com
 *                 username:
 *                   type: string
 *                   description: The user's username.
 *                   example: johndoe
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
