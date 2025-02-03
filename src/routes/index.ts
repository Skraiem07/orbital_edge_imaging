import OrderController from '../controller/order.controller';
import SatelliteImageController from '../controller/satellite-image.controller';
import express from 'express';


const router = express.Router();
const imageController = new SatelliteImageController();
const orderController = new OrderController();

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Satellite Images
/**
 * @swagger
 * /api/satellite-images:
 *   get:
 *     description: Retrieve all satellite images
 *     responses:
 *       200:
 *         description: A list of satellite images
 */
router.get('/satellite-images', (req, res) => SatelliteImageController.getAllImages(req, res));
router.get('/satellite-images/:id', (req, res) => SatelliteImageController.getImageById(req, res));
router.post('/satellite-images', (req, res) => SatelliteImageController.createImage(req, res));

// Orders
/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               orderDate:
 *                 type: string
 *                 format: date-time
 *               satelliteImage:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post('/orders', (req, res) => orderController.createOrder(req, res));
router.get('/orders', (req, res) => orderController.getAllOrders(req, res));

export default router;