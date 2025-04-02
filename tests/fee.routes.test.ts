import request from 'supertest';
import app from '../src/app';

describe('Fee Routes', () => {
    it('POST /api/v1/fees/:student_id - should add fee', async () => {
      const res = await request(app)
        .post('/api/v1/fees/123')
        .send({ amount: 500, date: '2025-04-01' });
      expect(res.status).toBe(201);
    });
  
    it('GET /api/v1/fees/:student_id - should fetch fees', async () => {
      const res = await request(app).get('/api/v1/fees/123');
      expect(res.status).toBe(200);
    });
  });