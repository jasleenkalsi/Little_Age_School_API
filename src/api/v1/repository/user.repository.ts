import { getDB } from '../../../../config/firebase';
import { User } from '../models/user.model';

interface UserData {
  email: string;
  password: string;
}

function usersRef() {
  return getDB().collection('users');
}

export const UserRepository = {
  // Create user
  async create(userData: { username: string; email: string; password: string }) {
    // Create a new User instance
    const newUser = new User(userData);

    // You can add logic here to save to Firestore if necessary
    const newUserRef = usersRef().doc();
    await newUserRef.set(userData);
    
    // Return user data with Firestore generated ID
    return { id: newUserRef.id, ...userData };
  },

  // Find user by ID
  async findById(id: string) {
    const userDoc = await getDB().collection('users').doc(id).get(); // ✅ Admin SDK method

    if (!userDoc.exists) {
      return null;
    }

    return { id: userDoc.id, ...userDoc.data() };
  },

  // Get user by email
  async getUserByEmail(email: string) {
    const snapshot = await usersRef().where('email', '==', email).get();
    if (snapshot.empty) return null;

    const docItem = snapshot.docs[0];
    return { id: docItem.id, ...docItem.data() };
  },
};
