// src/api/v1/services/auth.service.ts
import { AuthUser } from '../models/auth.model';

let usersAuth: AuthUser[] = [];

export class AuthService {
  static createUser(name: string, email: string, password: string, role: string = 'parent') {
    const exists = usersAuth.find(user => user.email === email);
    if (exists) {
      throw new Error('User already exists');
    }

    const newUser = new AuthUser(name, email, password, role);
    usersAuth.push(newUser);
    return newUser;
  }

  static loginUser(email: string, password: string) {
    const user = usersAuth.find(user => user.email === email && user.password === password);
    if (!user) {
      const exists = usersAuth.find(u => u.email === email);
      if (!exists) throw new Error('User not found');
      throw new Error('Invalid credentials');
    }

    return {
      token: 'fake-token',
      user
    };
  }

  static getAllUsers(): AuthUser[] {
    return usersAuth;
  }
}
