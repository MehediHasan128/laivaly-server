import { catchAsync } from '../../utils/catchAsync';
import { sendResponce } from '../../utils/sendResponce';
import { VariantServices } from './variant.services';


const addProductVariant = catchAsync(async (req, res) => {
  const data = await VariantServices.addProductVariantIntoDB(req.params.productId, req.body);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: `New variant has been added successfully.`,
    data: data,
  });
});

const getProductVariant = catchAsync(async (req, res) => {
  const data = await VariantServices.getProductVariantFromDB(req.params.variantId);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: '',
    data: data,
  });
});

export const VariantController = {
  addProductVariant,
  getProductVariant
};
