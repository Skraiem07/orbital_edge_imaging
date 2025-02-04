import { Request, Response } from 'express';
import OrderService from '../services/order.service';

class OrderController {
  
  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { email, imageId } = req.body;

      if (!email || !imageId) {
        res.status(400).json({ message: 'Email and imageId are required' });
        return;
      }

      const order = await OrderService.createOrder(email, imageId);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
      } else {
        console.error('Unknown error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;

      const result = await OrderService.getAllOrders(page, limit);
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
      } else {
        console.error('Unknown error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}

export default new OrderController();