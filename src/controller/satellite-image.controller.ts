import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { SatelliteImage } from '../entity/satellite-image.entity'; // Add this import
import { GeoJSON } from 'geojson';
import { Between, LessThanOrEqual, MoreThanOrEqual, Raw } from 'typeorm';

export class SatelliteImageController {

  static getAllImages = async (req: Request, res: Response) => {
    const imageRepo = AppDataSource.getRepository(SatelliteImage);
    try {
      console.log('Fetching all satellite images with filters and pagination...', req.query);
  
      // Existing filters
      const { 
        acquisitionDateStart, 
        acquisitionDateEnd, 
        sensor, 
        minResolution, 
        maxResolution, 
        maxCloudCoverage,
        areaOfInterest  // New GeoJSON filter
      } = req.query;
  
      // Pagination parameters
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
  
      const filters: any = {};
  
      // New GeoJSON filter logic
      if (areaOfInterest) {
        try {
          const aoi = JSON.parse(areaOfInterest as string);
          
          // Basic GeoJSON validation
          if (aoi.type !== 'Polygon' || !Array.isArray(aoi.coordinates)) {
            return res.status(400).json({ message: 'Invalid GeoJSON Polygon in areaOfInterest parameter' });
          }
          
          // Add spatial filter using PostGIS ST_Intersects
          filters.geometry = Raw(() => 
            `ST_Intersects(geometry, ST_GeomFromGeoJSON(:geojson))`, 
            { geojson: JSON.stringify(aoi) }
          );
        } catch (error) {
          return res.status(400).json({ message: 'Invalid GeoJSON in areaOfInterest parameter' });
        }
      }
  
      // Existing filter logic
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
  
      if (sensor) {
        filters.sensor = sensor;
      }
  
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
  
      if (maxCloudCoverage) {
        filters.cloudCoverage = LessThanOrEqual(parseFloat(maxCloudCoverage as string));
      }
  
      // Get total count and paginated results
      const totalItems = await imageRepo.count({ where: filters });
      const images = await imageRepo.find({
        where: filters,
        take: limit,
        skip: skip,
      });
  
      const totalPages = Math.ceil(totalItems / limit);
  
      console.log(`Found ${totalItems} images. Showing page ${page} of ${totalPages}`);
      
      res.json({
        images,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
          itemsPerPage: limit,
        }
      });
    } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).json({ message: 'Error fetching images' });
    }
  }
  //with filters and pagination
  /*static getAllImages = async (req: Request, res: Response) => {
    const imageRepo = AppDataSource.getRepository(SatelliteImage);
    try {
      console.log('Fetching all satellite images with filters and pagination...', req.query);
  
      
      const { acquisitionDateStart, acquisitionDateEnd, sensor, minResolution, maxResolution, maxCloudCoverage } = req.query;
      
      // Pagination parameters
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
  
      const filters: any = {};
  
      //filters
      if (acquisitionDateStart && acquisitionDateEnd) {
        filters.acquisitionDateStart = Between(new Date(acquisitionDateStart as string), new Date(acquisitionDateEnd as string));
      } else if (acquisitionDateStart) {
        filters.acquisitionDateStart = MoreThanOrEqual(new Date(acquisitionDateStart as string));
      } else if (acquisitionDateEnd) {
        filters.acquisitionDateStart = LessThanOrEqual(new Date(acquisitionDateEnd as string));
      }
  
      if (sensor) {
        filters.sensor = sensor;
      }
  
      if (minResolution && maxResolution) {
        filters.resolution = Between(parseFloat(minResolution as string), parseFloat(maxResolution as string));
      } else if (minResolution) {
        filters.resolution = MoreThanOrEqual(parseFloat(minResolution as string));
      } else if (maxResolution) {
        filters.resolution = LessThanOrEqual(parseFloat(maxResolution as string));
      }
  
      if (maxCloudCoverage) {
        filters.cloudCoverage = LessThanOrEqual(parseFloat(maxCloudCoverage as string));
      }
  
      // Get total count for pagination metadata
      const totalItems = await imageRepo.count({ where: filters });
  
      // Get paginated results
      const images = await imageRepo.find({
        where: filters,
        take: limit,
        skip: skip,
      });
  
      const totalPages = Math.ceil(totalItems / limit);
  
      console.log(`Found ${totalItems} images. Showing page ${page} of ${totalPages}`);
      
      res.json({
        images,
        pagination: {
          totalItems,
          totalPages,
          currentPage: page,
          itemsPerPage: limit,
        }
      });
    } catch (error) {
      console.error('Error fetching images:', error);
      res.status(500).json({ message: 'Error fetching images' });
    }
  }*/
/*
    static getAllImages = async (req: Request, res: Response) => {
      const imageRepo = AppDataSource.getRepository(SatelliteImage);
      try {
        console.log('Fetching all satellite images with filters...', req.query);
        
        const { acquisitionDateStart, acquisitionDateEnd, sensor, minResolution, maxResolution, maxCloudCoverage } = req.query;
        const filters: any = {};
        
        if (acquisitionDateStart && acquisitionDateEnd) {
          filters.acquisitionDateStart = Between(new Date(acquisitionDateStart as string), new Date(acquisitionDateEnd as string));
        } else if (acquisitionDateStart) {
          filters.acquisitionDateStart = MoreThanOrEqual(new Date(acquisitionDateStart as string));
        } else if (acquisitionDateEnd) {
          filters.acquisitionDateStart = LessThanOrEqual(new Date(acquisitionDateEnd as string));
        }
        
        if (sensor) {
          filters.sensor = sensor;
        }
        
        if (minResolution && maxResolution) {
          filters.resolution = Between(parseFloat(minResolution as string), parseFloat(maxResolution as string));
        } else if (minResolution) {
          filters.resolution = MoreThanOrEqual(parseFloat(minResolution as string));
        } else if (maxResolution) {
          filters.resolution = LessThanOrEqual(parseFloat(maxResolution as string));
        }
        
        if (maxCloudCoverage) {
          filters.cloudCoverage = LessThanOrEqual(parseFloat(maxCloudCoverage as string));
        }

        const images = await imageRepo.find({ where: filters });
        console.log('Filtered images found:', images);
        res.json(images);
      } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Error fetching images' });
      }
    }
  */
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
