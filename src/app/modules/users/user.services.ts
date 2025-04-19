import { TBuyer } from "../buyer/buyer.interface";
import { TUser } from "./user.interface";

const cresteUserIntoDB = async (payload: TBuyer) => {
  
  const userData: Partial<TUser> = {};

  // Set userName
  userData.userName = payload?.userName;

  // Set user email
  userData.userEmail = payload?.userEmail;

  // Set user password
  userData.password = payload?.password;

  // Set user role
  userData.role = 'buyer';

  console.log(userData);

};

export const UserServices = {
  cresteUserIntoDB,
};
