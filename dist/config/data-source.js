"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const order_entity_1 = __importDefault(require("../entity/order.entity"));
const satellite_image_entity_1 = __importDefault(require("../entity/satellite-image.entity"));
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'db',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || '1234',
    database: process.env.POSTGRES_DB || 'orbital_imaging',
    synchronize: true,
    logging: false,
    entities: [satellite_image_entity_1.default, order_entity_1.default],
    migrations: [],
    subscribers: [],
});
