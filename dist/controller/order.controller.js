"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const data_source_1 = require("../config/data-source");
class OrderController {
    async createOrder(req, res) {
        try {
            console.log('Creating order with data:', req.body);
            const orderRepo = data_source_1.AppDataSource.getRepository('Order');
            const imageRepo = data_source_1.AppDataSource.getRepository('SatelliteImage');
            const image = await imageRepo.findOne({
                where: { catalogID: req.body.imageId }
            });
            if (!image) {
                console.log('Image not found:', req.body.imageId);
                res.status(404).json({ message: 'Image not found' });
                return;
            }
            const order = orderRepo.create({
                customerEmail: req.body.email,
                satelliteImage: image
            });
            await orderRepo.save(order);
            console.log('Order created:', order);
            res.status(201).json(order);
        }
        catch (error) {
            console.error('Error creating order:', error);
            res.status(500).json({ message: 'Error creating order' });
        }
    }
    async getAllOrders(req, res) {
        try {
            const orders = await data_source_1.AppDataSource.getRepository('Order').find({
                relations: ['satelliteImage']
            });
            res.json(orders);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching orders' });
        }
    }
}
exports.OrderController = OrderController;
exports.default = OrderController;
