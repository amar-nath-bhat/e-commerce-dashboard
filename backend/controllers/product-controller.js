const Product = require("../models/Product");

const addProduct = async (req, res) => {
  try {
    let product = new Product(req.body);
    if (
      !product.name ||
      !product.price ||
      !product.category ||
      !product.company
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter All Details" });
    }
    await product.save();
    return res.status(200).json({
      success: true,
      product: product,
      message: "Product added successfully!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (product) {
      return res.status(200).json({ success: true, product: product });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    let products = await Product.find();
    if (products.length > 0) {
      return res.status(200).json({ success: true, products: products });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No Products Found!" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    let result = await Product.deleteOne({ _id: req.params.id });
    if (result) {
      return res
        .status(200)
        .json({ success: true, message: "Product deleted" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    await Product.findByIdAndUpdate(req.params.id, { $set: req.body });
    return res.status(200).json({ success: true, message: "Product updated" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const searchProduct = async (req, res) => {
  try {
    if (!req.params.key) {
      return res
        .status(404)
        .json({ success: false, message: "No search key provided" });
    }
    let result = await Product.find({
      $or: [
        { name: { $regex: req.params.key } },
        { price: { $regex: req.params.key } },
        { category: { $regex: req.params.key } },
        { company: { $regex: req.params.key } },
      ],
    });
    return res.status(200).json({ success: true, products: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  searchProduct,
};
