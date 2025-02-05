// src/controllers/satellite-image.controller.ts
import { Request, Response } from 'express';
import SatelliteImageService from '../services/satellite-image.service';
import { Between, LessThanOrEqual, MoreThanOrEqual, Raw } from 'typeorm';

class SatelliteImageController {
  async getAllImages(req: Request, res: Response): Promise<void> {
    try {
      const {
        acquisitionDateStart,
        acquisitionDateEnd,
        sensor,
        minResolution,
        maxResolution,
        maxCloudCoverage,
        areaOfInterest,
        page = 1,
        limit = 10,
      } = req.query;

      const filters: any = {};

      // Area of Interest (GeoJSON Polygon)
      if (areaOfInterest) {
        try {
          const aoi = JSON.parse(areaOfInterest as string);
          if (aoi.type !== 'Polygon' || !Array.isArray(aoi.coordinates)) {
            res.status(400).json({ message: 'Invalid GeoJSON Polygon in areaOfInterest parameter' });
            return;
          }
          filters.geometry = Raw(
            () => `ST_Intersects(geometry, ST_GeomFromGeoJSON(:geojson))`,
            { geojson: JSON.stringify(aoi) }
          );
        } catch (error) {
          res.status(400).json({ message: 'Invalid GeoJSON in areaOfInterest parameter' });
          return;
        }
      }

      // Date Range
      if (acquisitionDateStart && acquisitionDateEnd) {
        filters.acquisitionDateStart = Between(
          new Date(acquisitionDateStart as string),
          new Date(acquisitionDateEnd as string)
        );
      } else if (acquisitionDateStart) {
        filters.acquisitionDateStart = MoreThanOrEqual(new Date(acquisitionDateStart as string));
      } else if (acquisitionDateEnd) {
        filters.acquisitionDateStart = LessThanOrEqual(new Date(acquisitionDateEnd as string));
      }

      // Sensor
      if (sensor) {
        filters.sensor = sensor;
      }

      // Resolution Range
      if (minResolution && maxResolution) {
        filters.resolution = Between(
          parseFloat(minResolution as string),
          parseFloat(maxResolution as string)
        );
      } else if (minResolution) {
        filters.resolution = MoreThanOrEqual(parseFloat(minResolution as string));
      } else if (maxResolution) {
        filters.resolution = LessThanOrEqual(parseFloat(maxResolution as string));
      }

      // Cloud Coverage
      if (maxCloudCoverage) {
        filters.cloudCoverage = LessThanOrEqual(parseFloat(maxCloudCoverage as string));
      }

      // Fetch images with pagination
      const { images, totalItems, totalPages } = await SatelliteImageService.getAllImages(
        filters,
        parseInt(page as string),
        parseInt(limit as string)
      );

      res.json({
        images,
        pagination: {
          totalItems,
          totalPages,
          currentPage: parseInt(page as string),
          itemsPerPage: parseInt(limit as string),
        },
      });
    } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).json({ message: 'Error fetching images' });
    }
  }

  async createImage(req: Request, res: Response): Promise<void> {
    try {
      const image = await SatelliteImageService.createImage(req.body);
      res.status(201).json(image);
    } catch (error) {
      console.error('Error creating image:', error);
      res.status(500).json({ message: 'Error creating image' });
    }
  }

  async getImageById(req: Request, res: Response): Promise<void> {
    try {
      const image = await SatelliteImageService.getImageById(req.params.id);
      if (image) {
        res.json(image);
      } else {
        res.status(404).json({ message: 'Image not found' });
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).json({ message: 'Error fetching image' });
    }
  }
}

export default new SatelliteImageController();