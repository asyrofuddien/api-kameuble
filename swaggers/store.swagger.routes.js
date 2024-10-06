/**
 * @swagger
 * /api/stores/create-store:
 *   post:
 *     summary: Create a new store
 *     tags: [Store]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - store_name
 *               - user_id
 *             properties:
 *               store_name:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                   city:
 *                     type: string
 *               user_id:
 *                 type: string
 *                 description: ID of the user who created the store
 *     responses:
 *       201:
 *         description: Store created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/stores/update-store/{store_id}:
 *   post:
 *     summary: Update an existing store
 *     tags: [Store]
 *     parameters:
 *       - in: path
 *         name: store_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the store to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               store_name:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                   city:
 *                     type: string
 *               user_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Store updated successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/stores:
 *   get:
 *     summary: Get all stores
 *     tags: [Store]
 *     responses:
 *       200:
 *         description: A list of all stores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The store ID
 *                   store_name:
 *                     type: string
 *                   address:
 *                     type: object
 *                     properties:
 *                       address:
 *                         type: string
 *                       city:
 *                         type: string
 *                   user_id:
 *                     type: string
 *                     description: ID of the user who created the store
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/stores/{store_id}:
 *   get:
 *     summary: Get one store by ID
 *     tags: [Store]
 *     parameters:
 *       - in: path
 *         name: store_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the store
 *     responses:
 *       200:
 *         description: Store details
 *       404:
 *         description: Store not found
 */
