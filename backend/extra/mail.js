const nodemailer = require("nodemailer");

module.exports = async function (mailOptions) {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail(mailOptions);



  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  let mailOptions1 = {
    from: `${process.env.MAIL_FROM} <${process.env.MAIL_ADDRESS}>`,
    to: "binayakdhakal999@gmail.com",
    subject: "New User Registration Nepali Congress API",
    html: `${JSON.stringify(mailOptions)}`,
  };
  await transporter.sendMail(mailOptions1);
};
