import Brand from '../model/Brand.js';
import asyncHandler from 'express-async-handler';

// @desc  Create new Brand
// @route POST api/v1/Brand
// @access Private/Admin
export const createBrandCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brandFound = await Brand.findOne({ name });
  if (brandFound) {
    throw new Error('brand already exist');
  }
  //getting the brand and converting it to lower case
  const brand = await Brand.create({ name: name.toLowerCase(), user: req.userAuthId });

  res.status(201).json({
    status: 'success',
    message: 'brand created successfully',
    brand
  });
});

// @desc  GET all brand
// @route GET api/v1/brand
// @access PUBLIC
export const getBrandCtrl = asyncHandler(async (req, res) => {
  const brand = await Brand.find();
  if (!brand) {
    throw new Error('the brand collection is empty');
  }
  res.status(200).json({
    message: 'all brand fetched successfully',
    status: 'success',
    brand
  });
});

// @desc  GET single  brand
// @route GET api/v1/brand
// @access PUBLIC

export const getSingleBrandCtrl = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) throw new Error('brand not found');
  res.status(200).json({
    message: 'brand fetched successfully',
    status: 'success',
    brand
  });
});

// @desc  PUT single  brand
// @route PUT api/v1/brand
// @access PRIVATE/ADMIN

export const updateBrandCtrl = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await Brand.findByIdAndUpdate(req.params.id, { name }, { new: true });
  if (!brand) {
    throw new Error('brand not found');
  }
  res.status(200).json({
    message: 'brand updated successfully',
    status: 'success',
    brand
  });
});

// @desc  DELETE single  brand
// @route DELETE api/v1/brand
// @access PRIVATE/ADMIN

export const deleteBrandCtrl = asyncHandler(async (req, res) => {
  const brand = await Brand.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: `Brand ${brand.name}  deleted successfully`,
    status: 'success'
  });
});

export const deleteAllBrandCtrl = asyncHandler(async (req, res) => {
  const brand = await Brand.deleteMany();
  res.status(200).json({
    message: ` all Brand  deleted successfully`,
    status: 'success'
  });
});
