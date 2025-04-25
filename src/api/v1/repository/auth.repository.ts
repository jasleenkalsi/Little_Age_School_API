import { getDB } from '../../../../config/firebase';

interface AuthUser {
  email: string;
  password: string;
  role?: string;
}

function authRef() {
  return getDB().collection('authUsers');
}

export const AuthRepository = {
  async create(user: AuthUser): Promise<{ id: string } & AuthUser> {
    const docRef = await authRef().add(user);
    return { id: docRef.id, ...user };
  },

  async getByEmail(email: string): Promise<{ id: string } & AuthUser | null> {
    const snapshot = await authRef().where('email', '==', email).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as AuthUser & { id: string };
  },

  async deleteById(id: string): Promise<boolean> {
    const doc = await authRef().doc(id).get();
    if (!doc.exists) return false;
    await authRef().doc(id).delete();
    return true;
  }
};
