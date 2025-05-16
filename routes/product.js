const router = require("express").Router();
const Product = require("../models/Product");
const { verifyAdmin } = require("../middleware/auth");
const productController = require("../controllers/productController");

// CREATE a product (Admin only) | Method:POST /api/product/ with body {details as per schema}
router.post("/", verifyAdmin, productController.createProduct);

// UPDATE a product (Admin only) | Method:PUT /api/product/[productId] with body {field that you want to update}
router.put("/:id", verifyAdmin, productController.updateProduct);

// DELETE a product (Admin only) | Method:DELETE /api/product/[productId] 
router.delete("/:id", verifyAdmin, productController.deleteProduct);

// GET a single product (Public) | Method:GET /api/product/find/[productId]
router.get("/find/:id", productController.findSingleProduct);

// GET all products (Public, with optional filters) | Method:GET /api/product/ 
router.get("/", productController.getAllProducts);

module.exports = router;
