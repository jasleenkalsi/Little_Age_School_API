
import { Attendance } from "../models/attendance.model";

const records: Attendance[] = [];

export const markAttendance = (data: Attendance): Attendance => {
  records.push(data);
  return data;
};

export const getAttendanceByStudent = (studentId: string): Attendance[] => {
  return records.filter(r => r.studentId === studentId);
};

export const getAllAttendance = (): Attendance[] => {
  return records;
};
