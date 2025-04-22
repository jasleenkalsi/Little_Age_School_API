
// user.test.ts
import request from 'supertest';
import app from '../src/app';

describe('User Routes', () => {
  it('should create a new user', async () => {
    const res = await request(app).post('/api/v1/users').send({
      name: 'Alice',
      role: 'parent'
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should get all users', async () => {
    const res = await request(app).get('/api/v1/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

