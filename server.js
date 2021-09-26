import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/db/mongoose.js';
import { errorHandler, notFound } from './src/middleware/errorMiddleware.js';
import orderRoutes from './src/routes/orderRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import userRoutes from './src/routes/userRoutes.js';

// express app initialize
const app = express();
app.use(express.json());

// dotenv config
dotenv.config();

// mongoDB connection
connectDB();

// port
const PORT = process.env.PORT || 8080;

// root route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// app routes
app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// 404 error handling
app.use(notFound);

// error handling
app.use(errorHandler);

// server running
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});