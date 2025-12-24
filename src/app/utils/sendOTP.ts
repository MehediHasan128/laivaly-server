import { generateOTP } from './generateOTP';
import path from 'path';
import fs from 'fs';
import sendEmail from './sendEmail';
import { OTP } from '../modules/otp/otp.model';

export const sendOTP = async (userEmail: string) => {
  const getOTP = generateOTP();

  // Get otp ui html file
  const otpUiHTMLFile = path.join(process.cwd(), 'src/app/templates/OTP.html');

  // Get the html content
  let htmlContent = fs.readFileSync(otpUiHTMLFile, 'utf8');

  // Now replace the html content
  htmlContent = htmlContent.replace('{{OTP_CODE}}', getOTP);

  const ttlMinutes = 5

  const expiresAt = new Date(Date.now() + ttlMinutes * 60 *1000);

  // Send email with password reset link
  await sendEmail(userEmail, 'Verify your email', htmlContent);

  const otpData = {
    identifier: userEmail,
    otp: getOTP,
    expiresAt
  }

  await OTP.create(otpData);

};
