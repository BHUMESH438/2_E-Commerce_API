import express from 'express';
import { createProductsCtrl, getSingleProduct, getProductsCtrl, updateSingleProduct, deleteSingleProduct } from '../controller/productCntrl.js';
import { isLoggedIns } from '../middlewares/isLoggedIn.js';

const productsRoutes = express.Router();
productsRoutes.post('/', isLoggedIns, createProductsCtrl);
productsRoutes.get('/', getProductsCtrl);
productsRoutes.get('/:id', getSingleProduct);
productsRoutes.put('/:id', isLoggedIns, updateSingleProduct);
productsRoutes.delete('/:id/delete', isLoggedIns, deleteSingleProduct);

export default productsRoutes;
