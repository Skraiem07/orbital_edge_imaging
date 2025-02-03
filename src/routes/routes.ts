import express from 'express';
import { getSatelliteImageById, getSatelliteImages } from '../controller/SatelliteImageController';
import { createOrder, getOrders } from '../controller/OrderController';

const router = express.Router();

router.get('/satellite-images', getSatelliteImages);
router.get('/satellite-images/:id', getSatelliteImageById);
router.post('/orders', createOrder);
router.get('/orders', getOrders);

export default router;