const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/user-route");
const cors = require("cors");
const port = 3000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(userRoutes);



async function connectdb() {
  await mongoose.connect("mongodb://localhost:27017/todoapp");
}
connectdb()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
