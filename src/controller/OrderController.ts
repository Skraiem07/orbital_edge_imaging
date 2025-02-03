
import e, { Request, RequestHandler, Response } from 'express';
import { getRepository } from 'typeorm';
import { Order } from '../entity/Order';
import { SatelliteImage } from '../entity/SatelliteImage';

export const createOrder: RequestHandler = async (req: Request, res: Response) => {
    const orderRepository = getRepository(Order);
    const satelliteImageRepository = getRepository(SatelliteImage);

    const { customerName, satelliteImageId } = req.body;

    try {
        const satelliteImage = await satelliteImageRepository.findOne({ where: { id: satelliteImageId } });
        if (!satelliteImage) {
            res.status(404).json({ message: 'Satellite image not found' });
            return;
        }

        const order = orderRepository.create({ customerName, satelliteImage, orderDate: new Date() });
        await orderRepository.save(order);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};

export const getOrders = async (req: Request, res: Response) => {
    const orderRepository = getRepository(Order);
    const orders = await orderRepository.find({ relations: ['satelliteImage'] });
    res.json(orders);
};

export default { createOrder, getOrders };