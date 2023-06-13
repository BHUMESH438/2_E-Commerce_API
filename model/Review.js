import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ReviewSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: [true, 'Review must belong to the user ']
    },
    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Review must belong to the Product ']
    },
    message: {
      type: String,
      required: [true, 'Review must belong to the message ']
    },
    rating: {
      type: Number,
      required: [true, 'please add the rating between 1 and 5'],
      min: 1,
      max: 5
    }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

const Review = mongoose.model('Review', ReviewSchema);

export default Review;

//here we use the user in the review model as the user can reveiw the product once at time
//product which product we want to reveiw and that we want to reference that
//toJson:{vrituals} is used to populate the ids of user to reveiw from product model
//so with this one we can use the populate on the reveiw model which is the vritual model
