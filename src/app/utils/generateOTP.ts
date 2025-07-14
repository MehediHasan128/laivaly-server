export const generateOTP = () => {

    return Math.floor(Math.random() * Math.pow(10, 6)).toString().padStart(6, '0');

}