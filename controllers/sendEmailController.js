const { validationResult } = require("express-validator");
const {
  sendFooterMail,
  sendTrainingMail,
  sendTalentMail,
} = require("../services/mail");
const multer = require("multer");
const emailTo = "Webneyhq@gmail.com";

module.exports.footerMail = async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response
      .status(400)
      .json({ status: "error", errors: errors.array() });
  }

  const body = request.body;

  try {
    await sendFooterMail({
      to: emailTo,
      webney_from: body.webney_from,
      name: body.name,
      email: body.email,
      message: body.about,
    });

    return response.status(200).json({
      status: "success",
      message: "Email sent!",
    });
  } catch (error) {
    return response.status(500).json({
      status: "error",
      message: `An error occured -> ${error}`,
    });
  }
};

module.exports.trainingMail = async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response
      .status(400)
      .json({ status: "error", errors: errors.array() });
  }

  const body = request.body;

  try {
    await sendTrainingMail({
      to: emailTo,
      name: body.name,
      email: body.email,
      track: body.track,
      inspiration: body.inspiration,
      message: body.about,
    });

    return response.status(200).json({
      status: "success",
      message: "Email sent!",
    });
  } catch (error) {
    return response.status(500).json({
      status: "error",
      message: `An error occured -> ${error}`,
    });
  }
};

module.exports.talentMail = async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response
      .status(400)
      .json({ status: "error", errors: errors.array() });
  }

  const { name, email, role, about } = request.body;
  const resume = request.file ? request.file.path : null;

  try {
    await sendTalentMail({
      to: emailTo,
      name,
      email,
      role,
      resume,
      message: about,
    });

    return response.status(200).json({
      status: "success",
      message: "Email sent!",
    });
  } catch (error) {
    return response.status(500).json({
      status: "error",
      message: `An error occured: -> ${error}`,
    });
  }
};

module.exports.multer = multer({
  dest: "uploads/",
});
