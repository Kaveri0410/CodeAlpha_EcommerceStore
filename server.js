const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Product = require("./models/Product");
const Order = require("./models/Order");
const User = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/codealpha")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("SERVER OK - CODEALPHA");
});

// USER REGISTER
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// USER LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // user exists aa?
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // password match aa?
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login Successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// PRODUCTS
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ORDERS
app.post("/orders", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json({ message: "Order Placed Successfully" });
});

// START SERVER (MUST BE LAST)
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
