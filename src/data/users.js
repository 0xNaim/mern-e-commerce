import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('password', 10),
    isAdmin: true,
  },
  {
    name: 'Naim',
    email: 'naim@example.com',
    password: bcrypt.hashSync('password', 10),
  },
  {
    name: 'Onoy',
    email: 'onoy@example.com',
    password: bcrypt.hashSync('password', 10),
  },
];

export default users;
