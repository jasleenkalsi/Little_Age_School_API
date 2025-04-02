export type AttendanceStatus = "Present" | "Absent" | "Leave";

export interface Attendance {
  id: string;
  studentId: string;
  date: Date;
  status: AttendanceStatus;
}
