import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc      Auth user & get token
// @route     POST /api/users/login
// @access    Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }

    res.status(401).send({ error: 'Invalid email or password' });
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
};

// @desc      Register a new user
// @route     POST /api/users/
// @access    Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).send({ error: 'User already exists' });
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    if (!newUser) {
      return res.status(400).send({ error: 'Invalid user data' });
    }

    res.status(201).send({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id),
    });
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
};

// @desc      Get user profile
// @route     GET /api/users/profile
// @access    Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new Error('User not found');
    }

    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.status(200).send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(404).send({ error: 'User not found' });
  }
};

// @desc      Get all users
// @route     GET /api/users
// @access    Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(404).send({ error: 'There are no users available' });
    }

    res.status(200).send(users);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
};

export { registerUser, authUser, getUserProfile, updateUserProfile, getUsers };
