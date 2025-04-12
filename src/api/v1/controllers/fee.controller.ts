import { RequestHandler } from 'express';
import { FeeRepository } from '../repository/fee.repository';
import { Fee } from '../models/fee.model';

export const createFee: RequestHandler = async (req, res) => {
  const { studentId, amount, term } = req.body as Omit<Fee, 'id' | 'datePaid'>;
  try {
    const fee = await FeeRepository.create({ studentId, amount, term, datePaid: new Date() });
    res.status(201).json({ message: 'Fee recorded successfully', fee });
  } catch (error) {
    res.status(500).json({ message: 'Failed to record fee', error });
  }
};

export const getAllFees: RequestHandler = async (_req, res) => {
  try {
    const fees = await FeeRepository.getAll();
    res.status(200).json({ fees });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve fees', error });
  }
};