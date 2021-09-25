import dotenv from 'dotenv';
import products from './data/products.js';
import users from './data/users.js';
import connectDB from './db/mongoose.js';
import Order from './models/orderModel.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Added!');
    process.exit();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Deleted!');
    process.exit();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
