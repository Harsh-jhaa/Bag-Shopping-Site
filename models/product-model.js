import { text } from 'express';
import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: String,
  image: Buffer,
  price: Number,
  number: Number,
  discount: {
    type: Number,
    default: 0,
  },

  bgcolor: String,
  panelcolor: String,
  textcolor: String,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
