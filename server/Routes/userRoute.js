const express = require("express");
const router = express.Router();
const { registerUser, loginUser, findUser, getUsers } = require("../Controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/find/:userId", findUser);
router.post("/", getUsers);

module.exports = router;