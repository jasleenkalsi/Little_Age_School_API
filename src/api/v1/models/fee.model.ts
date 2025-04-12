export interface Fee {
  id?: string; // ✅ optional because Firestore assigns it
  studentId: string;
  amount: number;
  term: string; // e.g., 'Term 1', 'Term 2'
  datePaid: Date;
}