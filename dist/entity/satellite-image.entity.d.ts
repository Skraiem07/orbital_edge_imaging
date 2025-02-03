import { Geometry } from 'geojson';
import { Order } from './order.entity';
export declare class SatelliteImage {
    catalogID: string;
    acquisitionDateStart: Date;
    acquisitionDateEnd: Date;
    offNadir: number;
    resolution: number;
    cloudCoverage: number;
    sensor: string;
    scanDirection: string;
    satelliteElevation: number;
    imageBands: string;
    geometry: Geometry;
    orders: Order[];
}
export default SatelliteImage;
