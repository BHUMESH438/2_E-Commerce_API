import express from 'express';
import { isLoggedIns } from '../middlewares/isLoggedIn.js';
import { createReviewCtrl } from '../controller/reviewCntrl.js';
const reviewRoutes = express.Router();
reviewRoutes.post('/:productId', isLoggedIns, createReviewCtrl);

export default reviewRoutes;
