import bcrypt from 'bcrypt';

const hashUserPassword = async(password: string, salt_round: string) => {
 
    return bcrypt.hash(password, Number(salt_round))

};

export default hashUserPassword