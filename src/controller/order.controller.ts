import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';

export class OrderController {
  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      console.log('Creating order with data:', req.body);
      const orderRepo = AppDataSource.getRepository('Order');
      const imageRepo = AppDataSource.getRepository('SatelliteImage');
      
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
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Error creating order' });
    }
  }

  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const orderRepo = AppDataSource.getRepository('Order');
      const { email, startDate, endDate, imageId } = req.query;
      
      let query = orderRepo.createQueryBuilder('order').leftJoinAndSelect('order.satelliteImage', 'satelliteImage');
      
      if (email) {
        query = query.andWhere('order.customerEmail = :email', { email });
      }
      if (startDate) {
        query = query.andWhere('order.orderDate >= :startDate', { startDate });
      }
      if (endDate) {
        query = query.andWhere('order.orderDate <= :endDate', { endDate });
      }
      if (imageId) {
        query = query.andWhere('satelliteImage.catalogID = :imageId', { imageId });
      }
      
      const orders = await query.getMany();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders' });
    }
  }
}
export default OrderController;
