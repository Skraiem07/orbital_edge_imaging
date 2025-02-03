"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const satellite_image_entity_1 = require("./entity/satellite-image.entity");
const order_entity_1 = require("./entity/order.entity");
const ormconfig = {
    type: "postgres",
    host: process.env.DB_HOST || "db", // Default to Docker service name
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "1234",
    database: process.env.POSTGRES_DB || "orbital_imaging",
    synchronize: true,
    logging: false,
    entities: [satellite_image_entity_1.SatelliteImage, order_entity_1.Order],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
};
const AppDataSource = new typeorm_1.DataSource(ormconfig);
exports.default = AppDataSource;
