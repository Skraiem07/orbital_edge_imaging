import OrderController from '../controllers/order.controller';
import SatelliteImageController from '../controllers/satellite-image.controller';
import express from 'express';
import { validateRequest } from '../middleware/validation.middleware';
import { Order } from '../models/order.model';


const router = express.Router();


// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Satellite Images
router.get('/satellite-images', (req, res) => SatelliteImageController.getAllImages(req, res));
router.get('/satellite-images/:id', (req, res) => SatelliteImageController.getImageById(req, res));
router.post('/satellite-images', (req, res) => SatelliteImageController.createImage(req, res));

// Orders
router.post(
  '/orders',
  validateRequest(Order), // Add validation middleware
  OrderController.createOrder
);
router.get('/orders', OrderController.getAllOrders);

export default router;