/* eslint-disable no-undef */
// backend/api/index.js
const express = require('express');
const userRouter = require("./user.js");
const router = express.Router();
router.use("/user", userRouter)
module.exports = router;