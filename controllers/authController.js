import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user-model.js';
import generateToken from '../utils/generateToken.js';
import expressSession from 'express-session';
import flash from 'connect-flash';

const registerUser = async (req, res) => {
  try {
    let { email, password, fullname } = req.body;
    // check if user already exists
    let user = await User.findOne({ email: email });
    if (user) {
      req.flash('error', 'you already have an account , please login');
      return res.redirect('/');
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        else {
          let user = await User.create({
            email,
            password: hash,
            fullname,
          });
          let token = generateToken(user);
          res.cookie('token', token);
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};
const loginUser = async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email: email });
  if (!user) {
    req.flash('error', 'email or password incorrect try again');
    return res.redirect('/');
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      // setting token and sending the cookie to the client
      let token = generateToken(user);
      res.cookie('token', token);
      return res.redirect('/shop');
    } else {
      req.flash('error', 'email or password incorrect try again');
      return res.redirect('/');
    }
  });
};
const logoutUser = async (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};
export { registerUser, loginUser, logoutUser };
