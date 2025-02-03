"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_controller_1 = __importDefault(require("../controller/order.controller"));
const satellite_image_controller_1 = __importDefault(require("../controller/satellite-image.controller"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const imageController = new satellite_image_controller_1.default();
const orderController = new order_controller_1.default();
// Health check
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
// Satellite Images
router.get('/satellite-images', (req, res) => satellite_image_controller_1.default.getAllImages(req, res));
router.get('/satellite-images/:id', (req, res) => satellite_image_controller_1.default.getImageById(req, res));
router.post('/satellite-images', (req, res) => satellite_image_controller_1.default.createImage(req, res));
// Orders
router.post('/orders', (req, res) => orderController.createOrder(req, res));
router.get('/orders', (req, res) => orderController.getAllOrders(req, res));
exports.default = router;
