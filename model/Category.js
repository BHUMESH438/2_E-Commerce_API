import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users'
    },
    image: {
      type: String,
      default: 'https://via.placehaolder.com//150',
      required: true
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ]
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', CategorySchema);
export default Category;

//products==> how many category associated with the product
//user==>which user is using
//here we give [] for products as we will push our catogery to products array
