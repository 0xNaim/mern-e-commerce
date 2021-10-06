import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import connectDB from './src/db/mongoose.js';
import { errorHandler, notFound } from './src/middleware/errorMiddleware.js';
import orderRoutes from './src/routes/orderRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import uploadRoutes from './src/routes/uploadRoutes.js';
import userRoutes from './src/routes/userRoutes.js';

// express app initialize
const app = express();
app.use(express.json());

// morgan initialize
app.use(morgan('tiny'));

// dotenv config
dotenv.config();

// mongoDB connection
connectDB();

// port
const PORT = process.env.PORT || 8080;

// app routes
app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.status(200).send('Hello Express!');
  });
}

// 404 error handling
app.use(notFound);

// error handling
app.use(errorHandler);

// server running
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
