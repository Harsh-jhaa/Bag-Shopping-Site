import express from 'express';

const router = express.Router();

const indexRouter = router.get('/', (req, res) => {
  res.render('index');
});

export default indexRouter;
