

// src/api/v1/controllers/auth.controller.ts
import { Request, Response } from 'express';

let usersAuth: any[] = [];

export const signup = (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing email or password' });
  usersAuth.push({ email, password });
  res.status(201).json({ message: 'User created' });
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  const found = usersAuth.find(u => u.email === email && u.password === password);
  if (found) return res.status(200).json({ token: 'fake-token' });
  return res.status(404).json({ message: 'Invalid credentials' });
};
