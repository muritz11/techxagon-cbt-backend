
const MAIL_SETTINGS = {
  host: process.env.ZOHO_SERVER,
  port: process.env.ZOHO_PORT,
  secure: true,
  auth: {
    user: process.env.ZOHO_MAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport(MAIL_SETTINGS);

module.exports.sendFooterMail = async (params) => {
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to,
      subject: `New message from Webney ${params.webney_from}!`,
      html: `
            <div class="container" style="max-width: 90%; margin: auto; padding-top: 20px">
                <p>Hello Admin,</p>
                <p>You got a new message from Webney ${params.webney_from}</p>
                <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;">
                    <strong>Name:&nbsp;</strong>${params.name} <br /> <br />
                    <strong>Email:&nbsp;</strong>${params.email} <br /> <br />
                    <strong>Message: </strong><br /><br /> ${params.message}
                </p>

                <p>Best wishes.</p>
            </div>`,
    });

    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.sendTrainingMail = async (params) => {
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to,
      subject: `New message from Webney Training!`,
      html: `
            <div class="container" style="max-width: 90%; margin: auto; padding-top: 20px">
                <p>Hello Admin,</p>
                <p>You got a new message from Webney Training</p>
                <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;">
                    <strong>Name:&nbsp;</strong>${params.name} <br /> <br />
                    <strong>Email:&nbsp;</strong>${params.email} <br /> <br />
                    <strong>Selected track:&nbsp;</strong>${params.track} <br /> <br />
                    <strong>Inspiration:&nbsp;</strong>${params.inspiration} <br /> <br />
                    <strong>Message: </strong><br /><br /> ${params.message}
                </p>

                <p>Best wishes.</p>
            </div>`,
    });

    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
};


module.exports.sendTalentMail = async (params) => {
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to,
      subject: `New message from Webney Talent!`,
      attachments: [
        {
          filename: "Resume.pdf",
          path: params.resume,
        },
      ],
      html: `
            <div class="container" style="max-width: 90%; margin: auto; padding-top: 20px">
                <p>Hello Admin,</p>
                <p>You got a new message from Webney Talent</p>
                <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;">
                    <strong>Name:&nbsp;</strong>${params.name} <br /> <br />
                    <strong>Email:&nbsp;</strong>${params.email} <br /> <br />
                    <strong>Selected role:&nbsp;</strong>${params.role} <br /> <br />
                    <strong>Message: </strong><br /><br /> ${params.message}
                </p>

                <p>Best wishes.</p>
            </div>`,
    });

    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
};
