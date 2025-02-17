import express from 'express';
const router = express.Router();
import upload from '../config/multer-config.js';
import Product from '../models/product-model.js';

router.post('/create', upload.single('image'), async (req, res) => {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    let product = await Product.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash('success', 'product created successfully');
    res.redirect('/owners/admin');
  } catch (err) {
    res.send(err.message);
  }
});

export default router;
