import express from 'express';
import { registerUser, loginUser,logoutUser } from '../controllers/authController.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('User Router');
});
// registering a new user customer
router.post('/register', registerUser);

//login an user
router.post('/login', loginUser);

//logout a user
router.get('/logout', logoutUser);

export default router;
