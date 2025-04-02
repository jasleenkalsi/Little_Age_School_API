import { Request, Response } from 'express';

let fees: any[] = [];
let paymentId = 1;

export const addFee = (req: Request, res: Response) => {
  const { student_id } = req.params;
  const { amount, status } = req.body;
  const payment = { student_id: parseInt(student_id), payment_id: paymentId++, amount, status, date: new Date().toISOString().split('T')[0] };
  fees.push(payment);
  res.json({ message: 'Payment recorded successfully' });
};

export const getFees = (req: Request, res: Response) => {
  const { student_id } = req.params;
  const studentFees = fees.filter(f => f.student_id === parseInt(student_id));
  res.json({ fees: studentFees });
};

export const updateFee = (req: Request, res: Response) => {
  const { student_id, payment_id } = req.params;
  const { amount, status } = req.body;
  const fee = fees.find(f => f.student_id === parseInt(student_id) && f.payment_id === parseInt(payment_id));
  if (fee) {
    fee.amount = amount;
    fee.status = status;
    res.json({ message: 'Payment updated successfully' });
  } else {
    res.status(404).json({ message: 'Payment not found' });
  }
};

export const deleteFee = (req: Request, res: Response) => {
  const { student_id, payment_id } = req.params;
  fees = fees.filter(f => !(f.student_id === parseInt(student_id) && f.payment_id === parseInt(payment_id)));
  res.json({ message: 'Payment deleted successfully' });
};

