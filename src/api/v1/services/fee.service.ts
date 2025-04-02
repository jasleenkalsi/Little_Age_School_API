import { Fee } from "../models/fee.model";

const fees: Fee[] = [];

export const recordFee = (data: Fee): Fee => {
  fees.push(data);
  return data;
};

export const getFeesByStudent = (studentId: string): Fee[] => {
  return fees.filter(fee => fee.studentId === studentId);
};

export const getAllFees = (): Fee[] => {
  return fees;
};
