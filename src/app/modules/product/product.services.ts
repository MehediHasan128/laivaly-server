import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { uploadImageToCloudinary } from '../../utils/uploadImageToCloudinary';
import { TProductReviews } from '../productReviews/productReviews.interface';
import { Review } from '../productReviews/productReviews.model';
import { productSearchableField } from './product.constant';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import httpStatus from 'http-status';

/* eslint-disable @typescript-eslint/no-explicit-any */
const addProductIntoDB = async (file: any, payload: TProduct) => {
  // Check the product is exists or not
  const isExistsProduct = await Product.findOne({ SKU: payload.SKU });
  if (isExistsProduct) {
    throw new AppError(httpStatus.CONFLICT, 'This product is already exists');
  }

  const imagePath = file.map((image: any) => ({
    imagePath: image.path,
    imageName: image.filename,
  }));

  const uploadedFiles = await uploadImageToCloudinary(imagePath);

  payload.thumbnail = uploadedFiles[0].secure_url;
  payload.images = uploadedFiles.map((file) => file.secure_url);

  const data = await Product.create(payload);

  const reviewData: Partial<TProductReviews> = {};

  reviewData.productId = data?._id;
  reviewData.ratings = {
    fiveStar: 0,
    fourStar: 0,
    threeStar: 0,
    twoStar: 0,
    oneStar: 0,
  };
  reviewData.reviews = [{ customerId: null, comment: null }];

  await Review.create(reviewData);

  return data;
};

const getAllProductFromDB = async (query: Record<string, unknown>, audience: string) => {
  
  if(audience !== 'all'){
    const productQuery = new QueryBuilder(
      Product.find({ isDeleted: false, targetAudience: audience }),
      query,
    )
      .search(productSearchableField)
      .filter()
      .sort()
      .paginate();
  
    const targetedProduct = await productQuery.queryModel;
  
    return targetedProduct;
  }
  const productQuery = new QueryBuilder(
    Product.find({ isDeleted: false }),
    query,
  )
    .search(productSearchableField)
    .filter()
    .sort()
    .paginate();

  const data = await productQuery.queryModel;

  return data;
};

const getSingleProductFromDB = async(productId: string) => {
  
  // Check the product is exist or not
  const data = await Product.findById(productId);
  if(!data){
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  
  // Chech the product is delete or not
  const isDeleted = data?.isDeleted;
  if(isDeleted){
    throw new AppError(httpStatus.BAD_REQUEST, 'Product is already deleted');
  }

  return data;

}

const getSimilerProductFromDB = async(audience: string, subCategory: string, currentProductId: string) => {
  
  const data = await Product.find({isDeleted: false, targetAudience: audience, subCategory: subCategory, _id: {$ne: currentProductId}});
  return data;

}


export const ProductServices = {
  addProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  getSimilerProductFromDB
};
