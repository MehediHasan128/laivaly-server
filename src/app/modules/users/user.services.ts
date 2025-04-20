import { startSession } from "mongoose";
import { TBuyer } from "../buyer/buyer.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { Buyer } from "../buyer/buyer.model";
import { generateUserID } from "../../utils/generateUserID";
import AppError from "../../errors/AppError";
import httpStatus from 'http-status';

const cresteUserIntoDB = async (payload: TBuyer) => {
  
  const userData: Partial<TUser> = {};

  // Set userName
  userData.userName = payload?.userName;

  // Set id
  userData.id = await generateUserID();

  // Set user email
  userData.userEmail = payload?.userEmail;

  // Set user password
  userData.password = payload?.password;

  // Set user role
  userData.role = 'buyer';


  // Check the user is exists or not
  const isUserExists = await User.findOne({userEmail: payload?.userEmail});
  if(isUserExists){
    throw new AppError(httpStatus.CONFLICT, 'User is already exists');
  }

  
  // Start transaction rollback functionality
  const session = await startSession();

  try{

    session.startTransaction();

    // Create user on user collection
    const newUser = await User.create([userData], {session});

    // Set userId on buyer collection
    payload.userId = newUser[0]._id;
    payload.id = newUser[0].id;

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
