import { db } from '../../../../config/firebase';
import { Fee } from '../models/fee.model';

const feeRef = db.collection('fees');

export const FeeRepository = {
  async create(data: Fee): Promise<Fee> {
    const docRef = await feeRef.add(data);
    return { id: docRef.id, ...data };
  },
  async getAll(): Promise<Fee[]> {
    const snapshot = await feeRef.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Fee) }));
  }
};
