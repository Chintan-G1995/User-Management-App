const express = require("express");
const router = express.Router();
const {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../handle/userHandle");

router.post("/users", async (req, res) => {
  //add user
  let user=await addUser(req.body);
  res.send(user);
});

router.get("/users", async (req, res) => {
  //read user
  let users = await getUsers();
  res.send(users);
});

router.get("/users/:id", async (req, res) => {
  //read user By ID
  console.log("id", req.params["id"]);
  let user = await getUser(req.params["id"]);
  res.send(user);
});

//update
router.put("/users/:id", async (req, res) => {
  console.log("id", req.params["id"]);
  await updateUser(req.params["id"], req.body);
  res.send({});
});

//delete
router.delete("/users/:id", async (req, res) => {
  console.log("id", req.params["id"]);
  await deleteUser(req.params["id"]);
  res.send({});
});
module.exports = router;
