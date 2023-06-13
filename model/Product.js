import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    desciption: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    category: {
      type: String,
      ref: 'Category',
      required: true
    },
    sizes: {
      type: [String],
      enum: ['S', 'M', 'L', 'XL', 'XXL'],
      required: true
    },
    colors: {
      type: [String],
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users'
    },
    images: [
      {
        type: String,
        default: 'https://via.placehaolder.com//150'
      }
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
      }
    ],
    price: {
      type: Number,
      required: true
    },
    totalQty: {
      type: Number,
      required: true
    },
    totalSold: {
      type: Number,
      required: true,
      default: 0
    }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
ProductSchema.virtual('quantity').get(function () {
  return this?.totalQty - this.totalSold;
});
ProductSchema.virtual('totalReviews').get(function () {
  return this?.reviews?.length;
});
ProductSchema.virtual('averageRating').get(function () {
  let ratingTotal = 0;
  this?.reviews?.forEach(review => {
    ratingTotal += review?.rating;
  });
  const averageRating = Number(ratingTotal / this?.reviews?.length).toFixed(1);
  return averageRating;
});
const Product = mongoose.model('Product', ProductSchema);
export default Product;

//for reference use{} not [{}] ex:users{}
