import expressAsyncHandler from 'express-async-handler';
import User from '../model/User.js';
import Order from '../model/Order.js';
import Product from '../model/Product.js';
//creating the order
export const creatOrderCtrl = expressAsyncHandler(async (req, res) => {
  //1- get the order detauls from the req.body
  const { orderItems, shippingAddress, totalPrice } = req.body;
  //2-find the user who ordered and push the data inside the user collection
  const FindUser = await User.findById(req.userAuthId);
  if (FindUser.hasShippingAddress) {
    throw new Error('please provide shipping address');
  }
  if (orderItems.length <= 0) {
    //3-check the orderItems data is empty and if it is empty send throw new error
    throw new Error('product order item is empty');
  }
  //4-create order from above details
  const order = await Order.create({
    user: FindUser?._id.toString(),
    orderItems,
    shippingAddress,
    totalPrice
  });
  //updating the order
  const products = await Product.find({ _id: { $in: orderItems } });
  orderItems.map(async order => {
    const product = products?.find(product => {
      return product?._id?.toString() === order?._id?.toString();
    });
    if (product) {
      product.totalSold += order.totalQtyBuying;
    }
    await product.save();
  });
  //after updating pushing the order to user cart
  FindUser.orders.push(order?._id);
  await FindUser.save();
  res.json({
    success: true,
    message: 'order created',
    order,
    FindUser
  });
});

//5-after updating save it in the user collection so when user logged in user can able to see the items in his list(push and use await save
//6-if the user orders we should increase the totalsold and reduce the total quantity
//7-here we will pass the orderitems id in product collection so we will get the matching record of prduct_id in product===product_id in order
