// src/services/emailService.ts
import nodemailer from 'nodemailer';

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this based on your email provider
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to, // receiver address
      subject, // subject line
      text, // plain text body
    });

    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};
