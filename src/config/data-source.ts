import Order from '../entity/order.entity';
import SatelliteImage from '../entity/satellite-image.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'db',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '1234',
  database: process.env.POSTGRES_DB || 'orbital_imaging',
  synchronize: true,
  logging: false,
  entities: [SatelliteImage, Order],
  migrations: [],
  subscribers: [],
});