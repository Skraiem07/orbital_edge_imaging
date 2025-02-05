import OrderController from '../controllers/order.controller';
import SatelliteImageController from '../controllers/satellite-image.controller';
import express from 'express';
import { validateRequest } from '../middleware/validation.middleware';
import { Order } from '../models/order.model';
import { SatelliteImage } from '../models/satellite-image.model';


const router = express.Router();



// Satellite Images
router.get('/satellite-images', SatelliteImageController.getAllImages);
router.get('/satellite-images/:id', SatelliteImageController.getImageById);
router.post(
  '/satellite-images',
  validateRequest(SatelliteImage), // Add validation middleware
  SatelliteImageController.createImage)

// Orders
router.post(
  '/orders',
  validateRequest(Order), // Add validation middleware
  OrderController.createOrder
);
router.get('/orders', OrderController.getAllOrders);

export default router;