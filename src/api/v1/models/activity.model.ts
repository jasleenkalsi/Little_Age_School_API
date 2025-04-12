// src/api/v1/models/activity.model.ts
export interface Activity {
  id?: string;
  title: string;
  description: string;
  date: string;
  createdBy: string; 
  participants: string[];
}
