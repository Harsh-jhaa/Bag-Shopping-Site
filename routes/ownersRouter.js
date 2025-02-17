import express from 'express';
import ownerModel from '../models/owner-model.js';

// importing express for using Router
const router = express.Router();

// only available in development to create a user
if (process.env.NODE_ENV === 'development') {
  router.post('/create', async (req, res) => {
    let owners = await ownerModel.find();
    if (ownerModel.length > 0) {
      return res.send(503).send('You are unauthorized to create owner');
    }
    // creating a new owner
    let { fullname, email, password } = req.body;
    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });
    res.status(201).send(createdOwner);
  });
}

router.get('/admin', (req, res) => {
  let success = req.flash('success');
  res.render('createproducts', { success: success });
});

// set env as development by running "$env:NODE_ENV=development" in terminal.

export default router;
