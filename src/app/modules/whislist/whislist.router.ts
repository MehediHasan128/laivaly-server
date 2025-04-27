import express from 'express';
import { WhislistController } from './whislist.controller';

const router = express.Router();

// add to whislist
router.post('/create-whislist', WhislistController.addWhislist);
// get all whislist based on user
router.get('/:userId', WhislistController.getUserWhislist);
// get all whislist based on user
router.get('/products/single-product', WhislistController.singleWhislistProduct);
// get all whislist based on user
router.delete('/delete-whislist/:whislistId', WhislistController.deleteWhislist);

export const WhislistRouter = router;