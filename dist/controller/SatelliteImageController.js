"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSatelliteImageById = exports.getSatelliteImages = void 0;
const typeorm_1 = require("typeorm");
const SatelliteImage_1 = require("../entity/SatelliteImage");
const getSatelliteImages = async (req, res) => {
    const satelliteImageRepository = (0, typeorm_1.getRepository)(SatelliteImage_1.SatelliteImage);
    const satelliteImages = await satelliteImageRepository.find();
    res.json(satelliteImages);
};
exports.getSatelliteImages = getSatelliteImages;
const getSatelliteImageById = async (req, res) => {
    const satelliteImageRepository = (0, typeorm_1.getRepository)(SatelliteImage_1.SatelliteImage);
    const id = parseInt(req.params.id);
    const satelliteImage = await satelliteImageRepository.findOne({ where: { id } });
    if (satelliteImage) {
        res.json(satelliteImage);
    }
    else {
        res.status(404).json({ message: 'Satellite image not found' });
    }
};
exports.getSatelliteImageById = getSatelliteImageById;
exports.default = { getSatelliteImages: exports.getSatelliteImages, getSatelliteImageById: exports.getSatelliteImageById };
