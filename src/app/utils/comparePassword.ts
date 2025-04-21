import bcrypt from 'bcrypt';

const comparePassword = async(plainPass: string, hashPass: string) => {

    const result = await bcrypt.compare(plainPass, hashPass);
    return result;

};

export default comparePassword