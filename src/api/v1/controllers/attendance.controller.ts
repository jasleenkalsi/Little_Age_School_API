import { Request, Response } from 'express';

let attendanceRecords: any[] = [];

export const markAttendance = (req: Request, res: Response) => {
  const { student_id, date, status } = req.body;
  attendanceRecords.push({ student_id, date, status });
  res.json({ message: 'Attendance marked successfully' });
};

export const getAttendance = (req: Request, res: Response) => {
  const { student_id } = req.params;
  const records = attendanceRecords.filter(a => a.student_id === parseInt(student_id));
  res.json({ attendance: records });
};

export const updateAttendance = (req: Request, res: Response) => {
  const { student_id, date } = req.params;
  const { status } = req.body;
  const record = attendanceRecords.find(a => a.student_id === parseInt(student_id) && a.date === date);
  if (record) {
    record.status = status;
    res.json({ message: 'Attendance updated successfully' });
  } else {
    res.status(404).json({ message: 'Attendance record not found' });
  }
};

export const deleteAttendance = (req: Request, res: Response) => {
  const { student_id, date } = req.params;
  attendanceRecords = attendanceRecords.filter(a => !(a.student_id === parseInt(student_id) && a.date === date));
  res.json({ message: 'Attendance record deleted successfully' });
};

