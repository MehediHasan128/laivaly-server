import path from 'path';
import fs from 'fs';
import sendEmail from '../../utils/sendEmail';

export const sendStaffEmailPassword = async(
  staffName: string,
  email: string,
  password: string,
) => {
  // Get otp ui html file
  const sendStaffEmailPassTemplate = path.join(
    process.cwd(),
    'src/app/templates/sendStaff_Pass.html',
  );

  // Get the html content
  let htmlContent = fs.readFileSync(sendStaffEmailPassTemplate, 'utf8');

  // Now replace the html content
  htmlContent = htmlContent.replace('{{staffName}}', staffName).replace('{{staffEmail}}', email).replace('{{password}}', password);

  // Send email with password reset link
  await sendEmail(email, 'Laivaly Staff Portal Access – Login Information', htmlContent);
};
