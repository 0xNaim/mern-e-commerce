import Product from '../models/productModel.js';

// @desc      Fetch all products
// @route     GET /api/products
// @access    Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    if (products.length === 0) {
      return res.status(404).send({
        error: 'There are no products available',
      });
    }

    res.status(200).send(products);
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

export { getProducts, getProductById, deleteProduct };
