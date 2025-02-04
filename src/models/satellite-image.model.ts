import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Geometry } from 'geojson';
import { Order } from './order.model';

@Entity({ name: 'satellite_image' }) 
export class SatelliteImage {
  @PrimaryColumn({ name: 'catalog_id' })
  catalogID!: string;

  @Column({ type: 'timestamptz' })
  acquisitionDateStart!: Date;

  @Column({ type: 'timestamptz' })
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

  @Column('geometry', { spatialFeatureType: 'Polygon', srid: 4326 })
  geometry!: Geometry;

  @OneToMany(
    () => Order, 
    order => order.satelliteImage,
    { cascade: true }
)
orders!: Order[];
}
