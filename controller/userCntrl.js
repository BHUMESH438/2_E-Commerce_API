import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import generateTokens from '../utils/generateToken.js';
import { getTokenFromHeaders } from '../utils/getTokenFromHeader.js';

// @desc  Register User
// @route POST api/v1/user/register
// @access Private/Admin
//##1.import data from the  req.body
//##2.check for the data in DB
//##3.hash password
//##4.register user in db
//##5.send back the registered response

//register controller------>>>>-------->>>-------->>>--------

export const registerUserCtrl = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body; //##1
  const checkUser = await User.findOne({ email }); //##2
  if (checkUser) {
    throw new Error(`user with this ${email} already exist`);
  }
  const salt = await bcrypt.genSalt(10); //##3
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    //##4.
    fullName,
    email,
    password: hashedPassword
  });
  res.status(200).json({
    //##5.
    status: 'success',
    message: 'User Registered Successfully',
    data: user
  });
});

// @desc  Login User
// @route POST api/v1/user/Login
// @access Public/User

//Login controller------>>>>-------->>>-------->>>--------

export const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    res.status(200).json({
      status: 'success',
      message: 'login success',
      userFound,
      token: generateTokens(userFound?._id)
    });
  } else {
    throw new Error('Please register user(invalid Credetails)');
  }
});
//if check user  true then we can use  simply "res" as it will be not true in the register
//in the if the condition is true it use return
//cannot set headers after they are sent to the client means you are sending 2 res in controller
//in first login we will genrate the troken and send it to res and it will be stored in the local storage.
//after every time we logged in the server will get the token from the local storage
//note in this controller we used the jwt sign  and  from next we will use jwt verify to verify the token is valid/expreied/notused
//the saved token will be saved in the authorisation headers of http req and a Bearer too.

// @desc  get user profile
// @route GET api/v1/user/Login
// @access Private

//get user profile controller------>>>>-------->>>-------->>>--------
export const getUserProfileCtrl = asyncHandler(async (req, res) => {
  const token = getTokenFromHeaders(req);
  res.status(200).json({ message: `welcome back` });
});

//after login the server will send back the user a token and it will be stored in the users as cookies or local storage
//after when user want to see the profile page then server gets the token from user. first the req passes through the middleware and it checks the user is logged in by seeing the token from the login user(note here after login when user want to see the profile this seqof action takeplace)
//middleware - getthe auth.header.bearer token from header
// - verify it as http is stateless and after that it insert the loggedin user id as a req.obj and pass it to the next getUserProfileCtrl where it gets the token and also the id so that it fetch the users data from the DB to show the user profile

export const updateShippingAddress = async (req, res) => {
  const { firstName, lastName, address, city, postalCode, province, country, phone } = req.body();
  const user = await User.findByIdAndUpdate(
    req.userAuthId,
    {
      ShippingAddress: {
        firstName,
        lastName,
        address,
        city,
        postalCode,
        province,
        country,
        phone
      },
      hasShippingAddress: true
    },
    {
      new: true
    }
  );
  res.json({
    status: 'success',
    message: 'user shipping address updated successfully'
  });
};
