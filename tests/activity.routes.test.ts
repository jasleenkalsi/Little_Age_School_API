import request from 'supertest';
import app from '../src/app';

describe('Activity Routes', () => {
    it('POST /api/v1/activities - should add activity', async () => {
      const res = await request(app)
        .post('/api/v1/activities')
        .send({ title: 'Art Day', date: '2025-04-10' });
      expect(res.status).toBe(200);
    });
  
    it('GET /api/v1/activities - should get all activities', async () => {
      const res = await request(app).get('/api/v1/activities');
      expect(res.status).toBe(200);
    });
  });
  