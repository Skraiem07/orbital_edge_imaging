"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SatelliteImageController = void 0;
const data_source_1 = require("../config/data-source");
const satellite_image_entity_1 = require("../entity/satellite-image.entity"); // Add this import
class SatelliteImageController {
    static getAllImages = async (req, res) => {
        const imageRepo = data_source_1.AppDataSource.getRepository(satellite_image_entity_1.SatelliteImage);
        try {
            console.log('Fetching all satellite images...');
            const images = await imageRepo.find();
            console.log('Images found:', images);
            res.json(images);
        }
        catch (error) {
            console.error('Error fetching images:', error);
            res.status(500).json({ message: 'Error fetching images' });
        }
    };
    static createImage = async (req, res) => {
        const imageRepo = data_source_1.AppDataSource.getRepository(satellite_image_entity_1.SatelliteImage);
        try {
            console.log('Creating image with data:', req.body);
            const image = imageRepo.create(req.body);
            await imageRepo.save(image);
            console.log('Image created:', image);
            res.status(201).json(image);
        }
        catch (error) {
            console.error('Error creating image:', error);
            res.status(500).json({ message: 'Error creating image' });
        }
    };
    static getImageById = async (req, res) => {
        const imageRepo = data_source_1.AppDataSource.getRepository(satellite_image_entity_1.SatelliteImage);
        try {
            const image = await imageRepo.findOne({
                where: { catalogID: req.params.id }
            });
            image ? res.json(image) : res.status(404).json({ message: 'Image not found' });
        }
        catch (error) {
            console.error('Error fetching image:', error);
            res.status(500).json({ message: 'Error fetching image' });
        }
    };
}
exports.SatelliteImageController = SatelliteImageController;
exports.default = SatelliteImageController;
