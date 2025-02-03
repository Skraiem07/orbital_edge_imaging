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
router.get('/satellite-images', (req, res) => SatelliteImageController.getAllImages(req, res));
router.get('/satellite-images/:id', (req, res) => SatelliteImageController.getImageById(req, res));
router.post('/satellite-images', (req, res) => SatelliteImageController.createImage(req, res));

// Orders
router.post('/orders', (req, res) => orderController.createOrder(req, res));
router.get('/orders', (req, res) => orderController.getAllOrders(req, res));

export default router;