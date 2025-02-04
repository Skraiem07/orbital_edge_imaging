import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SatelliteImage } from './satellite-image.model';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export  class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  customerEmail!: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  orderDate!: Date;

  @ManyToOne(() => SatelliteImage, (image) => image.orders)
  satelliteImage!: SatelliteImage;
}
