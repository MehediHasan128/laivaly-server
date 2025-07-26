import crypto from 'crypto';

export const generateCustomerAndStaffId = (role: string) => {
  const now = new Date();
  const pad = (num: number) => num.toString().padStart(2, '0');

  const randomByte = crypto.randomBytes(3).toString('hex').toUpperCase();

  const getDate = pad(now.getDate());
  const getMin = pad(now.getMinutes());
  const getSec = pad(now.getSeconds());

  const id = `LV${role}-${getDate}${getMin}${getSec}-${randomByte}`;
  return id;
};