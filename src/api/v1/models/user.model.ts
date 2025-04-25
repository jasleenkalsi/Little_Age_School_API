// src/api/v1/models/user.model.ts
export class User {
  id: number;
  username: string;
  email: string;
  password: string;

  constructor({ id, username, email, password }: { id?: number; username: string; email: string; password: string }) {
    this.id = id ?? Math.floor(Math.random() * 1000); // Dummy ID generator, replace with real DB logic
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
