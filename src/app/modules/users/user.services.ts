import { startSession } from "mongoose";
import { TBuyer } from "../buyer/buyer.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { Buyer } from "../buyer/buyer.model";

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

  
  // Start transaction rollback functionality
  const session = await startSession();

  try{

    session.startTransaction();

    // Create user on user collection
    const newUser = await User.create([userData], {session});

    // Set userId on buyer collection
    payload.userId = newUser[0]._id;

    // Create buyer on buyer collection
    const newBuyer = await Buyer.create(payload);
    
    await session.commitTransaction();
    await session.endSession();

    return newBuyer;

  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    console.log(err);
  }

};

export const UserServices = {
  cresteUserIntoDB,
};
