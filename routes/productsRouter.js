import express from 'express';

const router = express.Router();

const productsRouter = router.get('/', (req, res) => {
  res.send('Product Router');
});

export default productsRouter;
