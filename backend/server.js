const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// 🔗 MongoDB
mongoose.connect("mongodb+srv://howlor:howlor123@cluster0.yelzxdr.mongodb.net/shop")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// 🔐 LOGIN
app.post("/login", (req, res) => {
  const { login, password } = req.body;

  if (login === "admin" && password === "123") {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

// 🚀 START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
mongoose.connect("mongodb+srv://howlor:howlor123@cluster0.yelzxdr.mongodb.net/shop?retryWrites=true&w=majority")