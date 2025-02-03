import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SatelliteImage } from './SatelliteImage';

@Entity({ name: 'purchase_order' })
export class Order {
    @PrimaryGeneratedColumn('increment', {
        name: 'order_id',  // Explicit sequence name
        primaryKeyConstraintName: 'PK_purchase_order_id'
    })
    id!: number;

    @Column()
    customerName!: string;

    @Column({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP'
    })
    orderDate!: Date;

    @ManyToOne(
        () => SatelliteImage, 
        satelliteImage => satelliteImage.orders,
        { onDelete: 'CASCADE' }
    )
    satelliteImage!: SatelliteImage;
}

export default Order;