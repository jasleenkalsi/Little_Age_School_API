export interface Fee {
    id: string;
    studentId: string;
    amount: number;
    term: string; // e.g., "Term 1", "Term 2"
    datePaid: Date;
  }
  