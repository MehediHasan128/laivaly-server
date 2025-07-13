import nodemailer from 'nodemailer';
import config from '../config';

const sendEmail = async (to: string, sub: string, htmlPage: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: config.admin_email,
      pass: config.smtp_secret_credential
    },
  });

  await transporter.sendMail({
    from: config.admin_email,
    to,
    subject: sub,
    html: htmlPage
  })
};

export default sendEmail