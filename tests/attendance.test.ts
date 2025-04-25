import request from 'supertest';
import app from '../src/app';

describe('Attendance Routes', () => {
  let date = '2025-04-21';
  let studentId = 'stu001';

  it('should mark attendance successfully', async () => {
    const res = await request(app).post('/api/v1/attendance').send({
      student_id: studentId,
      date,
      status: 'Present'
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Attendance marked successfully'); // Adjust if different
  });

  it('should fail to mark attendance with missing fields', async () => {
    const res = await request(app).post('/api/v1/attendance').send({
      student_id: studentId,
      status: 'Present'
      // missing date
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  it('should get attendance by student successfully', async () => {
    const res = await request(app).get(`/api/v1/attendance/${studentId}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.records)).toBe(true);
  });

  it('should return 404 when getting attendance for non-existent student', async () => {
    const res = await request(app).get(`/api/v1/attendance/nonexistentstudent`);
    expect(res.status).toBe(404); // ✅ updated
    expect(res.body).toHaveProperty('message', 'No records found');
 // ✅ updated
  });

  it('should update attendance successfully', async () => {
    const encodedDate = encodeURIComponent(date);
    const res = await request(app)
      .put(`/api/v1/attendance/${studentId}/${encodedDate}`)
      .send({ status: 'Absent' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Attendance updated successfully'); // Adjust if different
  });

  it('should fail to update attendance with missing status', async () => {
    const encodedDate = encodeURIComponent(date);
    const res = await request(app)
      .put(`/api/v1/attendance/${studentId}/${encodedDate}`)
      .send({});
    
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  it('should delete attendance successfully', async () => {
    const encodedDate = encodeURIComponent(date);
    const res = await request(app).delete(`/api/v1/attendance/${studentId}/${encodedDate}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Attendance deleted successfully'); // Adjust if different
  });

  it('should fail to delete non-existent attendance', async () => {
    const randomDate = encodeURIComponent('2025-04-30');
    const res = await request(app).delete(`/api/v1/attendance/${studentId}/${randomDate}`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message', 'Record not found'); // Adjust if different
  });
});
