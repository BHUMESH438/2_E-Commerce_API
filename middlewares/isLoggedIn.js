import { getTokenFromHeaders } from '../utils/getTokenFromHeader.js';
import { verifyTokens } from '../utils/verifyToken.js';
export const isLoggedIns = (req, res, next) => {
  const token = getTokenFromHeaders(req);
  const decodedUser = verifyTokens(token);
  if (!decodedUser) {
    throw new Error('Invalid/Expired token please login again');
  } else {
    req.userAuthId = decodedUser?.id;
    next();
  }
};

//as its is a middle ware we have access to three arguments req,res,next
//this is use to protect the controllers through routes
//1.get token from the header
//2.verify token
//save the user into req obj
