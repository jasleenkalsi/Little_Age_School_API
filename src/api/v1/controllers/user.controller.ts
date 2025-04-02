import { Request, Response } from 'express';

let users: any[] = [{ id: 1, name: 'Jasleen', age: 4, class: 'Nursery' }];
let currentUserId = 2;

export const getAllUsers = (req: Request, res: Response) => {
  res.json({ students: users });
};

export const createUser = (req: Request, res: Response) => {
  const { name, age, class: studentClass } = req.body;
  const newUser = { id: currentUserId++, name, age, class: studentClass };
  users.push(newUser);
  res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, age, class: studentClass } = req.body;
  const user = users.find(u => u.id === parseInt(id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.name = name;
  user.age = age;
  user.class = studentClass;
  res.json({ message: 'Student details updated successfully' });
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  users = users.filter(u => u.id !== parseInt(id));
  res.json({ message: 'Student removed successfully' });
};
