const express = require("express");
const Product = require("./models/Product");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/codealpha")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("SERVER OK - CODEALPHA");
});

app.get("/test", (req, res) => {
  res.json({ message: "TEST API WORKING" });
});

// Get all products
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add product
app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
