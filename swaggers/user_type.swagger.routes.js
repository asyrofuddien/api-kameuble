/**
 * @swagger
 * /api/userTypes/GetAllUserType:
 *   get:
 *     summary: Get all user types
 *     tags: [UserTypes]
 *     responses:
 *       200:
 *         description: A list of user types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The user type ID
 *                   type_name:
 *                     type: string
 *                     description: The name of the user type
 *       500:
 *         description: Internal server error
 */
