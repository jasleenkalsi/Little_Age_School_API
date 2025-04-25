import { Request, Response } from 'express';
import { FeeRepository } from '../repository/fee.repository';

// ✅ Create Fee
export const createFee = async (req: Request, res: Response): Promise<void> => {
  const { amount, date } = req.body;
  const { student_id } = req.params;

  if (!amount || !date) {
    res.status(400).json({ message: 'Amount and date are required' });
    return;
  }

  try {
    const fee = await FeeRepository.create(student_id, { amount, date });
    res.status(201).json({ message: 'Fee added successfully', fee });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add fee', error });
  }
};

// ✅ Get Fees
export const getFees = async (req: Request, res: Response): Promise<void> => {
  const { student_id } = req.params;

  try {
    const fees = await FeeRepository.getByStudent(student_id);
    res.status(200).json(fees);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch fees', error });
  }
};

// ✅ Update Fee
export const updateFee = async (req: Request, res: Response): Promise<void> => {
  const { student_id, payment_id } = req.params;
  const { amount, date } = req.body;

  if (!amount || !date) {
    res.status(400).json({ message: 'Amount and date are required' });
    return;
  }

  try {
    const result = await FeeRepository.update(student_id, payment_id, { amount, date });

    if (!result) {
      res.status(404).json({ message: 'Fee not found' });
      return;
    }

    res.status(200).json({ message: 'Fee updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update fee', error });
  }
};

// ✅ Delete Fee
export const deleteFee = async (req: Request, res: Response): Promise<void> => {
  const { student_id, payment_id } = req.params;

  try {
    const result = await FeeRepository.delete(student_id, payment_id);

    if (!result) {
      res.status(404).json({ message: 'Fee not found' });
      return;
    }

    res.status(200).json({ message: 'Fee deleted successfully' });
  } catch (error) {
    console.error('Delete Fee Error:', error);
    res.status(500).json({ message: 'Failed to delete fee', error });
  }
};
