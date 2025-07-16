import { TCustomer } from "./customer.interface"

const updateCustomerProfileIntoDB = async(customerID: string, payload: Partial<TCustomer>) => {

  console.log(customerID, payload);

}


export const CustomerServices = {
  updateCustomerProfileIntoDB
}