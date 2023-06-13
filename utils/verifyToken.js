import jwt from 'jsonwebtoken';
export const verifyTokens = token => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
};
