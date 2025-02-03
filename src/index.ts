import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './config/data-source';
import router from './routes';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', router);

export default app;
// Database connection with retries
const connectWithRetry = async (retries = 5, interval = 5000) => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected!');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    if (retries > 0) {
      console.log(`Connection failed, retrying in ${interval/1000}s... (${retries} left)`);
      setTimeout(() => connectWithRetry(retries - 1, interval), interval);
    } else {
      console.error('Failed to connect to database:', error);
      process.exit(1);
    }
  }
};

connectWithRetry();