
import { RequestHandler } from 'express';
import { AttendanceRepository } from '../repository/attendance.repository';
import { Attendance } from '../models/attendance.model';

export const markAttendance: RequestHandler = async (req, res) => {
  const { studentId, date, status } = req.body as Attendance;
  try {
    const record = await AttendanceRepository.mark({ studentId, date, status });
    res.status(201).json({ message: 'Attendance marked successfully', record });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark attendance', error });
  }
};

export const getAllAttendance: RequestHandler = async (_req, res) => {
  try {
    const records = await AttendanceRepository.getAll();
    res.status(200).json({ records });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch attendance', error });
  }
};

export const getAttendanceByStudent: RequestHandler = async (req, res) => {
  const { studentId } = req.params;
  try {
    const records = await AttendanceRepository.getByStudent(studentId);
    res.status(200).json({ records });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch student attendance', error });
  }
};