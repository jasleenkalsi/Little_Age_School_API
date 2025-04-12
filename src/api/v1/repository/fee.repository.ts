import { db } from '../../../../config/firebase';
import { Fee } from '../models/fee.model';

const feeRef = db.collection('fees');

async function create(data: Omit<Fee, 'id'>): Promise<Fee> {
  const docRef = await feeRef.add(data);
  return { id: docRef.id, ...data };
}

async function getAll(): Promise<Fee[]> {
  const snapshot = await feeRef.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Fee, 'id'>) }));
}

export const FeeRepository = {
  create,
  getAll
};