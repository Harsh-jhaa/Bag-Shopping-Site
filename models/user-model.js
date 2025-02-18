import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  number: Number,
  picture: String,
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      default: [],
    },
  ],

  orders: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model('User', userSchema);

export default User;
