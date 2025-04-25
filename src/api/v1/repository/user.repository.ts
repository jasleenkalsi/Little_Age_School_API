import { getDB } from '../../../../config/firebase';

interface UserData {
  email: string;
  password: string;
}

function usersRef() {
  return getDB().collection('users');
}

export const createUser = async (userData: UserData) => {
  const newUserRef = usersRef().doc();
  await newUserRef.set(userData);
  return { id: newUserRef.id, ...userData };
};

export const UserRepository = {
  async findById(id: string) {
    const userDoc = await getDB().collection('users').doc(id).get(); // ✅ Admin SDK method

    if (!userDoc.exists) {
      return null;
    }
    return { id: userDoc.id, ...userDoc.data() };
  },
};

export const getUserByEmail = async (email: string) => {
  const snapshot = await usersRef().where('email', '==', email).get();
  if (snapshot.empty) return null;
  const docItem = snapshot.docs[0];
  return { id: docItem.id, ...docItem.data() };
};
