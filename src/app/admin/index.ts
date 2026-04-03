import config from "../config";
import { User } from "../modules/user/user.model";

const admin = {
    id: 'LV-admin2024',
    userName: {
        firstName: 'Mehedi',
        lastName: 'Hasan'
    },
    userProfileURL: 'https://res.cloudinary.com/dpcrmxq9c/image/upload/v1770392998/samples/smile.jpg',
    userEmail: config.admin_email,
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