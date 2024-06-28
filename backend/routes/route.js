const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const productController = require("../controllers/product-controller");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authenticateToken = (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return response.status(401).json({ msg: "Token is Missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return response.status(403).json({ msg: "invalid token" });
    }

    request.user = user;
    next();
  });
};

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.post("/add-product", authenticateToken, productController.addProduct);
router.get("/product/:id", authenticateToken, productController.getProduct);
router.get("/products", authenticateToken, productController.getProducts);
router.delete(
  "/delete/:id",
  authenticateToken,
  productController.deleteProduct
);
router.put("/update/:id", authenticateToken, productController.updateProduct);
router.get("/search/:key", authenticateToken, productController.searchProduct);

module.exports = router;
