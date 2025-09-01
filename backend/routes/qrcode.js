const router = require("express").Router();
const verify = require("../extra/verifyToken");
const Qrcode = require("../model/Qrcode");
const QRCode = require("qrcode");

router.get("/", async (req, res) => {
  try {
    // const qr = new Qrcode({
    //   connectedTo: req.body.connectedTo,
    //   userHandle: req.user.userHandle,
    //   createdAt: Date.now(),
    //   updateAt: Date.now(),
    // });
    // await qr.save();
    // Creating the data
    let data = "https://www.google.com";

    // Converting the data into String format
    let stringdata = JSON.stringify(data);

    // Print the QR code to terminal
    QRCode.toString(
      "https://nepalicongress.org/single/press-release/meeting-decision-2079-12-16",
      {
        errorCorrectionLevel: "H",
        type: "svg",
        quality: 0.92,
        width: 100,
        margin: 1,
        color: {
          dark: "#008000",
          light: "#FFF",
        },
      },
      function (err, QRcode) {
        if (err) return console.log("error occurred");

        // Printing the generated code
        return res.status(200).send(QRcode);
      }
    );
    // QRCode.toString(
    //   stringdata,
    //   {
    //     errorCorrectionLevel: "H",
    //     type: "svg",
    //     quality: 0.92,
    //     width: 200,
    //     margin: 1,
    //     color: {
    //       dark: "#008000",
    //       light: "#FFF",
    //     },
    //   },
    //   function (err, QRcode) {
    //     if (err) return console.log("error occurred");

    //     // Printing the generated code
    //     return res.status(200).send(QRcode);
    //   }
    // );

    // Converting the data into base64
    QRCode.toDataURL(stringdata, function (err, code) {
      if (err) return console.log("error occurred");

      // Printing the code
      //   console.log(code);
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "There was some error please try again" });
  }
});

module.exports = router;
