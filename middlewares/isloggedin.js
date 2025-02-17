import jwt from 'jsonwebtoken';
import User from '../models/user-model.js';

const isloggedin = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash('error', 'you need to login first');
    return res.redirect('/');
  }
  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await User.findOne({ email: decoded.email }).select('-password');
    req.user = user;
    next();
  } catch (err) {
    req.flash('error', 'something went wrong');
    return res.redirect('/');
  }
};

export default isloggedin;
