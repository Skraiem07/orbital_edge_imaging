import { DataSource, DataSourceOptions } from 'typeorm';
import { SatelliteImage } from './entity/SatelliteImage';
import { Order } from './entity/Order';

const ormconfig: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "db", // Default to Docker service name
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "1234",
  database: process.env.POSTGRES_DB || "orbital_edge_imaging",
  synchronize: true,
  logging: false,
  entities: [SatelliteImage, Order],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
};

const AppDataSource = new DataSource(ormconfig);

export default AppDataSource;