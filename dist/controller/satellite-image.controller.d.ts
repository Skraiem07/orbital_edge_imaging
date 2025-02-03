import { Request, Response } from 'express';
export declare class SatelliteImageController {
    static getAllImages: (req: Request, res: Response) => Promise<void>;
    static createImage: (req: Request, res: Response) => Promise<void>;
    static getImageById: (req: Request, res: Response) => Promise<void>;
}
export default SatelliteImageController;
