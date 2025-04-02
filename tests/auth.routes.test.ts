import request from 'supertest';
import app from '../src/app';

describe('Auth Routes', () => {
    it('POST /api/v1/auth/signup - should register a new user', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({ email: 'test@example.com', password: 'password123' });
      expect(res.status).toBe(200);
    });
  
    it('POST /api/v1/auth/login - should login user', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'test@example.com', password: 'password123' });
      expect(res.status).toBe(200);
    });
  });
  