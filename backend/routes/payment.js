const router = require("express").Router();
const verify = require("../extra/verifyToken");
const Payment = require("../model/Payment");
const globalpagination = require("../extra/globalpagination");

router.post("/create", verify, async (req, res) => {
  try {
    const payment = new Payment({
      connectedTo: req.body.connectedTo,
      userHandle: req.user.userHandle,
      paymentStatus: req.body.paymentStatus,
      amount: req.body.amount,
      paymentTranObj: req.body.paymentTranObj,
      paymentStatus: req.body.paymentStatus,
      paymentFor: req.body.paymentFor,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    await payment.save();
    return res.status(201).send({ message: "Payment has been created" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

router.post("/list", verify, async (req, res) => {
  try {
    const filter = {};
    if(req.body.paymentFor != undefined){
      filter.paymentFor = req.body.paymentFor
    }
    const payment = await Payment.find(filter)
      .skip((req.body.page - 1) * 10)
      .limit(10);
    const paymentCount = await Payment.countDocuments();
    const pagination = globalpagination(paymentCount, req.body.page, 10);
    return res
      .status(200)
      .send({ message: "Payment List", results: payment, pagination });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

module.exports = router;
