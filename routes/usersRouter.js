import express from 'express';

const router = express.Router();

const usersRouter = router.get('/', (req, res) => {
  res.send('User Router');
});

export default usersRouter;
