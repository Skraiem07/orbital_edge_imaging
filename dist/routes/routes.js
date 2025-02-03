"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.ts
const express_1 = __importDefault(require("express"));
const SatelliteImageController_1 = require("../controller/SatelliteImageController");
const OrderController_1 = require("../controller/OrderController");
const router = express_1.default.Router();
router.get('/satellite-images', SatelliteImageController_1.getSatelliteImages);
router.get('/satellite-images/:id', SatelliteImageController_1.getSatelliteImageById);
router.post('/orders', OrderController_1.createOrder);
router.get('/orders', OrderController_1.getOrders);
exports.default = router;
