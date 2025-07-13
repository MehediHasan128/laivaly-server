import nodemailer from 'nodemailer';
import config from '../config';

export const sendMail = async (to: string, sub: string, htmlPage: string) => {
  const transporter = nodemailer.createTransport({
    service: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: config.admin_email,
      pass: config.smtp_secret_credential
    },
  });

  transporter.sendMail({
    from: config.admin_email,
    to,
    subject: sub,
    html: htmlPage
  })
};