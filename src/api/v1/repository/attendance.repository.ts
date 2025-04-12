import { db } from '../../../../config/firebase';
import { Attendance } from '../models/attendance.model';

const attendanceRef = db.collection('attendance');

async function mark(data: Omit<Attendance, 'id'>): Promise<Attendance> {
  const docRef = await attendanceRef.add(data);
  return { id: docRef.id, ...data };
}

async function getAll(): Promise<Attendance[]> {
  const snapshot = await attendanceRef.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Attendance, 'id'>) }));
}

async function getByStudent(studentId: string): Promise<Attendance[]> {
  const snapshot = await attendanceRef.where('studentId', '==', studentId).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Attendance, 'id'>) }));
}

export const AttendanceRepository = {
  mark,
  getAll,
  getByStudent
};