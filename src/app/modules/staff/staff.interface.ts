import { Types } from 'mongoose';
import { TUserName } from '../../global/interface';

export interface TStaffAddress {
  houseNumber: string;
  address: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
}

export interface TStaff {
  userId: Types.ObjectId;
  staffId: string;
  userName: TUserName;
  userEmail: string;
  dateOfBirth: Date | null;
  phoneNumber: string | null;
  presentAddress: TStaffAddress;
  permanentAddress: TStaffAddress;
  isDeleted: boolean;
}
