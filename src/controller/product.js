// productController.js
const Product = require("../models/product");

// Controller for GET all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

// Controller for GET a specific product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching the product", error: error.message });
  }
};

// Controller for POST a new product
exports.createProduct = async (req, res) => {
  const { name, description, price, category, stock, images } = req.body;

  if (!req.currentUser.isAdmin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      throw Error("Product with this name already exists");
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      images,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating the product", error: error.message });
  }
};

// Controller for PUT (Update) a product by ID
exports.updateProduct = async (req, res) => {
  if (!req.currentUser.isAdmin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { id } = req.params;
  const { name, description, price, category, stock, images } = req.body;
  try {
    const existingProduct = await Product.findById(id);
    if (existingProduct.name != name) {
      const existingProductName = await Product.findOne({ name });
      if (existingProductName) {
        throw Error("Product with this name already exists");
      }
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, stock, images },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating the product", error: error.message });
  }
};

// Controller for DELETE a product by ID
exports.deleteProduct = async (req, res) => {
  if (!req.currentUser.isAdmin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting the product", error: error.message });
  }
};
