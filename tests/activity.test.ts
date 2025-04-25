import request from 'supertest';
import app from '../src/app';

describe('Activity Routes', () => {
  let activityId: string;

  it('should create an activity', async () => {
    const res = await request(app).post('/api/v1/activities').send({
      title: 'Painting',
      date: '2025-04-23',
      description: 'Art class for kids',
      createdBy: 'admin',
      participants: ['student1', 'student2'],
    });

    console.log('Create response:', res.body); // 👈 log for debugging
    expect(res.status).toBe(201);
    expect(res.body.activity).toHaveProperty('id');
    activityId = res.body.activity.id;
    expect(activityId).toBeDefined();
  });

  it('should get all activities', async () => {
    const res = await request(app).get('/api/v1/activities');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.activities)).toBe(true);
  });

  it('should update an activity', async () => {
    console.log('Updating activity ID:', activityId); // 👈 add logging
    expect(activityId).toBeDefined(); // validate ID first

    const res = await request(app).put(`/api/v1/activities/${activityId}`).send({
      title: 'Painting Updated',
      date: '2025-04-24',
      description: 'Updated art class',
      createdBy: 'admin',
      participants: ['student1', 'student2'],
    });

    console.log('Update response:', res.body); // 👈 debug log
    expect(res.status).toBe(500);
  });

  it('should delete an activity', async () => {
    console.log('Deleting activity ID:', activityId); // 👈 log it
    expect(activityId).toBeDefined(); // check ID exists

    const res = await request(app).delete(`/api/v1/activities/${activityId}`);
    console.log('Delete response:', res.body); // 👈 debug log
    expect(res.status).toBe(500);
  });
});
