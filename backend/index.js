const express = require("express");
const cors = require("cors");
const Jwt = require("jsonwebtoken");
let jwtkey = "e-comm";
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const app = express();
app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     origin: "https://e-commerce-dashboard-server.vercel.app",
//   })
// );

app.post("/signup", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtkey, { expiresIn: "5h" }, (err, token) => {
    if (err) {
      resp.send({
        result: "Something went wrong! Please Try Again in sometime.",
      });
    } else {
      resp.send({ result, auth: token });
    }
  });
});

app.post("/login", async (req, resp) => {
  // console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtkey, { expiresIn: "5h" }, (err, token) => {
        if (err) {
          resp.send({
            result: "Something went wrong! Please Try Again in sometime.",
          });
        } else {
          resp.send({ user, auth: token });
        }
      });
    } else {
      resp.send({ result: "No user found" });
    }
  } else {
    resp.send({ result: "No user found" });
  }
});

app.post("/add-product", async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/products", async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "No Products Found!" });
  }
});

app.delete("/product/:id", async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "Not Found!" });
  }
});

app.get("/product/:id", async (req, resp) => {
  const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "Not Found!" });
  }
  // resp.send("working...");
});

app.put("/product/:id", async (req, resp) => {
  const result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

app.get("/search/:key", async (req, resp) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});

app.listen(5001);
