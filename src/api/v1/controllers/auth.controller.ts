import { RequestHandler } from 'express';
import { AuthService } from '../services/auth.service';

// ✅ Signup Handler
export const signup: RequestHandler = async (req, res): Promise<void> => {
  const { name, email, password, role } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Missing email or password' });
    return;
  }

  try {
    const newUser = await AuthService.createUser(name, email, password, role);
    res.status(201).json({ message: 'User created', user: newUser });
    return;
  } catch (err: any) {
    res.status(409).json({ message: err.message });
    return;
  }
};

// ✅ Login Handler
export const login: RequestHandler = async (req, res): Promise<void> => {
  const { email, password } = req.body;

  try {
    const data = await AuthService.loginUser(email, password);
    res.status(200).json(data);
    return;
  } catch (err: any) {
    const status = err.message === 'User not found' ? 404 : 401;
    res.status(status).json({ message: err.message });
    return;
  }
};
