const router = require("express").Router();
const bcrypt = require("bcryptjs");
const mail = require("../extra/mail");
const verify = require("../extra/verifyToken");
const { leaderValidation } = require("../validation/leaderValidation");
const Leader = require("../model/Leader");
const User = require("../model/User");
const { default: slugify } = require("slugify");
const fs = require("fs");
const path = require("path");

router.post("/create", verify, async (req, res) => {
  //validations applying
  const { error } = leaderValidation(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  //Create new user
  const leader = new Leader({
    nep: req.body.nep,
    eng: req.body.eng,
    slug: slugify(req.body.eng.title, {
      replacement: "-",
      remove: undefined,
      lower: true,
      strict: false,
      locale: "vi",
    }),
    images: req.body.images,
    userHandle: user.userHandle,
    email: req.body.email,
  });

  try {
    const leaderSave = await leader.save();
    if (leaderSave) {
      res.status(201).send({ message: "You Have Successfully Add Leader" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//reports
router.get("/", async (req, res) => {
  const allReport = await Leader.find({});
  let data = [];
  let i = 1;

  allReport.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ leaders: Object.assign(data) });
});

//reports
router.get("/frontend", verify, async (req, res) => {
  const allLeader = await Leader.find({});

  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  res.status(200).send({ leaders: allLeader });
});

//reports
router.delete("/delete/:id", verify, async (req, res) => {
  try {
    const leader = await Leader.findOne({ _id: req.params.id });
    if (!leader) return res.status(404).send({ message: "Leader Not Found" });

    // //userdata
    const user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(404).send({ message: "Username Not Found" });

    // console.log(page)
    leader.images.forEach((ele) => {
      if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
        fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
      }
    });

    const delone = await Leader.findByIdAndDelete(req.params.id);
    if (!delone) res.status(404).send("Sorry no file found");

    res.status(200).send({ message: "The page has been deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
