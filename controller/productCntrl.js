import Brand from '../model/Brand.js';
import Category from '../model/Category.js';
import Product from '../model/Product.js';
import asyncHandler from 'express-async-handler';

// @desc  Create new product
// @route POST api/v1/products
// @access Private/Admin

export const createProductsCtrl = asyncHandler(async (req, res) => {
  const { name, desciption, category, sizes, colors, images, price, totalQty, brand } = req.body;
  //product exist
  const productExists = await Product.findOne({ name });
  if (productExists) throw new Error('product already exist');

  //find catogery in catagoryDB
  const categoryFound = await Category.findOne({ name: category });
  if (!categoryFound) throw new Error('category not found please create the catogery first or check the catogery name in catogery collection ');
  //find brand in brandDB
  const brandFound = await Brand.findOne({ name: brand });
  if (!brandFound) throw new Error('brand not found please create the brandrand first or check the brand name in brand collection');

  //create product
  const product = await Product.create({
    name: category,
    desciption,
    brand,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    images,
    price,
    totalQty
  });
  //push the product into category
  categoryFound.products.push(product._id);
  // resave in product
  await categoryFound.save();
  //push the product into  brand
  brandFound.products.push(product._id);
  //resave- as we maderespec changes in catogery/brand model record we shoud resave it in the respected model collection
  await brandFound.save();
  res.status(201).json({
    status: 'success',
    message: 'Product creatred successfully',
    product
  });
});

//for user we are going to use the user as req.userAuthId as we are going to protect the controller as when we logged in we will pass the token also passed along. so when only the user logged he can do changes

//the req will carry post product data along with the req.authUserId data also so that in the db we can define the this product is created by this user

// @desc  GET all product
// @route GET api/v1/products
// @access PUBLIC

export const getProductsCtrl = asyncHandler(async (req, res) => {
  let productquery = Product.find();

  //filters - property
  if (req.query.name) {
    productquery = productquery.find({
      name: { $regex: req.query.name, $options: 'i' }
    });
  }
  if (req.query.brand) {
    productquery = productquery.find({
      brand: { $regex: req.query.brand, $options: 'i' }
    });
  }
  if (req.query.category) {
    productquery = productquery.find({
      category: { $regex: req.query.category, $options: 'i' }
    });
  }
  if (req.query.colors) {
    productquery = productquery.find({
      colors: { $regex: req.query.colors, $options: 'i' }
    });
  }
  if (req.query.size) {
    productquery = productquery.find({
      sizes: { $regex: req.query.size, $options: 'i' }
    });
  }
  if (req.query.price) {
    //---?price=100-200=>{price:'100-200'}
    const priceRange = req.query.price.split('-'); //['100','200']
    productquery = productquery.find({
      price: { $gte: priceRange[0], $lte: priceRange[1] }
    });
  }

  //whaterver we give in the query that will be a string
  //page-visible to user with all product
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  //limit- no of record of data to be displayed / page
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
  //   //startindex - help to paginnate
  const startindex = (page - 1) * limit;
  //   //endindex
  const endindex = page * limit;
  //   //total
  const total = await Product.countDocuments();
  //   //pagination result
  const pagination = {};
  //   //1< 3--if the enidx is less than three then it will show the next page
  if (endindex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }
  //4> 3--if the startindex is less than 0 then it will show the prev page
  if (startindex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }
  //if we give 1 page and limit 1 product/page skip(0) limit (1)
  //skipping 0 means nothing it will be in the 0 th index of array of products[{}]
  productquery = productquery.skip(startindex).limit(limit);
  const allProducts = await productquery.populate('reviews'); //here we populate the vdata to reveiw data model - for fetching all data
  res.status(200).json({
    status: 'success',
    total,
    result: allProducts.length,
    pagination,
    message: 'product fetched successfully',
    allProducts
  });
});

//after await the query method wont work, query is the moment of truth
//what ever process done before the await will stop that query and brings back the query
//query is the extra obj we sending to the req method in http through url
//then we should prepare the query before the await

//pagination- in pagination the collection data in db is dispalyed.
//in collection 1 curser [] contains 20  data an it is displayed in the postman/browser. if we query it with limit 10 it will give 10 as output
//if we skip 0 or skip 2 means it will skip the the document data from the asc or top. if we skip 2 means 1,2 data will be skipped and the 3rd data will be shown

// @desc  GET Single product
// @route GET api/v1/product/:id
// @access PUBLIC

export const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('reviews');
  if (!product) throw new Error('product not found');
  res.status(200).json({
    status: 'success',
    message: 'Product fetched successfully',
    product
  });
});

// @desc  PUT Single product update
// @route PUT api/v1/product/:id
// @access Private/Admin

export const updateSingleProduct = asyncHandler(async (req, res) => {
  const { name, desciption, brand, category, sizes, colors, user, images, price, totalQty } = req.body;
  const product = await Product.findByIdAndUpdate(req.params.id, { name, desciption, brand, category, sizes, colors, user, images, price, totalQty }, { new: true });
  if (!product) throw new Error('product with this id not found');
  res.status(200).json({
    status: 'success',
    message: 'Product updated successfully',
    product
  });
});

// @desc  DELETE all product
// @route DELETE api/v1/products
// @access Private/Admin

export const deleteSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Product deleted successfully'
  });
});
