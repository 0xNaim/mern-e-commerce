import mongoose from 'mongoose';

// connect to mongoDB
const connectDB = async () => {
  try {
    const mongoDB = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`Successfully Connected To MongoDB Database`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
