import express from 'express';
import { isLoggedIns } from '../middlewares/isLoggedIn.js';
import { createColorCtrl, getColorCtrl, getSingleColorCtrl, updateColorCtrl, deleteColorCtrl, deleteAllColorCtrl } from '../controller/colorCntrl.js';
const colorRoutes = express.Router();
colorRoutes.post('/', isLoggedIns, createColorCtrl);
colorRoutes.get('/', getColorCtrl);
colorRoutes.get('/:id', getSingleColorCtrl);
colorRoutes.put('/:id', isLoggedIns, updateColorCtrl);
colorRoutes.delete('/:id/delete', isLoggedIns, deleteColorCtrl);
colorRoutes.delete('/deleteallColors', isLoggedIns, deleteAllColorCtrl);

export default colorRoutes;
