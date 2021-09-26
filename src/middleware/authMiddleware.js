import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verifyToken.id).select('-password');

    if (!user) {
      throw new Error('Authentication failed!');
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Authentication failed!' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { auth, admin };
