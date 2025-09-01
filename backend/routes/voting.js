const router = require("express").Router();
const bcrypt = require("bcryptjs");
const mail = require("../extra/mail");
const verify = require("../extra/verifyToken");
const verifyVote = require("../extra/verifyVote");
const { voteValidation, smsSend } = require("../validation/reportValidation");
const VoteTopic = require("../model/VoteTopic");
const VoteRun = require("../model/AddVote");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const Voters = require("../model/Voters");
const request = require("request");

router.post("/create", verify, async (req, res) => {
  //validations applying
  const { error } = voteValidation(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  // //userdata
  const votetopic = await VoteTopic.findOne({
    voteTopicId: req.body.voteTopicId,
  });
  if (votetopic)
    return res.status(409).send({ message: "Voting Already Created" });

  let smsTo = [];
  let votes;

  if (req.body.sms == "Yes") {
    if (req.body.smsSentTo.length != 0) {
      var i = 0;

      const allUser = await Voters.find({ votingGroup: req.body.smsSentTo });
      if (allUser.length === 0)
        res.status(404).send({ message: "No Members Registered Yet!" });

      allUser.forEach(async (post) => {
        i += 1;
        let votingUsername =
          "NC" +
          post.first_name[0] +
          post.last_name[0] +
          post.voter_id +
          Math.floor(1000 + Math.random() * 5) +
          req.body.voteTopicId.slice(0, 3);
        let votingPassword =
          "N" + Math.floor(1000 + Math.random() * 9000).toString() + "C";

        try {
          request.post(
            "https://sms.aakashsms.com/sms/v3/send",
            {
              json: {
                auth_token: "29ed0ec58213e4d87765d7f47f347c69cda83701b84229d3dd8a0717ac0701b5",
       
                to: `${post.phone}`,
                text: `Vote ${req.body.voteTopicId}: user = ${votingUsername}, pass = ${votingPassword}`,
              },
            },
            async function (error, response, body) {
              //Has passwords
              const salt = await bcrypt.genSalt(10);
              const hashedPassword = await bcrypt.hash(votingPassword, salt);
              let votesAssigned;

              if (!error) {
                votesAssigned = VoteRun({
                  voteTopicId: req.body.voteTopicId,
                  userId: post._id,
                  votedFor: {},
                  username: votingUsername,
                  password: hashedPassword,
                  passwordText: votingPassword,
                  email: post.email,
                  phone: post.phone,
                  userRole: post.userRole,
                  smsSent: true,
                });
              } else {
                votesAssigned = VoteRun({
                  voteTopicId: req.body.voteTopicId,
                  userId: post._id,
                  votedFor: {},
                  username: votingUsername,
                  password: hashedPassword,
                  passwordText: votingPassword,
                  email: post.email,
                  phone: post.phone,
                  userRole: post.userRole,
                  smsSent: false,
                });
              }
              await votesAssigned.save();
            }
          );
        } catch (error) {
          res.status(400).send(error);
        }
      });

      if (allUser.length == i) {
        votes = new VoteTopic({
          voteTopicId: req.body.voteTopicId,
          userId: req.user._id,
          nep: req.body.nep,
          eng: req.body.eng,
          numberofvoters: req.body.numberofvoters,
          votesFor: req.body.votesFor,
          userHandle: user.name,
          sms: req.body.sms,
        });
        try {
          const saveVote = await votes.save();
          if (saveVote) {
            res.status(201).send({ message: "You Have Created New Vote" });
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  } else {
    const allUser = await Voters.find({ votingGroup: req.body.smsSentTo });
    if (allUser.length === 0)
      res.status(404).send({ message: "No Members Registered Yet!" });

    allUser.forEach(async (post) => {
      let votingUsername =
        "NC" +
        post.voter_id +
        Math.floor(1000 + Math.random() * 5) +
        req.body.voteTopicId.slice(0, 3);
      let votingPassword =
        "N" + Math.floor(1000 + Math.random() * 9000).toString() + "C";

      //Has passwords
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(votingPassword, salt);

      const votesAssigned = VoteRun({
        voteTopicId: req.body.voteTopicId,
        userId: post._id,
        votedFor: {},
        username: votingUsername,
        password: hashedPassword,
        passwordText: votingPassword,
        email: post.email,
        phone: post.phone,
        userRole: post.userRole,
        smsSent: false,
      });
      await votesAssigned.save();

      setTimeout(async () => {
        //Create new vote
        votes = new VoteTopic({
          voteTopicId: req.body.voteTopicId,
          userId: req.user._id,
          nep: req.body.nep,
          eng: req.body.eng,
          numberofvoters: req.body.numberofvoters,
          votesFor: req.body.votesFor,
          userHandle: user.name,
          sms: req.body.sms,
        });

        try {
          const saveVote = await votes.save();
          if (saveVote) {
            res.status(201).send({ message: "You Have Created New Vote" });
          }
        } catch (error) {
          res.status(400).send(error);
        }
      }, 1000);
    });
  }
});

router.post("/sendSms", verify, async (req, res) => {
  const voteUser = await VoteRun.findOne({ _id: req.body.id });
  if (!voteUser) return res.status(404).send({ message: "Vote Not Found" });

  request.post(
    "https://sms.aakashsms.com/sms/v3/send",
    {
      json: {
        auth_token: "29ed0ec58213e4d87765d7f47f347c69cda83701b84229d3dd8a0717ac0701b5",
        from: "InfoSMS",
        to: `${voteUser.phone}`,
        text: `Vote ${voteUser.voteTopicId}: user = ${voteUser.username}, pass = ${voteUser.passwordText}`,
      },
    },
    async (error, response, body) => {
      if (!error) {
        await VoteRun.updateOne(
          { _id: req.body.id },
          { $set: { smsSent: true } }
        );
        res.status(200).send({ message: "SMS sent successfully" });
      } else {
        console.log(error);
        res.status(400).send({ message: "An error occured while sending SMS" });
      }
    }
  );
});

router.post("/voteUserCheck", async (req, res) => {
  const vote = await VoteTopic.findOne({ _id: req.body.votingid });
  if (!vote) return res.status(404).send({ message: "Vote Not Found" });

  const user = await VoteRun.findOne({ username: req.body.username });
  if (!user) return res.status(404).send({ message: "User not found" });

  const validpass = await bcrypt.compare(req.body.password, user.password);
  if (!validpass) return res.status(401).send({ message: "Invalid Password" });

  const tokenTime = 60 * 60;
  //create and assign the token
  const token = jwt.sign({ _id: user.phone }, process.env.TOKEN_SECRET, {
    expiresIn: tokenTime,
  });

  let userData = {
    votetoken: token,
  };

  res.status(200).send(userData);
});

router.post("/voteNow", verifyVote, async (req, res) => {
  try {
    const voteConditions = await VoteRun.findOne({
      voteTopicId: req.body[0].voteTopicId,
      phone: req.user._id,
    });
    if (voteConditions.smsSent) {
      if (voteConditions.votedFor != undefined)
        return res.status(409).send({ message: "Voter Has Already Voted" });
    }

    const vote = await VoteTopic.findOne({
      _id: req.body[0].id,
      voteStatus: true,
    });
    if (!vote) return res.status(404).send({ message: "Vote Not Found" });

    const voteSingle = await VoteRun.findOne({
      voteTopicId: req.body[0].voteTopicId,
      phone: req.user._id,
    });
    if (!voteSingle)
      return res.status(404).send({ message: "Voter Not Found" });

    const voteCheck = await VoteRun.findOne({
      voteTopicId: req.body[0].voteTopicId,
      phone: req.user._id,
    });
    if (voteCheck.votedFor)
      return res.status(412).send({ message: "You have already voted" });

    if (vote.numberofvoters > 0) {
      if (vote.votesFor[0].valueEng === req.body.valueEng) {
        vote.votesFor[0].votecount += 1;
        vote.numberofvoters -= 1;
      }
    } else {
      res.status(429).send({ message: "Number of vote has been completed" });
    }

    let votedNow = [];
    const votebox = await VoteTopic.findOne({ _id: vote._id });

    req.body.forEach((ele) => {
      votebox.votesFor[ele.ind].votes[ele.subindex].votecount += ele.votecount;
      votedNow.push(votebox.votesFor[ele.ind]);
    });

    const updateVote = await VoteRun.updateOne(
      { voteTopicId: req.body[0].voteTopicId, phone: req.user._id },
      { $set: { votedFor: votedNow } }
    );
    if (!updateVote)
      return res
        .status(500)
        .send({ message: "There was some error please try again" });

    const updateVoteMain = await VoteTopic.updateMany(
      { voteTopicId: req.body[0].voteTopicId },
      { $set: { votesFor: votedNow } }
    );
    if (!updateVoteMain)
      return res
        .status(500)
        .send({ message: "There was some error please try again" });

    await vote.save();

    await voteSingle.save();
    res.status(200).send("You have successfully voted");
    // request.post(
    //     'https://sms.aakashsms.com/sms/v3/send',
    //     {
    //         json: {
    //             token: '29ed0ec58213e4d87765d7f47f347c69cda83701b84229d3dd8a0717ac0701b5',
    //             from: 'InfoSMS',
    //             to: `${req.user._id}`,
    //             text: `Thanks for voting`
    //         }
    //     },
    //     function (error, response, body) {
    //         if (!error && response.status == 200) {
    //             console.log(body);
    //         } else {
    //             res.status(400).send(error);
    //         }
    //     }
    // );
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

//votes
router.get("/", async (req, res) => {
  const allReport = await VoteTopic.find({});
  let data = [];
  let i = 1;

  allReport.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ votes: Object.assign(data) });
});

//voters
router.get("/voters", async (req, res) => {
  const allReport = await Voters.find({});
  let data = [];
  let i = 1;

  allReport.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ voters: Object.assign(data) });
});

//votersprocessed
router.get("/votersprocessed", verify, async (req, res) => {
  const allReport = await VoteRun.find();
  let data = [];
  let i = 1;

  allReport.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ voters: Object.assign(data) });
});

//voters
router.get("/voters/unique", async (req, res) => {
  const allReport = await Voters.distinct("votingGroup");
  let data = [];
  let i = 1;

  allReport.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ voters: Object.assign(data) });
});

//voters
router.delete("/voters/:id", async (req, res) => {
  const voters = await Voters.deleteOne({ _id: req.params.id });
  if (!voters) {
    return res.status(404).send({ message: "Voter not found !" });
  }

  res.status(200).send({ message: "Voters Deleted Successfully" });
});

//poll single
router.get("/frontend", async (req, res) => {
  const allVoteTopic = await VoteTopic.find(
    { voteStatus: true },
    { smsSentTo: 0 }
  );
  res.status(200).send({ votes: allVoteTopic });
});

router.put("/votestatus/:id", async (req, res) => {
  const video = await VoteTopic.findOne({ _id: req.params.id });
  if (!video) res.status(404).send({ message: "Vote Didn't not found" });
  await VoteTopic.updateMany(
    { voteStatus: true },
    { $set: { voteStatus: false } }
  );
  const videos = await VoteTopic.updateOne(
    { _id: req.params.id },
    { $set: { voteStatus: req.body.voteStatus } }
  );

  video.save();
  res.status(200).send({ message: "The Voting updated successfully" });
});

router.get("/votefetch/:id", verify, async (req, res) => {
  const votesingle = await VoteTopic.findOne({ _id: req.params.id });
  if (!votesingle) res.status(404).send({ message: "Vote Didn't not found" });

  res.status(200).send(votesingle);
});

module.exports = router;
