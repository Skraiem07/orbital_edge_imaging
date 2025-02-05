import { Between, LessThanOrEqual, MoreThanOrEqual, Raw, Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { SatelliteImage } from '../models/satellite-image.model';

class SatelliteImageService {
  private imageRepository: Repository<SatelliteImage>;

  constructor() {
    this.imageRepository = AppDataSource.getRepository(SatelliteImage);
  }

  async getAllImages(
    filters: any,
    page: number,
    limit: number
  ): Promise<{ images: SatelliteImage[]; totalItems: number; totalPages: number }> {
    const totalItems = await this.imageRepository.count({ where: filters });
    const images = await this.imageRepository.find({
      where: filters,
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(totalItems / limit);
    return { images, totalItems, totalPages };
  }

  async createImage(imageData: Partial<SatelliteImage>): Promise<SatelliteImage> {
    const image = this.imageRepository.create(imageData);
    return await this.imageRepository.save(image);
  }

  async getImageById(catalogID: string): Promise<SatelliteImage | null> {
    return await this.imageRepository.findOne({ where: { catalogID } });
  }
}

export default new SatelliteImageService();