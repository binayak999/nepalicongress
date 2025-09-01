const router = require("express").Router();
const verify = require("../extra/verifyToken");
const {
  forumValidation,
  lettertoleaderValidation,
} = require("../validation/reportValidation");
const Forum = require("../model/Forum");
const ForumDiscuss = require("../model/ForumDiscuss");
const Lettertoleader = require("../model/Lettertoleader");
const User = require("../model/User");
const slugify = require("slugify");
const Medias = require("../model/Medias");
const fs = require("fs");
const path = require("path");
const Hackton = require("../model/Hackton");

router.post("/create", verify, async (req, res) => {
  //validations applying
  const { error } = forumValidation(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "User Not found !" });

  //Create new user
  const report = new Forum({
    title: req.body.title,
    content: req.body.content,
    images: req.body.images,
    userHandle: user.userHandle,
    forumHandle:
      user.userHandle +
      slugify(req.body.title, {
        replacement: "-",
        remove: undefined,
        lower: true,
        strict: false,
        locale: "vi",
      }),
    createdAt: Date.now(),
    updateAt: Date.now(),
  });

  try {
    const reportSave = await report.save();
    if (reportSave) {
      res.status(201).send({ message: "Your report has been posted" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//mobile forums
router.post("/app-createforum", verify, async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    if (req.files === null) {
      res.send(400).send({ message: "File Check you file" });
    }
    //file select in formdata
    const file = req.files.file;
    let imagepath;
    //file path in imagepath

    imagepath = path.normalize(
      __dirname + "/../uploads/forums/" + req.body.fileType
    );

    //split image data
    const imageName = file.name.split(".");
    //get the extension of file
    const ext = imageName[imageName.length - 1];
    const imageSave = `/ncforums${Math.floor(
      Math.random() * 9999999999999
    ).toString()}-${Date.now()}.${ext}`;
    const uploadPath = `${imagepath}${imageSave}`;
    // console.log(req.body)

    file.mv(uploadPath, async (err) => {
      let medias;

      medias = new Medias({
        name: imageSave,
        usedin: "forums",
        fileLocation: `/uploads/forums/${req.body.fileType}${imageSave}`,
        assignedTo: "forum",
        fileType: req.body.fileType,
        status: false,
      });
      forum = new Forum({
        title: req.body.title,
        content: req.body.content,
        images: [
          { fileUrl: `/uploads/forums/${req.body.fileType}${imageSave}` },
        ],
        userHandle: user.userHandle,
        forumHandle:
          user.userHandle +
          slugify(req.body.title, {
            replacement: "-",
            remove: undefined,
            lower: true,
            strict: false,
            locale: "vi",
          }),
        createdAt: Date.now(),
        updateAt: Date.now(),
      });

      await medias.save();
      await forum.save();

      res.status(201).send({
        message: "Forum has been created successfully",
      });
    });
  } catch (error) {
    console.log(error);
    res.status({ message: "Something went wrong!" });
  }
});

//update
router.post("/replyindiscuss", verify, async (req, res) => {
  // //userdata
  const forum = await Forum.findOne({ forumHandle: req.body.forumHandle });
  if (!forum) return res.status(404).send({ message: "Forum Not Found !" });

  //Create new user
  const forumDiscuss = new ForumDiscuss({
    forumHandle: req.body.forumHandle,
    content: req.body.content,
    createdAt: Date.now(),
    updateAt: Date.now(),
  });

  let allReplies = await ForumDiscuss.find({ forumHandle: forum.forumHandle });

  let updateUser;

  if (allReplies.length <= 0) {
    try {
      await forumDiscuss.save();

      updateUser = await Forum.updateOne(
        { userHandle: forum.userHandle },
        { $set: { replies: [forumDiscuss] } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      await forum.save();
      res.status(201).send({ message: "Your forum has been posted" });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      await forumDiscuss.save();

      allReplies = await ForumDiscuss.find({ forumHandle: forum.forumHandle });

      updateUser = await Forum.updateOne(
        { userHandle: forum.userHandle },
        { $set: { replies: allReplies } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      await forum.save();
      res.status(201).send({ message: "Your forum has been posted" });
    } catch (error) {
      console.log(error);
    }
  }
});

router.post("/createlettertoleader", verify, async (req, res) => {
  //validations applying
  const { error } = lettertoleaderValidation(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "User Not found !" });

  //Create new user
  const report = new Lettertoleader({
    title: req.body.title,
    content: req.body.content,
    email: req.body.email,
    userHandle: user.userHandle,
  });

  try {
    const reportSave = await report.save();
    if (reportSave) {
      res.status(201).send({ message: "Your letter has been posted" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//reports
router.get("/", async (req, res) => {
  const allReport = await Forum.find({});
  let data = [];
  let i = 1;

  allReport.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ forums: Object.assign(data) });
});

//reports
router.get("/letters", async (req, res) => {
  const allReport = await Lettertoleader.find({});
  let data = [];
  let i = 1;

  allReport.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ letters: Object.assign(data) });
});

router.post("/hackthon", async (req, res) => {
  try {
    if (req.body.teamEmail == "") {
      return res.status(412).send({ message: "Team Email is required" });
    }
    const hackton = new Hackton({
      teamEmail: req.body.teamEmail,
      teamSize: req.body.teamSize,
      teamContact: req.body.teamContact,
      teamContactPhoneNo: req.body.teamContactPhoneNo,
      teamLeaderEmail: req.body.teamLeaderEmail,
      teamLeaderCollege: req.body.teamLeaderCollege,
      teamLeaderPlaceOfResidence: req.body.teamLeaderPlaceOfResidence,
      teamLeaderFullName: req.body.teamLeaderFullName,
      team2LeaderFullName: req.body.team2LeaderFullName,
      team2LeaderEmail: req.body.team2LeaderEmail,
      team2LeaderCollege: req.body.team2LeaderCollege,
      team2LeaderPlaceOfResidence: req.body.team2LeaderPlaceOfResidence,
      team3LeaderFullName: req.body.team3LeaderFullName,
      team3LeaderEmail: req.body.team3LeaderEmail,
      team3LeaderCollege: req.body.team3LeaderCollege,
      team3LeaderPlaceOfResidence: req.body.team3LeaderPlaceOfResidence,
      team4LeaderFullName: req.body.team4LeaderFullName,
      team4LeaderEmail: req.body.team4LeaderEmail,
      team4LeaderCollege: req.body.team4LeaderCollege,
      team4LeaderPlaceOfResidence: req.body.team4LeaderPlaceOfResidence,
      team5LeaderFullName: req.body.team5LeaderFullName,
      team5LeaderEmail: req.body.team5LeaderEmail,
      team5LeaderCollege: req.body.team5LeaderCollege,
      team5LeaderPlaceOfResidence: req.body.team5LeaderPlaceOfResidence,
      topic: req.body.topic,
      challenge: req.body.challenge,
      whyHack: req.body.whyHack,
      bestOn: req.body.bestOn,
    });

    await hackton.save();

    let frontIdea;
    if (req.files) {
      const file_idea = req.files.ideaFile;
      const imagepath = path.normalize(__dirname + "/../uploads/hackton");
      const imageName1 = file_idea.name.split(".");
      const ext1 = imageName1[imageName1.length - 1];
      const img1 = `ncforum${Math.floor(
        Math.random() * 9999999999999
      ).toString()}-${Date.now()}.${ext1}`;

      const uploadPath1 = `${imagepath}/${img1}`;

      file_idea.mv(uploadPath1, async (err) => {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        }
        frontIdea = uploadPath1;
      });

      await Hackton.updateOne(
        {
          _id: hackton._id,
        },
        {
          $set: {
            ideaFile: "http://api.nepalicongress.org/uploads/hackton/" + img1,
          },
        }
      );
    }

    return res.status(200).send({ message: "Your form has been submitted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
