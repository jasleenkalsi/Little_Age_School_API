import request from 'supertest';
import app from '../src/app';

describe('Auth Routes', () => {
  it('should signup a user', async () => {
    const res = await request(app).post('/api/v1/auth/signup').send({
      email: 'testuser@example.com',
      password: 'securePass123'
    });
    expect(res.status).toBe(200);
  });

  it('should login a user', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'testuser@example.com',
      password: 'securePass123'
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
