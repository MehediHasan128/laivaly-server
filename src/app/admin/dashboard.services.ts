import { Order } from "../modules/order/order.model";
import { Product } from "../modules/product/product.model";
import { User } from "../modules/user/user.model"

const getAllInformationFromDB = async() => {
    
    // Count the total user
    const users = await User.countDocuments({role: {$ne: 'admin'}});
    // Count the total customer
    const customers = await User.countDocuments({role: {$eq: 'customer'}});
    // Count the total staff
    const staffs = await User.countDocuments({role: {$eq: 'staff'}});
    // Count the total product
    const products = await Product.countDocuments();


    // Now calculate the total sells
    const paidOrders = await Order.find({paymentStatus: 'paid'}).select('-_id orderItems itemsPrice');
    
    for(const item of paidOrders){
        console.log(item);
    }

    return {
        users,
        customers,
        staffs,
        products,
        paidOrders
    }

}


export const AdminDashboardServices = {
    getAllInformationFromDB
}