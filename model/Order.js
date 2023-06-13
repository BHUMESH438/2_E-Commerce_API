import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumbers = Math.floor(1000 + Math.random() * 90000);
const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    orderItems: [
      {
        type: Object,
        required: true
      }
    ],
    shippingAddress: {
      type: Object,
      required: true
    },
    orderNumber: {
      type: String,
      default: randomTxt + randomNumbers
    },
    //for stripe payment
    paymentStatus: {
      type: String,
      default: 'Not paid'
    },
    paymentMethod: {
      type: String,
      default: 'Not specified'
    },
    totalPrice: {
      type: Number,
      default: 0.0
    },
    currency: {
      type: String,
      default: 'Not Specified'
    },
    //for admin
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'processing', 'shipped', 'delivered']
    },
    deliveredAt: {
      type: Date
    }
  },
  { timestamps: true }
);

//we are placing the user order inside the object type of the orderItens array

const Order = mongoose.model('Order', OrderSchema);
export default Order;
