import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ColorSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    }
  },
  { timestamps: true }
);

const Color = mongoose.model('Color', ColorSchema);
export default Color;

//products==> how many category associated with the product
//user==>which user is using/or the creater of the color
//here we dont want the product [] as it is the a single product has many colors
