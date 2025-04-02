import request from 'supertest';
import app from '../src/app'; // Adjust if your Express app path differs

describe('User Routes', () => {
  it('GET /api/v1/users - should return 200', async () => {
    const res = await request(app).get('/api/v1/users');
    expect(res.status).toBe(200);
  });

  it('POST /api/v1/users - should create a user', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ name: 'John Doe', role: 'parent' });
    expect(res.status).toBe(201);
  });

  it('DELETE /api/v1/users/:id - should delete a user', async () => {
    const res = await request(app).delete('/api/v1/users/dummyUserId');
    expect(res.status).toBe(200);
  });
});