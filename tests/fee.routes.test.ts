import request from 'supertest';
import app from '../src/app';

describe('Fee Routes', () => {
  let feeId: string;

  it('should add fee', async () => {
    const res = await request(app).post('/api/v1/fees/stu001').send({
      amount: 1000,
      date: '2025-04-21'
    });
    feeId = res.body.id;
    expect(res.status).toBe(201);
  });

  it('should get fees', async () => {
    const res = await request(app).get('/api/v1/fees/stu001');
    expect(res.status).toBe(200);
  });

  it('should delete fee', async () => {
    const res = await request(app).delete(`/api/v1/fees/${feeId}`);
    expect(res.status).toBe(200);
  });
});

