import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SatelliteImage } from './satellite-image.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  customerEmail!: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  orderDate!: Date;

  @ManyToOne(() => SatelliteImage, (image) => image.orders)
  satelliteImage!: SatelliteImage;
}
export default Order;