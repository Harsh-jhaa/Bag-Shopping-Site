import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/mongoose-connection.js';
import ownersRouter from './routes/ownersRouter.js';
import productsRouter from './routes/productsRouter.js';
import expressSession from 'express-session';
import flash from 'connect-flash';
import usersRouter from './routes/usersRouter.js';
import indexRouter from './routes/index.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse cookies
app.use(cookieParser());

// Configure express-session
app.use(
  expressSession({
    secret: ' process.env.EXPRESS_SESSION_SECRET', // Use the secret from .env
    resave: false, // Do not resave the session if it hasn't changed
    saveUninitialized: false, // Do not save uninitialized sessions
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // Session expiration time (e.g., 1 day)
    },
  })
);

// Middleware for flash messages
app.use(flash());

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// Routes
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/owners', ownersRouter);
app.use('/', indexRouter);

// Start the server
app.listen(3001, () => console.log('Server is running on port 3001'));
