"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.createOrder = void 0;
const typeorm_1 = require("typeorm");
const Order_1 = require("../entity/Order");
const SatelliteImage_1 = require("../entity/SatelliteImage");
const createOrder = async (req, res) => {
    const orderRepository = (0, typeorm_1.getRepository)(Order_1.Order);
    const satelliteImageRepository = (0, typeorm_1.getRepository)(SatelliteImage_1.SatelliteImage);
    const { customerName, satelliteImageId } = req.body;
    try {
        const satelliteImage = await satelliteImageRepository.findOne({ where: { id: satelliteImageId } });
        if (!satelliteImage) {
            res.status(404).json({ message: 'Satellite image not found' });
            return; // <-- Use `return` to exit the function
        }
        const order = orderRepository.create({ customerName, satelliteImage, orderDate: new Date() });
        await orderRepository.save(order);
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};
exports.createOrder = createOrder;
const getOrders = async (req, res) => {
    const orderRepository = (0, typeorm_1.getRepository)(Order_1.Order);
    const orders = await orderRepository.find({ relations: ['satelliteImage'] });
    res.json(orders);
};
exports.getOrders = getOrders;
exports.default = { createOrder: exports.createOrder, getOrders: exports.getOrders };
