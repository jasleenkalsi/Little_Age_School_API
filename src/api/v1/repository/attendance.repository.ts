import { db } from '../../../../config/firebase';
import { Attendance } from '../models/attendance.model';

const attendanceRef = db.collection('attendance');

export const AttendanceRepository = {
  async mark(data: Attendance): Promise<Attendance> {
    console.log('Saving attendance to Firestore:', data); // ✅ For debugging
    const docRef = await attendanceRef.add(data);
    return { id: docRef.id, ...data };
  },

  async getAll(): Promise<Attendance[]> {
    const snapshot = await attendanceRef.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Attendance) }));
  },

  async getByStudent(studentId: string): Promise<Attendance[]> {
    const snapshot = await attendanceRef
      .where('studentId', '==', studentId)
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Attendance) }));
  },

  async update(studentId: string, date: string, status: string): Promise<boolean> {
    const snapshot = await attendanceRef
      .where('studentId', '==', studentId)
      .where('date', '==', date)
      .limit(1)
      .get();

    if (snapshot.empty) return false;

    const doc = snapshot.docs[0];
    await attendanceRef.doc(doc.id).update({ status });
    return true;
  },

  async delete(studentId: string, date: string): Promise<boolean> {
    const snapshot = await attendanceRef
      .where('studentId', '==', studentId)
      .where('date', '==', date)
      .limit(1)
      .get();

    if (snapshot.empty) return false;

    const doc = snapshot.docs[0];
    await attendanceRef.doc(doc.id).delete();
    return true;
  }
};
