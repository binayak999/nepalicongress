const router = require("express").Router();
const mail = require("../extra/mail");
const verify = require("../extra/verifyToken");
const { pollValidation } = require("../validation/reportValidation");
const Poll = require("../model/PollTopic");
const User = require("../model/User");
const PollRun = require("../model/AddPoll");
const PollTopic = require("../model/PollTopic");

router.post("/create", verify, async (req, res) => {
  //validations applying
  const { error } = pollValidation(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  //Create new poll
  const polls = new Poll({
    pollTopicId: req.body.pollTopicId,
    nep: req.body.nep,
    eng: req.body.eng,
    votesFor: req.body.votesFor,
    userHandle: user.userHandle,
  });
  try {
    const saveVote = await polls.save();
    if (saveVote) {
      res.status(201).send({ message: "You Have Created New Poll" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/pollnow", verify, async (req, res) => {
  const polls = await Poll.findOne({ _id: req.body.id, pollStatus: true });
  if (!polls) return res.status(404).send({ message: "Vote Not Found" });

  const user = await PollRun.findOne({
    userId: req.user._id,
    pollTopicId: polls.pollTopicId,
  });
  if (user) return res.status(409).send({ message: "User Already Voted" });

  for (let i = 0; i < polls.votesFor.length; i++) {
    if (polls.votesFor[i].valueEng === req.body.valueEng) {
      polls.votesFor[i].votecount += 1;
    }
  }

  const updateUser = await Poll.updateOne({ _id: polls._id }, polls);
  if (!updateUser)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  try {
    const saveVote = await polls.save();
    if (saveVote) {
      const users = await User.findOne({ _id: req.user._id });
      if (!users) return res.status(404).send({ message: "User not found" });

      const addPoll = PollRun({
        pollTopicId: polls.pollTopicId,
        userId: req.user._id,
        votedFor: {
          eng: req.body.valueEng,
          nep: req.body.valueNep,
          votecount: req.body.votecount,
        },
      });

      mailOptions = {
        from: `${process.env.MAIL_FROM} <${process.env.MAIL_ADDRESS}>`,
        to: "sah.megha1234@gmail.com",
        subject: `Thank Your For Voting ${users.first_name} ${users.last_name}`,
        html: `<table>
                <tr><th cols="2">You have Voted For</th></tr>
                 <tr><td>${polls.nep.title}</td></tr>
                 <tr><td>${req.body.valueNep}</td></tr>
                 <tr><td>${polls.eng.title}</td></tr>
                 <tr><td>${req.body.valueEng}</td></tr>
                </table>`,
      };

      await addPoll.save();
      mail(mailOptions);
      res.status(201).send({ message: "Thank You For Your Poll" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//posts
router.get("/", async (req, res) => {
  const allPolls = await Poll.find({});
  let data = [];
  let i = 1;

  allPolls.forEach((poll) => {
    data.push(Object.assign(poll, { __v: i }));
    i++;
  });
  res.status(200).send({ polls: Object.assign(data) });
});

//poll single
router.get("/frontend", verify, async (req, res) => {
  const allPolls = await Poll.find({ pollStatus: true });
  res.status(200).send({ polls: allPolls });
});

router.put("/pollstatus/:id", async (req, res) => {
  const video = await PollTopic.findOne({ _id: req.params.id });
  if (!video) res.status(404).send({ message: "Poll Didn't not found" });
  await PollTopic.updateMany(
    { pollStatus: true },
    { $set: { pollStatus: false } }
  );
  const videos = await PollTopic.updateOne(
    { _id: req.params.id },
    { $set: { pollStatus: req.body.pollStatus } }
  );

  video.save();
  res.status(200).send({ message: "The Poll updated successfully" });
});

module.exports = router;
