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

export const updateActivity = (req: Request, res: Response) => {
  const { title } = req.params;
  const { date, description } = req.body;
  const activity = activities.find(a => a.title === title);
  if (activity) {
    activity.date = date;
    activity.description = description;
    res.json({ message: 'Activity updated successfully' });
  } else {
    res.status(404).json({ message: 'Activity not found' });
  }
};

export const deleteActivity = (req: Request, res: Response) => {
  const { title } = req.params;
  const initialLength = activities.length;
  activities = activities.filter(a => a.title !== title);
  if (activities.length < initialLength) {
    res.json({ message: 'Activity deleted successfully' });
  } else {
    res.status(404).json({ message: 'Activity not found' });
  }
};