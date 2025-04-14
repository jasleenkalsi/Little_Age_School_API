export type AttendanceStatus = "Present" | "Absent" | "Leave";

export interface Attendance {
  id?: string; // optional for Firestore
  studentId: string;
  date: string; // store as string for easier comparison
  status: AttendanceStatus;
}
