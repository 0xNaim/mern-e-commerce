import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    rating: { type: Number, trim: true, required: true },
    comment: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      trim: true,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      trim: true,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      trim: true,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
