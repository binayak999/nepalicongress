const router = require("express").Router();
const verify = require("../extra/verifyToken");
const { committeeValidation } = require("../validation/leaderValidation");
const CentralCommittee = require("../model/CentralCommittee");
const User = require("../model/User");
const fs = require("fs");
const path = require("path");

router.post("/create", verify, async (req, res) => {
  //validations applying
  const { error } = committeeValidation(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  // //userdata
  const sorts = await CentralCommittee.findOne({ sorts: req.body.sorts });
  if (sorts)
    return res.status(409).send({ message: "Already in that position" });

  //Create new user
  const centralCommittee = new CentralCommittee({
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

  try {
    const centralCommitteeSave = await centralCommittee.save();
    if (centralCommitteeSave) {
      res
        .status(201)
        .send({ message: "You Have Successfully Added Central Committee" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//reports
router.get("/", async (req, res) => {
  const allReport = await CentralCommittee.find({});
  let data = [];
  let i = 1;

  allReport.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ centralcommittee: Object.assign(data) });
});

//Central Committee Single
router.get("/single/:id", async (req, res) => {
  const centrlcommittee = await CentralCommittee.findOne({
    _id: req.params.id,
  });

  res.status(200).send({ centralcommittee: centrlcommittee });
});

//Central Committee
router.put("/updateCommittee", async (req, res) => {
  const centrlcommittee = await CentralCommittee.findOne({ _id: req.body.id });
  if (!centrlcommittee)
    res.status(404).send({ message: "Central Committee Was Not Found" });

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
  await CentralCommittee.updateOne({ _id: req.body.id }, { $set: updateData });

  await centrlcommittee.save();

  res.status(200).send({ message: "Updated Committee" });
});

//reports
router.get("/frontend", async (req, res) => {
  try {
    const allLeader = await CentralCommittee.find().sort({ sort2: 1 });

    await res.status(200).send({ centralcommittee: allLeader });
  } catch (error) {
    console.log(error);
  }
});

function addFullImageUrl(mixArray) {
  mixArray.forEach((ele) => {
    if (ele.images.length > 0 && ele.images != undefined) {
      for (let i = 0; i < ele.images.length; i++) {
        let main = ele.images[i].fileUrl;
        let pre = "https://api.nepalicongress.org";
        let final = pre + main;
        ele.images[i].fileUrl = final;
      }
    }
    if (ele.attachment.length > 0 && ele.attachment != undefined) {
      for (let i = 0; i < ele.attachment.length; i++) {
        let main = ele.attachment[i].fileUrl;
        let pre = "https://api.nepalicongress.org";
        let final = pre + main;
        ele.attachment[i].fileUrl = final;
      }
    }
  });
}

function pagination(mixArray, page) {
  const limit = 10;
  const total = parseInt(mixArray.length / 10);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};
  results.total = total;
  if (endIndex < mixArray.length) {
    results.next = page + 1;
  }

  if (startIndex > 0) {
    results.previous = page - 1;
  }

  results.results = mixArray.slice(startIndex, endIndex);

  return results;
}

//reports
router.get("/app_frontend", async (req, res) => {
  try {
    const allLeader = await CentralCommittee.find().sort({ sort2: 1 });
    addFullImageUrl(allLeader);
    let result = pagination(allLeader, parseInt(req.query.page));
    res.status(200).send(result);
    // await res.status(200).send({ "centralcommittee": allLeader })
  } catch (error) {
    console.log(error);
  }
});

//reports
router.get("/frontend", async (req, res) => {
  try {
    const allLeader = await CentralCommittee.find().sort({ sort2: 1 });

    await res.status(200).send({ centralcommittee: allLeader });
  } catch (error) {
    console.log(error);
  }
});

//Central Committee delete
router.delete("/single/:id", verify, async (req, res) => {
  try {
    //Select single user
    const user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(404).send({ message: "Username Not Found" });

    //Select single page
    const centrlcommittee = await CentralCommittee.findOne({
      _id: req.params.id,
    });
    if (!centrlcommittee)
      return res.status(404).send({ message: "Page in not found" });

    // console.log(page)
    centrlcommittee.images.forEach((ele) => {
      if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
        fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
      }
    });
    centrlcommittee.attachment.forEach((ele) => {
      if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
        fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
      }
    });

    const delone = await CentralCommittee.findByIdAndDelete(req.params.id);
    if (!delone) res.status(404).send("Sorry no file found");

    res
      .status(200)
      .send({ message: "The committee has been deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
