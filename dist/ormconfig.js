"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const SatelliteImage_1 = require("./entity/SatelliteImage");
const Order_1 = require("./entity/Order");
const ormconfig = {
    type: "postgres",
    host: process.env.DB_HOST || "localhost", // Use environment variable
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "1234",
    database: process.env.POSTGRES_DB || "orbital_edge_imaging",
    synchronize: true,
    logging: false,
    entities: [SatelliteImage_1.SatelliteImage, Order_1.Order],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
};
// Create a DataSource instance
const AppDataSource = new typeorm_1.DataSource(ormconfig);
// Retry mechanism for database connection
const retryDelay = 5000; // 5 seconds
const maxRetries = 5;
async function connectWithRetry(retries = 0) {
    try {
        await AppDataSource.initialize();
        console.log("Database connected successfully!");
    }
    catch (error) {
        if (retries < maxRetries) {
            console.log(`Database connection failed. Retrying in ${retryDelay / 1000} seconds...`);
            setTimeout(() => connectWithRetry(retries + 1), retryDelay);
        }
        else {
            console.error("Max retries reached. Failed to connect to the database:", error);
            process.exit(1);
        }
    }
}
// Start the connection process
connectWithRetry();
exports.default = AppDataSource;
