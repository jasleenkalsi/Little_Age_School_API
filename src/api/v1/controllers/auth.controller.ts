import { Request, Response } from 'express';

let usersAuth: any[] = [];

export const signup = (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  usersAuth.push({ name, email, password, role });
  res.json({ message: 'User registered successfully' });
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = usersAuth.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ token: 'eyJhbGciOi...fake-token...' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
