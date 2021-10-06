import Product from '../models/productModel.js';

// @desc      Fetch all products
// @route     GET /api/products
// @access    Public
const getProducts = async (req, res) => {
  try {
    const pageSize = 10;
    const page = +req.query.pageNumber || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const count = await Product.count({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    if (products.length === 0) {
      return res.status(404).send({
        error: 'There are no products available',
      });
    }

    res
      .status(200)
      .send({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
};

// @desc      Fetch single product
// @route     GET /api/products/:id
// @access    Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }
    return res.status(200).send(product);
  } catch (err) {
    res.status(404).send({ error: 'Product not found' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).send({ error: 'Product not found' });
    }

    await product.remove();
    res.status(200).send({ message: 'Product removed' });
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/image/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    });

    const createProduct = await product.save();
    res.status(201).send(createProduct);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const { name, price, description, image, brand, category, countInStock } =
      req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }

    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(200).send(updatedProduct);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }

    const alreadyReviewed = await product.reviews.find(
      (rvw) => rvw.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res
        .status(400)
        .send({ error: 'You already reviewed this product' });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: +rating,
      comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).send({ message: 'Review added' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// @desc    Ger top rated product
// @route   GET /api/products/top
// @access  Public
const getTopProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
