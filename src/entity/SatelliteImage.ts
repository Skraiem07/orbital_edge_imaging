import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Polygon } from 'typeorm';
import { Order } from './Order';


@Entity()
export class SatelliteImage {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    catalogID!: string;

    @Column()
    acquisitionDateStart!: Date;

    @Column()
    acquisitionDateEnd!: Date;

    @Column('float')
    offNadir!: number;

    @Column('float')
    resolution!: number;

    @Column('float')
    cloudCoverage!: number;

    @Column()
    sensor!: string;

    @Column()
    scanDirection!: string;

    @Column('float')
    satelliteElevation!: number;

    @Column()
    imageBands!: string;

    @Column('geometry', {
        spatialFeatureType: 'Polygon',
        srid: 4326 // Explicit SRID for WGS84
      })
      geometry!: Polygon;

    @OneToMany(
        () => Order, 
        order => order.satelliteImage,
        { cascade: true }
    )
    orders!: Order[];
}
export default SatelliteImage;