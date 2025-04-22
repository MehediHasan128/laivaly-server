import nodemailer from 'nodemailer';
import config from '../config';

const sendMail = async(to: string, subject: string, htmlPage: string) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'bayzidahmed467@gmail.com',
            pass: config.smtp_secret_credential
        }
    });

    await transporter.sendMail({
        from: 'bayzidahmed467@gmail.com',
        to,
        subject: subject,
        html: htmlPage
    })

};

export default sendMail;