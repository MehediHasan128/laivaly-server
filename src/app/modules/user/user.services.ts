import { TCustomer } from "../customer/customer.interface";
import { TUser } from "./user.interface";
import { generateCustomerAndStaffId } from "./user.utils";

const createCustomerIntoDB = async(payload: TCustomer, password: string) => {
    
    // Create a empty object
    const userData: Partial<TUser> = {};

    // Set user unique id
    userData.id = generateCustomerAndStaffId('C');

    // Set user name
    userData.userName = payload.userName;

    // set user email
    userData.userEmail = payload.userEmail;

    // Set user password
    userData.password = password;

    // Set user role
    userData.role = "customer";

    // Set user status
    userData.status = "pending";

    console.log(userData);

};

export const UserServices = {
    createCustomerIntoDB
}