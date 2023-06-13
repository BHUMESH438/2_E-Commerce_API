import Color from '../model/Color.js';
import asyncHandler from 'express-async-handler';

// @desc  Create new Color
// @route POST api/v1/Color
// @access Private/Admin
export const createColorCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const colorFound = await Color.findOne({ name });
  if (colorFound) {
    throw new Error('Color already exist');
  }
  //getting the Color and converting it to lower case
  const color = await Color.create({ name: name.toLowerCase(), user: req.userAuthId });

  res.status(201).json({
    status: 'success',
    message: 'Color created successfully',
    color
  });
});

// @desc  GET all Color
// @route GET api/v1/Color
// @access PUBLIC
export const getColorCtrl = asyncHandler(async (req, res) => {
  const color = await Color.find();
  if (!Color) {
    throw new Error('the Color collection is empty');
  }
  res.status(200).json({
    message: 'all Color fetched successfully',
    status: 'success',
    color
  });
});

// @desc  GET single  Color
// @route GET api/v1/Color
// @access PUBLIC

export const getSingleColorCtrl = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);
  if (!Color) throw new Error('Color not found');
  res.status(200).json({
    message: 'Color fetched successfully',
    status: 'success',
    color
  });
});

// @desc  PUT single  Color
// @route PUT api/v1/Color
// @access PRIVATE/ADMIN

export const updateColorCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const color = await Color.findByIdAndUpdate(req.params.id, { name }, { new: true });
  if (!Color) {
    throw new Error('Color not found');
  }
  res.status(200).json({
    message: 'Color updated successfully',
    status: 'success',
    color
  });
});

// @desc  DELETE single  Color
// @route DELETE api/v1/Color
// @access PRIVATE/ADMIN

export const deleteColorCtrl = asyncHandler(async (req, res) => {
  const color = await Color.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: `Color ${Color.name}  deleted successfully`,
    status: 'success'
  });
});

export const deleteAllColorCtrl = asyncHandler(async (req, res) => {
  const color = await Color.deleteMany();
  res.status(200).json({
    message: ` all Color  deleted successfully`,
    status: 'success'
  });
});
