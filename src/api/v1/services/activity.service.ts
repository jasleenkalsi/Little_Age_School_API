import { Activity } from "../models/activity.model";

const activities: Activity[] = [];

export const createActivity = (data: Activity): Activity => {
  activities.push(data);
  return data;
};

export const getAllActivities = (): Activity[] => {
  return activities;
};

export const getActivitiesByStudent = (studentId: string): Activity[] => {
  return activities.filter(activity => activity.participants.includes(studentId));
};
