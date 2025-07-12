import config from "../config";
import { User } from "../modules/user/user.model";

const admin = {
    id: 'LV-admin2024',
    userName: {
        firstName: 'Mehedi',
        lastName: 'Hasan'
    },
    userProfileURL: 'https://res.cloudinary.com/dn6pn2fld/image/upload/v1752350656/1_pc6d2z.jpg',
    userEmail: 'laivaly.bd@gmail.com',
    password: config.admin_pass,
    role: 'admin',
    status: 'active'
};

const seedAdminOnDatabase = async() => {

    const  isAdminExits = await User.findOne({role: 'admin'});

    if(!isAdminExits){
        await User.create(admin)
    }

};

export default seedAdminOnDatabase;