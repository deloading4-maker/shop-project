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