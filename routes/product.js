const router = require("express").Router();
const Product = require("../models/Product");
const { verifyAdmin } = require("../middleware/auth");
const productController = require("../controllers/productController");

// CREATE a product (Admin only)
router.post("/", verifyAdmin, productController.createProduct);

// UPDATE a product (Admin only)
router.put("/:id", verifyAdmin, productController.updateProduct);

// DELETE a product (Admin only)
router.delete("/:id", verifyAdmin, productController.deleteProduct);

// GET a single product (Public)
router.get("/find/:id", productController.findSingleProduct);

// GET all products (Public, with optional filters)
router.get("/", productController.getAllProducts);

module.exports = router;
