import { Student } from "../models/user.model";

const students: Student[] = [];

export const createStudent = (data: Student): Student => {
  students.push(data);
  return data;
};

export const getStudentById = (id: string): Student | undefined => {
  return students.find(s => s.id === id);
};

export const getAllStudents = (): Student[] => {
  return students;
};

export const deleteStudent = (id: string): boolean => {
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) {
    students.splice(index, 1);
    return true;
  }
  return false;
};
