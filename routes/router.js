const router = require("express").Router();

router.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

router.use("/result", require("./result.route"));

// free endpoint
router.get("/free-endpoint", (request, response) => {
  response.json({ message: `this is a free (unAuth) endpoint` });
});

module.exports = router;
