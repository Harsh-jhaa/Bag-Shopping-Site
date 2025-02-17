import express from 'express';
import isloggedin from '../middlewares/isloggedin.js';
import User from '../models/user-model.js';
import Product from '../models/product-model.js';
// import shop from '../views/shop.ejs';

const router = express.Router();

router.get('/', (req, res) => {
  let error = req.flash('error');
  res.render('index', { error, loggedin: false });
});

router.get('/shop', isloggedin, async (req, res) => {
  let product = await Product.find();
  var success = req.flash('success');

  res.render('shop', { product, success });
});
router.get('/cart', isloggedin, async (req, res) => {
  let user = await User.findOne({ email: req.user.email }).populate('cart');

  const bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);

  res.render('cart', { user, bill });
});
router.get('/addtocart/:productid', isloggedin, async (req, res) => {
  let user = await User.findOne({ email: req.user.email });
  user.cart.push(req.params.productid);
  await user.save();
  req.flash('success', 'product added to cart');
  res.redirect('/shop');
});

router.get('/logout', (req, res) => {
  req.render('shop');
});

export default router;
