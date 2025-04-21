import config from "../config";
import { User } from "../modules/users/user.model";

const admin = {
  userName: { firstName: 'MD.', lastName: 'Shaheen' },
  id: 'LYV-SA-25',
  userEmail: 'laivaly.bd@gmail.com',
  password: config.admin_pass,
  profileImage: 'https://res.cloudinary.com/dq9xlqlao/image/upload/v1745225910/LYV-SA-25_dxzenn.jpg',
  status: 'active',
  role: 'admin',
  isDeleted: false,
};


const seedAdmin = async() => {

    const isAdminExists = await User.findOne({role: 'admin'});
    if(!isAdminExists){
        await User.create(admin);
    }

};


export default seedAdmin;
