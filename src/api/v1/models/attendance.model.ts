export type AttendanceStatus = "Present" | "Absent" | "Leave";

export interface Attendance {
  id?: string; // ✅ made optional
  studentId: string;
  date: Date;
  status: AttendanceStatus;
}