// ✅ Final fixed activity.controller.ts
import { RequestHandler } from 'express';
import { ActivityRepository } from '../repository/activity.repository';
import { Activity } from '../models/activity.model';

export const addActivity: RequestHandler = async (req, res) => {
  const { title, date, description, createdBy, participants } = req.body as Activity;

  try {
    const activity = await ActivityRepository.create({
      title,
      date,
      description,
      createdBy,
      participants
    });
    res.status(201).json({ message: 'Activity added successfully', activity });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add activity', error });
  }
};

export const getActivities: RequestHandler = async (_req, res) => {
  try {
    const activities = await ActivityRepository.getAll();
    res.status(200).json({ activities });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
};

export const updateActivity: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { title, date, description } = req.body as Partial<Activity>;

  try {
    const updated = await ActivityRepository.update(id, { title, date, description });
    if (!updated) {
      res.status(404).json({ message: 'Activity not found' });
    } else {
      res.status(200).json({ message: 'Activity updated successfully', updated });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update activity', error });
  }
};

export const deleteActivity: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await ActivityRepository.delete(id);
    if (!deleted) {
      res.status(404).json({ message: 'Activity not found' });
    } else {
      res.status(200).json({ message: 'Activity deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete activity', error });
  }
};