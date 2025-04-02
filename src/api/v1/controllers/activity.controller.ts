import { Request, Response } from 'express';

let activities: any[] = [];

export const addActivity = (req: Request, res: Response) => {
  const { title, date, description } = req.body;
  activities.push({ title, date, description });
  res.json({ message: 'Activity added successfully' });
};

export const getActivities = (req: Request, res: Response) => {
  res.json({ activities });
};