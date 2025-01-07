import mongoose from 'mongoose';

const db = mongoose
  .connect('mongodb://127.0.0.1:27017/poject-1-mongoose')
  .then(() => {
    console.log('connected to database');
  })
  .catch((err) => {
    console.log(err);
  });

export default db;
