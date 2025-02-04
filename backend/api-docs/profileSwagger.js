/**
 * @swagger
 * /profile/{userId}:
 *   get:
 *     summary: Retrieve a user's profile
 *     description: Fetches a user's profile using their user ID, including their email and username.
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user whose profile is being fetched.
 *         schema:
 *           type: string
 *           example: 60d21b4667d0d8992e610c85
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: The ID of the user associated with the profile.
 *                 bio:
 *                   type: string
 *                   description: The user's bio.
 *                 socialLinks:
 *                   type: object
 *                   description: Social media links of the user.
 *                   properties:
 *                     twitter:
 *                       type: string
 *                       description: Twitter profile link.
 *                     linkedin:
 *                       type: string
 *                       description: LinkedIn profile link.
 *                 user:
 *                   type: object
 *                   description: User details.
 *                   properties:
 *                     email:
 *                       type: string
 *                       description: The user's email address.
 *                     username:
 *                       type: string
 *                       description: The user's username.
 *       400:
 *         description: Invalid userId format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid userId format
 *       404:
 *         description: Profile not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Profile not found
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error
 */
