import Order from '../models/orderModel.js';

// @desc      Create new order
// @route     POST /api/orders
// @access    Private
const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  try {
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).send(createdOrder);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// @desc      Get order by id
// @route     GET /api/orders/:id
// @access    Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );
    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }

    res.status(200).send(order);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      throw new Error('Order not found');
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.status(200).send(updatedOrder);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    if (!orders) {
      return res.status(404).send({ error: 'There are no orders available' });
    }
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };
