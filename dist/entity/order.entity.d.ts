import { SatelliteImage } from './satellite-image.entity';
export declare class Order {
    id: number;
    customerEmail: string;
    orderDate: Date;
    satelliteImage: SatelliteImage;
}
export default Order;
