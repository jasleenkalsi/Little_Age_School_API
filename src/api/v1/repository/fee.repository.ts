import { getDB } from '../../../../config/firebase';

const feeCollection = getDB().collection('fees');

export const FeeRepository = {
  async create(studentId: string, data: any) {
    const newFeeRef = feeCollection.doc();
    const fullData = { ...data, studentId, id: newFeeRef.id };
    await newFeeRef.set(fullData);
    return fullData;
  },

  async getByStudent(studentId: string) {
    const snapshot = await feeCollection.where('studentId', '==', studentId).get();
    return snapshot.docs.map(doc => doc.data());
  },

  async update(studentId: string, feeId: string, data: any) {
    const feeDocRef = feeCollection.doc(feeId);
    const existing = await feeDocRef.get();

    if (!existing.exists || existing.data()?.studentId !== studentId) {
      return null; // not found
    }

    await feeDocRef.update(data);
    return true;
  },

  async delete(studentId: string, feeId: string) {
    const feeDocRef = feeCollection.doc(feeId);
    const existing = await feeDocRef.get();

    if (!existing.exists || existing.data()?.studentId !== studentId) {
      return null;
    }

    await feeDocRef.delete();
    return true;
  }
};
