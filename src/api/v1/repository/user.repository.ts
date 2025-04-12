import { db } from '../../../../config/firebase'; // Adjust path to your firebase config
import { Student } from '../models/user.model';

const studentsRef = db.collection('students');

export const StudentRepository = {
  async create(data: Student): Promise<Student> {
    const docRef = await studentsRef.add(data);
    return { id: docRef.id, ...data };
  },

  async getById(id: string): Promise<Student | null> {
    const doc = await studentsRef.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as Student;
  },

  async getAll(): Promise<Student[]> {
    const snapshot = await studentsRef.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Student[];
  },

  async delete(id: string): Promise<boolean> {
    const doc = await studentsRef.doc(id).get();
    if (!doc.exists) return false;
    await studentsRef.doc(id).delete();
    return true;
  }
};
