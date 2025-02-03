import { AppDataSource } from '../src/config/data-source';

// Initialize the database connection before all tests
beforeAll(async () => {
  await AppDataSource.initialize();
});

// Close the database connection after all tests
afterAll(async () => {
  await AppDataSource.destroy();
});