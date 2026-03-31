const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/clothing")
  .then(() => console.log("DB CONNECTED 🔥"))
  .catch(err => {
    console.log("DB ERROR ❌");
    console.log(err);
  });

// модель заказа
const Order = mongoose.model("Order", {
  name: String,
  price: Number
});

// временное хранилище (можно убрать потом)
let orders = [];

// тест
app.get("/", (req, res) => {
  res.send("SERVER WORKING 🔥");
});

// создать заказ
app.post("/order", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.send("Order saved");
});

// получить все заказы
app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// сервер
app.get("/add-products", async (req, res) => {
  await Product.deleteMany();

  await Product.insertMany([
    {
      name: "DESTROYER HOODIE",
      price: 8900,
      img: "hoodie.jpg"
    },
    {
      name: "DESTROYER JERSEY",
      price: 5500,
      img: "jersey.jpg"
    }
  ]);

  res.send("products added");
});

app.listen(3001, () => {
  console.log("SERVER STARTED ON 3001 🚀");
});

app.get("/", (req, res) => {
  res.send("Server works 🚀");
});

app.post("/order", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.send("Saved ✅");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error ❌");
  }
});

app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.delete("/order/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.send("Deleted 🗑️");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.put("/order/:id", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

const Product = mongoose.model("Product", {
  name: String,
  price: Number,
  img: String
});

app.post("/login", (req, res) => {
  const { login, password } = req.body;

  if (login === "admin" && password === "123") {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

const mongoose = require("mongoose");

mongoose.connect("mongodb://<deloading4_db_user>:<howlor123>@ac-shqaeqr-shard-00-00.yelzxdr.mongodb.net:27017,ac-shqaeqr-shard-00-01.yelzxdr.mongodb.net:27017,ac-shqaeqr-shard-00-02.yelzxdr.mongodb.net:27017/?ssl=true&replicaSet=atlas-iz2que-shard-0&authSource=admin&appName=Cluster0")
  .then(() => console.log("MongoDB подключен"))
  .catch(err => console.log(err));