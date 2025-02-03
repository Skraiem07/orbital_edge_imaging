"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./config/data-source");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api', routes_1.default);
// Database connection with retries
const connectWithRetry = async (retries = 5, interval = 5000) => {
    try {
        await data_source_1.AppDataSource.initialize();
        console.log('Database connected!');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        if (retries > 0) {
            console.log(`Connection failed, retrying in ${interval / 1000}s... (${retries} left)`);
            setTimeout(() => connectWithRetry(retries - 1, interval), interval);
        }
        else {
            console.error('Failed to connect to database:', error);
            process.exit(1);
        }
    }
};
connectWithRetry();
