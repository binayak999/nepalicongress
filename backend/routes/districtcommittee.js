const router = require("express").Router();
const verify = require("../extra/verifyToken");
const { committeeValidation } = require("../validation/leaderValidation");
const DistrictCommittee = require("../model/DistrictCommittee");
const Subdomain = require("../model/Subdomain");
const fs = require("fs");
const path = require("path");

router.post("/create", verify, async (req, res) => {
  //validations applying
  const { error } = committeeValidation(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  // //userdata
  const user = await Subdomain.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Subdomain Not Found" });

  // //userdata
  const sorts = await DistrictCommittee.findOne({ sorts: req.body.sorts });
  if (sorts)
    return res.status(409).send({ message: "Already in that position" });

  //Create new user
  const centralCommittee = new DistrictCommittee({
    nep: req.body.nep,
    eng: req.body.eng,
    sort1: req.body.sort1,
    sort2: req.body.sort2,
    sorts: req.body.sorts,
    images: req.body.images,
    attachment: req.body.attachment,
    facebookUrl: req.body.facebookUrl,
    twitterUrl: req.body.twitterUrl,
    instagramUrl: req.body.instagramUrl,
    userHandle: user.userHandle,
  });

  updateUser(res, user, centralCommittee);
});

//reports
router.get("/", verify, async (req, res) => {
  const user = await Subdomain.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Subdomain Not Found" });
  const allReport = await DistrictCommittee.find({
    userHandle: user.userHandle,
  });

  let data = [];
  let i = 1;

  allReport.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ districtcentralcommittee: Object.assign(data) });
});

//Central Committee Single
router.get("/single/:id", async (req, res) => {
  const centrlcommittee = await DistrictCommittee.findOne({
    _id: req.params.id,
  });

  res.status(200).send({ districtcentralcommittee: centrlcommittee });
});

//Central Committee
router.put("/updateCommittee", verify, async (req, res) => {
  const centrlcommittee = await DistrictCommittee.findOne({ _id: req.body.id });
  if (!centrlcommittee)
    res.status(404).send({ message: "Central Committee Was Not Found" });

  // //userdata
  const user = await Subdomain.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Subdomain Not Found" });

  if (req.body.removedImage.length != 0) {
    req.body.removedImage.forEach((ele) => {
      if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
        fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
      }
    });
  }
  if (req.body.removedAttachment.length != 0) {
    req.body.removedAttachment.forEach((ele) => {
      if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
        fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
      }
    });
  }

  let updateData = {
    nep: req.body.nep,
    eng: req.body.eng,
    sort1: req.body.sort1,
    sort2: req.body.sort2,
    sorts: req.body.sorts,
    facebookUrl: req.body.facebookUrl,
    twitterUrl: req.body.twitterUrl,
    instagramUrl: req.body.instagramUrl,
    images: req.body.images,
    attachment: req.body.attachment,
    updateAt: Date.now(),
  };
  await DistrictCommittee.updateOne({ _id: req.body.id }, { $set: updateData });

  updateUser(res, user, centrlcommittee);
});

//reports
router.get("/frontend/:slug", async (req, res) => {
  // //userdata
  const user = await Subdomain.findOne({ slug: req.params.slug });
  if (!user) return res.status(404).send({ message: "Subdomain Not Found" });
  try {
    const allLeader = await DistrictCommittee.find({
      userHandle: user.userHandle,
    }).sort({ sort2: 1 });

    await res.status(200).send({ districtcentralcommittee: allLeader });
  } catch (error) {
    console.log(error);
  }
});

//Central Committee delete
router.delete("/single/:id", verify, async (req, res) => {
  try {
    //Select single user
    const user = await Subdomain.findOne({ _id: req.user._id });
    if (!user) return res.status(404).send({ message: "Username Not Found" });

    //Select single page
    const centrlcommittee = await DistrictCommittee.findOne({
      _id: req.params.id,
    });
    if (!centrlcommittee)
      return res.status(404).send({ message: "Page in not found" });

    // console.log(page)
    if (centrlcommittee.images.length != 0) {
      centrlcommittee.images.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }
    if (centrlcommittee.attachment.length != 0) {
      centrlcommittee.attachment.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    const delone = await DistrictCommittee.findByIdAndDelete(req.params.id);
    if (!delone) res.status(404).send("Sorry no file found");

    updateUserDelete(res, user, centrlcommittee);
  } catch (error) {
    console.log(error);
  }
});

const updateUser = async (res, user, centrlcommittee) => {
  try {
    let allCommittee = await DistrictCommittee.find({
      userHandle: user.userHandle,
    });
    if (allCommittee.length !== 0) {
      try {
        centralCommitteeSave = await centrlcommittee.save();
        allCommittee = await DistrictCommittee.find({
          userHandle: user.userHandle,
        });

        const updateUser = await Subdomain.updateOne(
          { userHandle: user.userHandle },
          { $set: { committee: allCommittee } }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res.status(201).send({ message: "Your Committee has been deleted" });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await centrlcommittee.save();
        const updateUser = await Subdomain.updateOne(
          { userHandle: user.userHandle },
          { $set: { committee: [centrlcommittee] } }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res.status(201).send({ message: "Your Committee has been deleted" });
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const updateUserDelete = async (res, user, centrlcommittee) => {
  try {
    let allCommittee = await DistrictCommittee.find({
      userHandle: user.userHandle,
    });
    if (allCommittee.length !== 0) {
      try {
        centralCommitteeSave = await centrlcommittee.save();
        allCommittee = await DistrictCommittee.find({
          userHandle: user.userHandle,
        });

        const updateUser = await Subdomain.updateOne(
          { userHandle: user.userHandle },
          { $set: { committee: allCommittee } }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res.status(200).send({ message: "Your Committee has been deleted" });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const updateUser = await Subdomain.updateOne(
          { userHandle: user.userHandle },
          { $set: { committee: [] } }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res.status(200).send({ message: "Your Committee has been deleted" });
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = router;
