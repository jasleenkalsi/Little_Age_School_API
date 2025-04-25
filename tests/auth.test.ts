import request from 'supertest';
import app from '../src/app';

describe('Auth Routes', () => {
  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'securePass123',
    role: 'parent'
  };

  it('should signup a user successfully', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send(testUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('user');
  });

  it('should not allow duplicate signup', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send(testUser);

    expect(res.status).toBe(409); // or 409 based on your controller (adjust)
    expect(res.body).toHaveProperty('message'); // Duplicate email error expected
  });

  it('should fail signup with missing fields', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'incomplete@example.com'
        // Missing password and name
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  it('should login a user successfully', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail login with wrong password', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testUser.email,
        password: 'wrongPassword123'
      });

    expect(res.status).toBe(401); // or 401 depending on your controller
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });

  it('should fail login with non-existent user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'somepassword'
      });

    expect(res.status).toBe(404); // or 404 depending on your controller
    expect(res.body).toHaveProperty('message', 'User not found');
  });


  it('should fail login with missing fields', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com'
        // Missing password
      });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message');
  });
});
