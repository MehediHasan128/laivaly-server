import express from 'express';
import { WhislistController } from './whislist.controller';

const router = express.Router();

// add to whislist
router.post('/create-whislist', WhislistController.addWhislist)

export const WhislistRouter = router;