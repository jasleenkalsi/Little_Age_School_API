// src/api/v1/controllers/user.controller.ts

import { Request, Response } from 'express';

// local array
let users: any[] = [{ id: 1, name: 'Jasleen', age: 4, class: 'Nursery' }];
let currentUserId = 2;

// ✅ Get all users
export const getAllUsers = (req: Request, res: Response): void => {
  res.status(200).json({ students: users });
};

// ✅ Get user by ID
export const getUserById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(200).json(user);
};

// ✅ Create user
export const createUser = (req: Request, res: Response): void => {
  const { name, age, class: studentClass } = req.body;

  if (!name || !age || !studentClass) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  const newUser = { id: currentUserId++, name, age, class: studentClass };
  users.push(newUser);

  res.status(201).json(newUser);
};

// ✅ Update user
export const updateUser = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { name, age, class: studentClass } = req.body;

  const user = users.find(u => u.id === parseInt(id));
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  user.name = name ?? user.name;
  user.age = age ?? user.age;
  user.class = studentClass ?? user.class;

  res.status(200).json({ message: 'Student details updated successfully', user });
};

// ✅ Delete user
export const deleteUser = (req: Request, res: Response): void => {
  const { id } = req.params;
  const initialLength = users.length;

  users = users.filter(u => u.id !== parseInt(id));

  if (users.length === initialLength) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(200).json({ message: 'Student removed successfully' });
};
