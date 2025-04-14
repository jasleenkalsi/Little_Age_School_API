import { RequestHandler } from 'express';
import { FeeRepository } from '../repository/fee.repository';
import { Fee } from '../models/fee.model';

export const createFee: RequestHandler = async (req, res): Promise<void> => {
  const studentId = req.params.student_id;
  const { amount, date } = req.body;

  if (!amount || !date) {
    res.status(400).json({ message: 'Amount and date are required' });
    return;
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    res.status(400).json({ message: 'Invalid date format' });
    return;
  }

  try {
    const fee = await FeeRepository.create({
      studentId,
      amount,
      term: 'Term 1',
      datePaid: parsedDate,
    });

    res.status(200).json({ message: 'Fee recorded successfully', fee });
  } catch (error) {
    res.status(500).json({ message: 'Failed to record fee', error });
  }
};

export const getFees: RequestHandler = async (req, res): Promise<void> => {
  const studentId = req.params.student_id;
  try {
    const fees = await FeeRepository.getByStudentId(studentId);
    res.status(200).json(fees);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve fees', error });
  }
};

export const updateFee: RequestHandler = async (req, res): Promise<void> => {
  const { student_id, payment_id } = req.params;
  const { amount, term } = req.body;

  if (!amount || !term) {
    res.status(400).json({ message: 'Amount and term are required' });
    return;
  }

  try {
    await FeeRepository.update(payment_id, { amount, term });
    res.status(200).json({ message: 'Fee updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update fee', error });
  }
};

export const deleteFee: RequestHandler = async (req, res): Promise<void> => {
  const feeId = req.params.fee_id;
  try {
    await FeeRepository.delete(feeId);
    res.status(200).json({ message: 'Fee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete fee', error });
  }
};