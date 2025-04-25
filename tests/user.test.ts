// tests/user.test.ts

import request from 'supertest';
import app from '../src/app'; // Adjust path if needed

describe('User Routes', () => {
  let createdUserId: number; // Track created user ID for later tests

  it('should create a new user', async () => {
    const res = await request(app).post('/api/v1/users').send({
      name: 'Alice',
      age: 5,
      class: 'Kindergarten'
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Alice');
    createdUserId = res.body.id;
  });

  it('should fail to create user with missing fields', async () => {
    const res = await request(app).post('/api/v1/users').send({
      age: 5
      // missing name and class
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'All fields are required');
  });

  it('should get all users', async () => {
    const res = await request(app).get('/api/v1/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.students)).toBe(true);
  });

  it('should get a user by ID', async () => {
    const res = await request(app).get(`/api/v1/users/${createdUserId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', createdUserId);
  });

  it('should return 404 for getting non-existent user', async () => {
    const res = await request(app).get('/api/v1/users/99999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message', 'User not found');
  });

  it('should update a user', async () => {
    const res = await request(app).put(`/api/v1/users/${createdUserId}`).send({
      name: 'Alice Updated',
      age: 6,
      class: 'Grade 1'
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Student details updated successfully');
    expect(res.body.user.name).toBe('Alice Updated');
  });

  it('should return 404 when updating non-existent user', async () => {
    const res = await request(app).put('/api/v1/users/99999').send({
      name: 'Nonexistent User',
      age: 99,
      class: 'Ghost Class'
    });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message', 'User not found');
  });

  it('should delete a user', async () => {
    const res = await request(app).delete(`/api/v1/users/${createdUserId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Student removed successfully');
  });

  it('should return 404 when deleting non-existent user', async () => {
    const res = await request(app).delete('/api/v1/users/99999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message', 'User not found');
  });
});
