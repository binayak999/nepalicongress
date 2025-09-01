const router = require("express").Router();
const globalpagination = require("../extra/globalpagination");
const verify = require("../extra/verifyToken");
const SocialProfile = require("../model/SocialProfile");
const User = require("../model/User");

router.post("/create", verify, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const chk = await SocialProfile.findOne({
      userHandle: user.userHandle,
    });
    if (!chk) {
      const socialProfile = new SocialProfile({
        socialmedia: req.body.socialmedia,
        socialMediaOf: req.body.location,
        userHandle: user.userHandle,
        createdAt: Date.now(),
        updateAt: Date.now(),
      });
      await socialProfile.save();
      res.status(201).send({ message: "Social Profile has been created" });
    } else {
      await SocialProfile.updateOne({
        socialmedia: req.body.socialmedia,
        socialMediaOf: req.body.location,
        updateAt: Date.now(),
      });
      await chk.save();
      res.status(200).send({ message: "Social Profile has been updated" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});

router.post("/socialprofile", verify, async (req, res) => {
  try {
    const socialprofiles = await SocialProfile.find();
    let pagination = globalpagination(
      await SocialProfile.countDocuments(),
      req.body.skip,
      req.body.limit
    );
    res.status(200).send({
      message: "Social Profile fetch all",
      results: { data: socialprofiles, pagination: pagination },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});
router.post("/socialprofile/:id", verify, async (req, res) => {
  try {
    const socialprofile = await SocialProfile.findOne({ _id: req.body.id });
    res.status(200).send({
      message: "Social Profile fetch single",
      results: socialprofile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});

module.exports = router;
