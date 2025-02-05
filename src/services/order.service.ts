import { Order } from '../models/order.model';
import { SatelliteImage } from '../models/satellite-image.model';
import { AppDataSource } from '../config/data-source';

class OrderService {
  private orderRepository = AppDataSource.getRepository(Order);
  private imageRepository = AppDataSource.getRepository(SatelliteImage);

  async createOrder(customerEmail: string, imageId: string) {
    const image = await this.imageRepository.findOne({
      where: { catalogID: imageId },
    });

    if (!image) {
      throw new Error('Image not found');
    }

    const order = this.orderRepository.create({
      customerEmail: customerEmail,
      satelliteImage: image,
    });

    return await this.orderRepository.save(order);
  }

  async getAllOrders(page: number, limit: number) {
    const [orders, total] = await this.orderRepository.findAndCount({
      relations: ['satelliteImage'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

export default new OrderService();