"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/api', routes_1.default);
const AppDataSource = require('./ormconfig').default;
const MAX_RETRIES = 5;
let retries = 0;
const connectWithRetry = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Database connected successfully!');
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    }
    catch (error) {
        if (retries < MAX_RETRIES) {
            retries++;
            console.log(`Connection attempt ${retries}/${MAX_RETRIES}`);
            setTimeout(connectWithRetry, 5000);
        }
        else {
            console.error('Database connection failed:', error);
            process.exit(1);
        }
    }
};
connectWithRetry();
