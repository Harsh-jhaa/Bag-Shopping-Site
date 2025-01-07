import express from 'express';

const router = express.Router();

const ownersRouter = router.get('/', (req, res) => {
  res.send('Owner Router');
});

export default ownersRouter;
