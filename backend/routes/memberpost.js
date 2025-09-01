const router = require("express").Router();
const verify = require("../extra/verifyToken");
const MemberPost = require("../model/MemberPost");
const globalpagination = require("../extra/globalpagination");

router.post("/create", verify, async (req, res) => {
  try {
    const memberPost = new MemberPost({
      name: req.body.name,
      phone: req.body.phone,
      province: req.body.province,
      district: req.body.district,
      municipality: req.body.municipality,
      memberPost: req.body.memberPost,
      userHandle: `@_${req.body.name}${Math.floor(1000 + Math.random() * 900)}`,
      adminHandle: req.user.userHandle,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    await memberPost.save();
    return res
      .status(201)
      .send({ message: "Committee Member has been created" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

router.post("/list", verify, async (req, res) => {
  try {
    const memberPost = await MemberPost.find()
      .skip((req.body.page - 1) * 10)
      .limit(10);
    const totalOM = await MemberPost.countDocuments();
    const pagination = globalpagination(totalOM, req.body.page, 10);
    return res.status(200).send({
      message: "Committee Member List",
      results: memberPost,
      pagination,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

router.post("/sendOtp", async (req, res) => {
  try {
    const memberPost = await MemberPost.findOne({ phone: req.body.phone });
    if (!memberPost)
      return res.status(404).send({ message: "Committee Member Not Found" });

    return res
      .status(200)
      .send({ message: "Committee Member Found", results: memberPost });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const memberPost = await MemberPost.findOne({
      phone: req.body.phone,
      otp: req.body.otp,
    });
    if (!memberPost)
      return res.status(404).send({ message: "Committee Member Not Found" });

    const tokenTime = 60 * 60 * 24 * 1;
    // create and assign the token
    const token = jwt.sign(
      {
        _id: memberPost._id,
        userHandle: memberPost.userHandle,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: tokenTime }
    );

    let userData = {
      token: token,
      user: {
        id: memberPost._id,
        name: memberPost.name,
        phone: memberPost.phone,
      },
    };

    return res
      .status(200)
      .send({ message: "Committee Member Found", results: userData });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

module.exports = router;
