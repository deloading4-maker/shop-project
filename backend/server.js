const express = require("express");
const mongoose = require("mongoose");

const app = express();

// подключение к MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// простой маршрут
app.get("/", (req, res) => {
  res.send("API работает");
});

// порт
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
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

mongoose.connect("mongodb+srv://deloading4_db_user:howlor123@cluster0.yelzxdr.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB подключен"))
  .catch(err => console.log(err));