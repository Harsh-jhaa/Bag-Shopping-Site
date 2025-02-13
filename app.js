import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/mongoose-connection.js';
import ownersRouter from './routes/ownersRouter.js';
import productsRouter from './routes/productsRouter.js';
import usersRouter from './routes/usersRouter.js';
import indexRouter from './routes/index.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.set('view engine', 'ejs');

app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/owners', ownersRouter);
app.use('/', indexRouter);

app.listen(3001, () => console.log('Server is running on port 3001'));
