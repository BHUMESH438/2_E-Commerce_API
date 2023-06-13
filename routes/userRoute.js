import express from 'express';
import { registerUserCtrl, loginUserCtrl, getUserProfileCtrl } from '../controller/userCntrl.js';
import { isLoggedIns } from '../middlewares/isLoggedIn.js';
const usersRoutes = express.Router();
usersRoutes.post('/register', registerUserCtrl);
usersRoutes.post('/login', loginUserCtrl);
usersRoutes.get('/profile', isLoggedIns, getUserProfileCtrl);
export default usersRoutes;
