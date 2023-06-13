import Category from '../model/Category.js';
import asyncHandler from 'express-async-handler';

// @desc  Create new Category
// @route POST api/v1/Category
// @access Private/Admin
export const createCategoryCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const categoryFound = await Category.findOne({ name });
  if (categoryFound) {
    throw new Error('category already exist');
  }
  const category = await Category.create({ name: name.toLowerCase(), user: req.userAuthId });

  res.status(201).json({
    status: 'success',
    message: 'catogery created successfully',
    category
  });
});

// @desc  GET all Category
// @route GET api/v1/Category
// @access PUBLIC
export const getCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await Category.find();
  res.status(200).json({
    message: 'all category fetched successfully',
    status: 'success',
    category
  });
});

// @desc  GET single  Category
// @route GET api/v1/Category
// @access PUBLIC

export const getSingleCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw new Error('category not found');
  res.status(200).json({
    message: 'category fetched successfully',
    status: 'success',
    category
  });
});

// @desc  PUT single  Category
// @route PUT api/v1/Category
// @access PRIVATE/ADMIN

export const updateCategoryCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
  if (!category) {
    throw new Error('category not found');
  }
  res.status(200).json({
    message: 'category updated successfully',
    status: 'success',
    category
  });
});

// @desc  DELETE single  Category
// @route DELETE api/v1/Category
// @access PRIVATE/ADMIN

export const deleteCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: 'category deleted successfully',
    status: 'success'
  });
});
