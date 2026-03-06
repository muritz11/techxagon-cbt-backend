// routes/result.route.js
const express = require("express");
const router = express.Router();
const { createResults } = require("../controllers/resultController");

router.post("/upload", createResults);

module.exports = router;
