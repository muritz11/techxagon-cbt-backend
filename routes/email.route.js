const router = require("express").Router();
const { body } = require("express-validator");
const {
  footerMail,
  trainingMail,
  talentMail,
  multer,
} = require("../controllers/sendEmailController");

/**********************
 * route url: baseUrl/send-email/footer-mail
 * endpoint request: 
 {
    "name": String,
    "email": String,
    "about": String,
    "webney_from": String,
}
**********************/
router.post(
  "/footer-mail",
  body("name").not().isEmpty().withMessage("Name is required"),
  body("email").not().isEmpty().withMessage("Email is required"),
  body("about").not().isEmpty().withMessage("About is required"),
  footerMail
);

/**********************
 * route url: baseUrl/send-email/training-mail
 * endpoint request: 
 {
    "name": String,
    "email": String,
    "track": String,
    "inspiration": String,
    "about": String,
}
**********************/
router.post(
  "/training-mail",
  body("name").not().isEmpty().withMessage("Name is required"),
  body("email").not().isEmpty().withMessage("Email is required"),
  body("track").not().isEmpty().withMessage("Track is required"),
  body("inspiration").not().isEmpty().withMessage("Inspiration is required"),
  body("about").not().isEmpty().withMessage("About is required"),
  trainingMail
);

/**********************
 * route url: baseUrl/send-email/talent-mail
 * endpoint request: 
 {
    "name": String,
    "email": String,
    "role": String,
    "resume": File,
    "about": String,
}
**********************/
router.post("/talent-mail", multer.single("resume"), talentMail);

module.exports = router;
