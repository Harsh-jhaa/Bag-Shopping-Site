import express from 'express';
// importing express for using Router
const router = express.Router();

const ownersRouter = router.get('/', (req, res) => {
  res.send('Owner Router');
});

export default ownersRouter;
