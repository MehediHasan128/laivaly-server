import {randomBytes} from 'crypto';
import { User } from '../modules/users/user.model';


const findLastUserId = async(id: string) => {
    const existing = await User.findOne({id: id});
    return !!existing
}


export const generateUserID = async () => {
    const date = new Date()
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    let id;
    let  isTaken = true;

    while(isTaken) {
        const randomString = randomBytes(2).toString('hex').toUpperCase();
        id = `LYV-${year}${month}${day}-${randomString}`;
        isTaken = await findLastUserId(id);
    }

    return id;
};
