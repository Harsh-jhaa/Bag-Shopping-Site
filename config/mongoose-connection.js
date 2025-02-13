import mongoose from 'mongoose';
import debug from 'debug';
import config from 'config';

const dbgr = debug('development:mongoose');

// setting the db url as dynamic depending on the environment (development, production, test)
// see the config folder for more details
// config.get sees the environment and gets the appropriate url accordingly
mongoose
  .connect(`${config.get('MONGODB_URI')}/poject-1-mongoose`)
  .then(() => {
    dbgr('connectefd to database');
  })
  .catch((err) => {
    dbgr(err);
  });

export default mongoose.connection;
