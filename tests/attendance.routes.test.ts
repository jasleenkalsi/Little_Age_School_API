import request from 'supertest';
import app from '../src/app';

describe('Attendance Routes', () => {
    it('POST /api/v1/attendance - should mark attendance', async () => {
      const res = await request(app)
        .post('/api/v1/attendance')
        .send({ student_id: '123', date: '2025-04-02', status: 'Present' });
      expect(res.status).toBe(200);
    });
  
    it('GET /api/v1/attendance/:student_id - should get attendance', async () => {
      const res = await request(app).get('/api/v1/attendance/123');
      expect(res.status).toBe(200);
    });
  });
  