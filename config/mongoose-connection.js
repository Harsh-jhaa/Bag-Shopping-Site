import mongoose from 'mongoose';
import debug from 'debug';

const dbgr = debug('development:mongoose');

const db = mongoose
  .connect('mongodb://127.0.0.1:27017/poject-1-mongoose')
  .then(() => {
    dbgr('connectefd to database');
  })
  .catch((err) => {
    dbgr(err);
  });

export default db;
