// src/controller/SatelliteImageController.ts
import { Request, Response, RequestHandler } from 'express';
import { getRepository } from 'typeorm';
import { SatelliteImage } from '../entity/SatelliteImage';

// Explicitly type as RequestHandler
export const getSatelliteImages: RequestHandler = async (req: Request, res: Response) => {
    try {
        const satelliteImageRepository = getRepository(SatelliteImage);
        const satelliteImages = await satelliteImageRepository.find();
        res.json(satelliteImages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching images', error });
    }
};

// Add explicit type for parameters
export const getSatelliteImageById: RequestHandler<{ id: string }> = async (req, res) => {
    try {
        const satelliteImageRepository = getRepository(SatelliteImage);
        const id = parseInt(req.params.id);
        const satelliteImage = await satelliteImageRepository.findOne({ where: { id } });
        
        satelliteImage 
            ? res.json(satelliteImage)
            : res.status(404).json({ message: 'Satellite image not found' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching image', error });
    }
};

