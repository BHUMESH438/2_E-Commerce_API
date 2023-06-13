import express from 'express';
import dotenv from 'dotenv';
import dbConnect from '../config/dbConnect.js';
import usersRoutes from '../routes/userRoute.js';
import { globalErrorHandlers, notFound } from '../middlewares/globalErrorHandler.js';
import productsRoutes from '../routes/productRoute.js';
import categoryRoutes from '../routes/categoryRouter.js';
import brandRoutes from '../routes/brandRoute.js';
import colorRoutes from '../routes/colorRoute.js';
import reviewRoutes from '../routes/reviewRoute.js';
import ordersRoutes from '../routes/orderRoute.js';

dotenv.config();
dbConnect(); //first connect db to server and start it

const app = express();
app.use(express.json());
app.use('/api/v1/user', usersRoutes);
app.use('/api/v1/product', productsRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/brand', brandRoutes);
app.use('/api/v1/color', colorRoutes);
app.use('/api/v1/review', reviewRoutes);
app.use('/api/v1/order', ordersRoutes);

app.use(notFound);
app.use(globalErrorHandlers);
export default app;

//always pass the error handlers below the main route
//use express-async-error to wrapup the controller and show the error in the body or send the error res to the browser
//async-error handlers helps to throw res to browser generbutally we use res.json or res.send but if we try using throw error it wont show on the browser body
