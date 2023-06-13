import jwt from 'jsonwebtoken';

const generateTokens = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
};

export default generateTokens;
