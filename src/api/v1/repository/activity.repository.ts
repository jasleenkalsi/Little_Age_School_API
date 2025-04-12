import { db } from '../../../../config/firebase';
import { Activity } from '../models/activity.model';

const activityRef = db.collection('activities');

export const ActivityRepository = {
  async create(data: Activity): Promise<Activity> {
    const docRef = await activityRef.add(data);
    return { id: docRef.id, ...data };
  },
  async getAll(): Promise<Activity[]> {
    const snapshot = await activityRef.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Activity) }));
  },

  async update(id: string, data: Partial<Activity>): Promise<Activity | null> {
    const docRef = activityRef.doc(id);
    await docRef.update(data);
    const updatedDoc = await docRef.get();
    return updatedDoc.exists ? { id: updatedDoc.id, ...(updatedDoc.data() as Activity) } : null;
  },
  
  async delete(id: string): Promise<boolean> {
    const doc = await activityRef.doc(id).get();
    if (!doc.exists) return false;
    await activityRef.doc(id).delete();
    return true;
  }
};