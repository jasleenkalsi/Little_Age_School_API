import { getDB } from '../../../../config/firebase';
import { Activity } from '../models/activity.model';

function activityRef() {
  return getDB().collection('activities');
}

export const ActivityRepository = {
  async create(data: Activity): Promise<Activity> {
    const docRef = await activityRef().add(data);
    return { id: docRef.id, ...data };
  },

  async getAll(): Promise<Activity[]> {
    const snapshot = await activityRef().get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Activity) }));
  },

  async update(id: string, data: Partial<Activity>): Promise<Activity | null> {
    const docRef = activityRef().doc(id);
    const existing = await docRef.get();
    if (!existing.exists) return null;

    // Patch: ensure no undefined fields are sent
    const validData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );

    await docRef.update(validData);
    const updatedDoc = await docRef.get();
    return updatedDoc.exists ? { id: updatedDoc.id, ...(updatedDoc.data() as Activity) } : null;
  },

  async delete(id: string): Promise<boolean> {
    const docRef = activityRef().doc(id);
    const existing = await docRef.get();
    if (!existing.exists) return false;

    await docRef.delete();
    return true;
  },
};
