// routes/result.route.js
const express = require("express");
const router = express.Router();
const {
  createResults,
  getResults,
} = require("../controllers/resultController");

router.post("/upload", createResults);
router.get("/all", getResults);

module.exports = router;
