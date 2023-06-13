import express from 'express';
import { isLoggedIns } from '../middlewares/isLoggedIn.js';
import { createBrandCtrl, getBrandCtrl, getSingleBrandCtrl, updateBrandCtrl, deleteBrandCtrl, deleteAllBrandCtrl } from '../controller/brandCntrl.js';
const brandRoutes = express.Router();
brandRoutes.post('/', isLoggedIns, createBrandCtrl);
brandRoutes.get('/', getBrandCtrl);
brandRoutes.get('/:id', getSingleBrandCtrl);
brandRoutes.put('/:id', isLoggedIns, updateBrandCtrl);
brandRoutes.delete('/:id/delete', isLoggedIns, deleteBrandCtrl);
brandRoutes.delete('/deleteallbrands', isLoggedIns, deleteAllBrandCtrl);

export default brandRoutes;
