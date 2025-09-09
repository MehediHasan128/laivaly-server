/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TProduct } from './product.interface';
import { createProductID } from './product.utils';
import { Product } from './product.model';
import { uploadMultipleImage } from '../../utils/sendImageToCloudinary';
import QueryBuilder from '../../builder/QueryBuilder';
import mongoose from 'mongoose';
import { Review } from '../review/review.model';
import { Variant } from '../productVariant/variant.model';

const addProductIntoDB = async (files: any, payload: TProduct) => {
  // Get auto generate product id
  const autoGenerateProductId = createProductID(
    payload?.productGroup,
    payload?.productCategory,
    payload?.productSubCategory,
  );

  // Now check the product is already create in database
  const isProductExists = await Product.findOne({
    parentProductId: autoGenerateProductId,
  });
  if (isProductExists) {
    throw new AppError(httpStatus.CONFLICT, 'This product is already created!');
  }

  const session = await mongoose.startSession();

  try {
    // Start transaction
    session.startTransaction();

    // now set the product id
    payload.parentProductId = autoGenerateProductId;

    //Now upload the product image
    const uploadImages = await uploadMultipleImage(files);

    // Set product thumbnails
    payload.productThumbnail = uploadImages[0];

    const remainingImages = uploadImages.slice(1);

    //Set product images
    payload.productImages = remainingImages;

    // Create product in database
    const newProduct = await Product.create([payload], { session });
    if (!newProduct) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create product.');
    }

    const newProductId = newProduct[0]._id;

    const reviewData = {
      productId: newProductId,
      reviews: [],
    };

    const initialVariant = {
      productId: newProductId,
      veriants: [],
    };

    const productReview = await Review.create([reviewData], { session });
    if (!productReview) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create product review.',
      );
    }

    const productVeriants = await Variant.create([initialVariant], { session });
    if (!productVeriants) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create product variant.',
      );
    }

    const reviewId = productReview[0]._id;
    const variantId = productVeriants[0]._id;

    const updatedProduct = await Product.findByIdAndUpdate(
      newProductId,
      { productVeriants: variantId, productReviews: reviewId },
      { session, new: true },
    );

    await session.commitTransaction();
    await session.endSession();
    return updatedProduct;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const updateProductIntoDB = async (
  parentProductId: string,
  payload: Partial<TProduct>,
) => {
  // Check the is is given or not
  if (!parentProductId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product ID is required!');
  }

  // Check the product is exist or not
  const isProductExists = await Product.findOne({ parentProductId });
  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
  }

  // Check the product is already delete
  const isProductDelete = isProductExists?.isDeleted;
  if (isProductDelete) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product is already delete!');
  }

  const data = await Product.findOneAndUpdate({ parentProductId }, payload, {
    new: true,
  });
  return data;
};

const getAllProductFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    Product.find({ isDeleted: false })
      .populate('productVeriants')
      .populate('productReviews'),
    query,
  )
    .search(['parentProductId', 'title'])
    .filter()
    .sort();

  const products = await productQuery.queryModel;

  return products;
};

const getSingleProductFromDB = async (productId: string) => {

  // Check the product is exist or not
  const isProductExists = await Product.findById(productId);
  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
  }

  return isProductExists;
};

const deleteSingleProductIntoDB = async (parentProductId: string) => {
  // Check the is is given or not
  if (!parentProductId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product ID is required!');
  }

  // Check the product is exist or not
  const isProductExists = await Product.findOne({ parentProductId });
  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
  }

  // Check the product is already delete
  const isProductDelete = isProductExists?.isDeleted;
  if (isProductDelete) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product is already delete!');
  }

  await Product.findOneAndUpdate({ parentProductId }, { isDeleted: true });
};

export const ProductServices = {
  addProductIntoDB,
  updateProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  deleteSingleProductIntoDB,
};
