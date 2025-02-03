import "reflect-metadata";
import express from 'express';
import { DataSource } from 'typeorm';
import routes from './routes/routes';
import AppDataSource from './ormconfig'; // Fixed import

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', routes);

const MAX_RETRIES = 10;
let retries = 0;

const connectWithRetry = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('Database connected successfully!');
    }

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    if (retries < MAX_RETRIES) {
      retries++;
      console.log(`Connection attempt ${retries}/${MAX_RETRIES}`);
      setTimeout(connectWithRetry, 10000);
    } else {
      console.error('Final connection failure:', error);
      process.exit(1);
    }
  }
};

connectWithRetry();