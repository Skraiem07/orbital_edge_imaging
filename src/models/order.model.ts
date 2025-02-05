import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SatelliteImage } from './satellite-image.model';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export  class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  customerEmail!: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  orderDate!: Date;

  @ManyToOne(() => SatelliteImage) 
  satelliteImage!: SatelliteImage;
}

