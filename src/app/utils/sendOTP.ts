import { generateOTP } from './generateOTP';
import path from 'path';
import fs from 'fs';
import sendEmail from './sendEmail';
import { redis } from '../lib/redis';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

export const sendOTP = async (userEmail: string) => {
  const getOTP = generateOTP();

  // Get otp ui html file
  const otpUiHTMLFile = path.join(
    process.cwd(),
    'src/app/templates/pass_reset_email.html',
  );

  // Get the html content
  let htmlContent = fs.readFileSync(otpUiHTMLFile, 'utf8');

  // Now replace the html content
  htmlContent = htmlContent.replace('{{OTP_CODE}}', getOTP);

  // Store otp in resdis
  const isStoreOTP = await redis.set(`otp-${userEmail}`, getOTP, 'EX', 300);

  if (isStoreOTP !== 'OK') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to store OTP in Redis');
  }

  // Send email with password reset link
  await sendEmail(userEmail, 'Verify your email', htmlContent);
};
