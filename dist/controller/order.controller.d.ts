import { Request, Response } from 'express';
export declare class OrderController {
    createOrder(req: Request, res: Response): Promise<void>;
    getAllOrders(req: Request, res: Response): Promise<void>;
}
export default OrderController;
