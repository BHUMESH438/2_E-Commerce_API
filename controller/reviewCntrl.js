import Product from '../model/Product.js';
import Review from '../model/Review.js';
import asyncHandler from 'express-async-handler';
// @desc  Create new Review
// @route POST api/v1/Review
// @access Private/Admin
export const createReviewCtrl = asyncHandler(async (req, res) => {
  const { message, rating } = req.body;
  const { productId } = req.params;
  const productFound = await Product.findById(productId).populate('reviews'); //****we should populate both in sending and receiving area or the error will come as new objID like that
  if (!productFound) throw new Error('product with this id not found');

  const hasReviewed = await productFound?.reviews?.find(reviews => {
    return reviews.user.toString() === req?.userAuthId.toString();
  });
  if (hasReviewed) throw new Error('you have already reviewed this product ');

  //if the reviews userid in the single product is === auth id of the reveiw of that product. so only one user can make a single review req for one time (create)
  //in the user ref in product is aobjId and not a string so that we should give toString to convert it to string
  const review = await Review.create({
    user: req.userAuthId,
    products: productFound._id,
    message,
    rating
  });
  productFound.reviews.push(review?._id);
  await productFound.save();
  res.status(201).json({
    status: 'success',
    message: 'reveiw created success fully'
  });
});

//duplicate yreview - each time creating the review the review id is genrated in the reviews array of the single product.
//so a multiple review can be genrated by the single user
//Solution: to avoid this the multiple reveiws by the single user we can send the user id inside the reveiw array
