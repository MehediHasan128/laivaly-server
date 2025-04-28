import AppError from "../../errors/AppError";
import { Product } from "../product/product.model";
import { User } from "../users/user.model";
import { TReviews } from "./productReviews.interface";
import httpStatus from 'http-status';
import { Review } from "./productReviews.model";

const addReviewIntoDB = async(productId: string, payload: TReviews) => {

    // Check the product is exist or not
    const isUserExist = await User.findById(payload.customerId);
    if(!isUserExist){
        throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
    };
    
    // Check the product is exist or not
    const isProductExist = await Product.findById(productId);
    if(!isProductExist){
        throw new AppError(httpStatus.NOT_FOUND, 'Product not found!')
    };

    // get reviews
    const getReview = await Review.findOne({productId});
    const ratings = getReview?.ratings;

    // Calculate reviews
    switch (payload.rating) {
        case payload.rating = 5:
            ratings!.fiveStar = ratings!.fiveStar + 1
            break;
        case payload.rating = 4:
            ratings!.fourStar = ratings!.fourStar + 1
            break;
        case payload.rating = 3:
            ratings!.threeStar = ratings!.threeStar + 1
            break;
        case payload.rating = 2:
            ratings!.twoStar = ratings!.twoStar + 1
            break;
        case payload.rating = 1:
            ratings!.oneStar = ratings!.oneStar + 1
            break;
        default:
            break;
    };

    const totalNumberOfRatings = ratings!.fiveStar + ratings!.fourStar + ratings!.threeStar + ratings!.twoStar + ratings!.oneStar;
    const totalNumberOfRatingsMultiplieWithStart = (ratings!.fiveStar * 5) + (ratings!.fourStar * 4) + (ratings!.threeStar * 3) + (ratings!.twoStar * 2) + (ratings!.oneStar * 1);

    const overAllRating = (totalNumberOfRatingsMultiplieWithStart / totalNumberOfRatings).toFixed(1);

    const data = await Review.findOneAndUpdate({productId}, {$push: {reviews: payload}, overAllRating, ratings}, {new: true});

    return data;

};


const getAllReviewsFromDB = async(productId: string) => {
    
    const data = await Review.findOne({productId}).populate('reviews.customerId', 'userName profileImage -_id');
    return data;

}


export const ReviewServices = {
    addReviewIntoDB,
    getAllReviewsFromDB
}