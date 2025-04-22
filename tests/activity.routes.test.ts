import request from 'supertest';
import app from '../src/app';

describe('Activity Routes', () => {
  let activityId: string;

  it('should create an activity', async () => {
    const res = await request(app).post('/api/v1/activities').send({
      title: 'Painting',
      description: 'Art class for kids'
    });
    activityId = res.body.id;
    expect(res.status).toBe(201);
  });

  it('should get all activities', async () => {
    const res = await request(app).get('/api/v1/activities');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update an activity', async () => {
    const res = await request(app).put(`/api/v1/activities/${activityId}`).send({
      description: 'Updated art class'
    });
    expect(res.status).toBe(200);
  });

  it('should delete an activity', async () => {
    const res = await request(app).delete(`/api/v1/activities/${activityId}`);
    expect(res.status).toBe(200);
  });
});

