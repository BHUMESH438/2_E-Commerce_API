import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const BrandSchema = new Schema(
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

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ]
  },
  { timestamps: true }
);

const Brand = mongoose.model('Brand', BrandSchema);
export default Brand;

//products==> how many category associated with the product
//user==>which user is using
