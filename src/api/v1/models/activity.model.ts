export interface Activity {
    id: string;
    title: string;
    description?: string;
    date: Date;
    participants: string[]; // student IDs
  }
  