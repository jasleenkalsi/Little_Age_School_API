import { db } from '../../../../config/firebase';
import { Attendance } from '../models/attendance.model';

const attendanceRef = db.collection('attendance');

export const AttendanceRepository = {
  async mark(data: Attendance): Promise<Attendance> {
    const docRef = await attendanceRef.add(data);
    return { id: docRef.id, ...data };
  },
  async getAll(): Promise<Attendance[]> {
    const snapshot = await attendanceRef.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Attendance) }));
  }
};