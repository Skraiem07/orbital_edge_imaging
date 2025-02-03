// __tests__/integration/satellite-images.test.ts
import request from 'supertest';
import { AppDataSource } from '../../src/config/data-source';
import app from '../../src/index';
import { SatelliteImage } from '../../src/entity/satellite-image.entity';

describe('Satellite Images API', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterEach(async () => {
    await AppDataSource.getRepository(SatelliteImage).delete({});
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  describe('GET /satellite-images', () => {
    it('should return empty array when no images exist', async () => {
      const response = await request(app).get('/api/satellite-images');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return satellite images', async () => {
      const repo = AppDataSource.getRepository(SatelliteImage);
      await repo.save({
        catalogID: 'SAT123',
        acquisitionDateStart: new Date(),
        // ... other required fields
      });

      const response = await request(app).get('/api/satellite-images');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });
  });
});