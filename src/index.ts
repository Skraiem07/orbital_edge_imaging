import 'reflect-metadata';
import express from 'express';
import router from './routes';
import { AppDataSource } from './config/data-source';
import { errorHandler } from './middleware/error.middleware';


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(errorHandler);
app.use('/api', router);

export default app;

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