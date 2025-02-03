import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { SatelliteImage } from '../entity/satellite-image.entity'; // Add this import

export class SatelliteImageController {
  static getAllImages = async (req: Request, res: Response) => {
    const imageRepo = AppDataSource.getRepository(SatelliteImage);
    try {
      console.log('Fetching all satellite images...');
      const images = await imageRepo.find();      
      console.log('Images found:', images);
      res.json(images);
    } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).json({ message: 'Error fetching images' });
    }
  }
static createImage = async (req: Request, res: Response) => {
    const imageRepo = AppDataSource.getRepository(SatelliteImage);
    try {
      console.log('Creating image with data:', req.body);
      const image = imageRepo.create(req.body);
      await imageRepo.save(image);
      console.log('Image created:', image);
      res.status(201).json(image);
    } catch (error) {
      console.error('Error creating image:', error);
      res.status(500).json({ message: 'Error creating image' });
    }
  }
  static getImageById = async (req: Request, res: Response)=> {
    const imageRepo = AppDataSource.getRepository(SatelliteImage);
    try {
      const image = await imageRepo.findOne({
        where: { catalogID: req.params.id }
      });
      
      image ? res.json(image) : res.status(404).json({ message: 'Image not found' });
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).json({ message: 'Error fetching image' });
    }
  }
}
export default SatelliteImageController;
