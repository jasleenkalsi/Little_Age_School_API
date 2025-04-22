import request from 'supertest';
import app from '../src/app';

describe('Attendance Routes', () => {
  let attendanceId: string;

  it('should mark attendance', async () => {
    const res = await request(app).post('/api/v1/attendance').send({
      student_id: 'stu001',
      date: '2025-04-21',
      status: 'Present'
    });
    attendanceId = res.body.id;
    expect(res.status).toBe(201);
  });

  it('should get attendance by student', async () => {
    const res = await request(app).get('/api/v1/attendance/stu001');
    expect(res.status).toBe(200);
  });

  it('should update attendance', async () => {
    const res = await request(app).put(`/api/v1/attendance/${attendanceId}`).send({
      status: 'Absent'
    });
    expect(res.status).toBe(200);
  });

  it('should delete attendance', async () => {
    const res = await request(app).delete(`/api/v1/attendance/${attendanceId}`);
    expect(res.status).toBe(200);
  });
});