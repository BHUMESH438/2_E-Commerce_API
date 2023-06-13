import express from 'express';
import { isLoggedIns } from '../middlewares/isLoggedIn.js';
import { creatOrderCtrl } from '../controller/orderCntrl.js';

const ordersRoutes = express.Router();
ordersRoutes.post('/', isLoggedIns, creatOrderCtrl);

export default ordersRoutes;
