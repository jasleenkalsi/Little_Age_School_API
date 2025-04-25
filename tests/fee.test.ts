import request from 'supertest';
import app from '../src/app';

describe('Fee Routes', () => {
  let feeId: string;

  it('should add fee', async () => {
    const res = await request(app).post('/api/v1/fees/stu001').send({
      amount: 1000,
      date: '2025-04-21'
    });
    feeId = res.body.fee?.id; // safer access
    expect(res.status).toBe(201);
    expect(feeId).toBeDefined();
  });

  it('should fail to add fee with missing amount', async () => {
    const res = await request(app).post('/api/v1/fees/stu001').send({
      date: '2025-04-21'
    });
    expect(res.status).toBe(400); // Bad request
    expect(res.body).toHaveProperty('message');
  });

  it('should get fees for valid student', async () => {
    const res = await request(app).get('/api/v1/fees/stu001');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get fees for non-existent student', async () => {
    const res = await request(app).get('/api/v1/fees/invalidstudent');
    expect(res.status).toBe(200); // depends on controller: empty array or 404
    expect(Array.isArray(res.body)).toBe(true); // Should still return an array
  });

  it('should update a fee', async () => {
    const res = await request(app).put(`/api/v1/fees/stu001/${feeId}`).send({
      amount: 1500,
      date: '2025-04-22'
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Fee updated successfully'); // adjust to your controller message
  });

  it('should fail to update a non-existent fee', async () => {
    const res = await request(app).put(`/api/v1/fees/stu001/nonexistentfeeid`).send({
      amount: 2000,
      date: '2025-04-23'
    });
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message', 'Fee not found'); // adjust if different
  });

  it('should delete fee', async () => {
    expect(feeId).toBeDefined();
    const res = await request(app).delete(`/api/v1/fees/stu001/${feeId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Fee deleted successfully'); // adjust if different
  });

  it('should fail to delete a non-existent fee', async () => {
    const res = await request(app).delete(`/api/v1/fees/stu001/nonexistentfeeid`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message', 'Fee not found'); // adjust if needed
  });
});
