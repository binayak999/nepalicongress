const globalpagination = require("../extra/globalpagination");
const imageUploader = require("../extra/imageUpload");
const verifyToken = require("../extra/verifyToken");
const GeneralConvention = require("../model/GeneralConvention");
const GeneralConverntionUser = require("../model/GeneralConverntionUser");
const bcrypt = require("bcryptjs");
const { loginValidationGeneral } = require("../validation/userValidation");
const jwt = require("jsonwebtoken");
const GeneralConventionElection = require("../model/GeneralConventionElection");

const router = require("express").Router();
router.post("/create", verifyToken, async (req, res) => {
  try {
    let createData = {
      province: req.body.province,
      district: req.body.district,
      createdAt: Date.now(),
      userHandle: req.user.userHandle,
      updatedAt: Date.now(),
      title: req.body.title,
    };
    if (req.body._id == undefined) {
      let filter = {};
      filter.province = req.body.province;
      filter.district = req.body.district;
      filter.ward = req.body.ward;
      filter.tole = req.body.tole;
      filter.title = req.body.title;

      const generalConvention = await GeneralConvention.find(filter);
      if (generalConvention.length > 0) {
        return res.status(409).send({ message: "You have already added " });
      }

      if (req.files != undefined) {
        let imageResponse = await imageUploader(
          req.files.file,
          "generalconventions"
        );
        if (imageResponse != undefined) {
          createData.file = imageResponse;
        }
      } else {
        return res.status(409).send({ message: "Please add one file" });
      }

      const genrealConvention = new GeneralConvention(createData);
      await genrealConvention.save();

      let filterD = {};

      if (req.body.title != undefined) {
        filterD.title = req.body.title;
      }

      if (req.body.province != undefined) {
        filterD.province = req.body.province;
      }

      if (req.body.district != undefined) {
        filterD.district = req.body.district;
      }

      if (req.body.municipality != undefined) {
        filterD.municipality = req.body.municipality;
      }

      if (req.body.ward != undefined) {
        filterD.ward = req.body.ward;
      }
      if (req.body.tole != undefined) {
        filterD.tole = req.body.tole;
      }

      const generalConventions = await GeneralConvention.find(filterD);
      let data = [];
      for await (let ele of generalConventions) {
        data.push({
          province: ele.province,
          district: ele.district,
          municipality: ele.municipality,
          ward: ele.ward,
          tole: ele.tole,
          file: "https://api.nepalicongress.org" + ele.file[0].fileLocation,
        });
      }
      return res.status(201).send({
        message: "General Convention has been created!",
        results: data,
      });
    } else {
      const singleGeneralConvention = await GeneralConvention.findById({
        _id: req.body._id,
      });

      if (singleGeneralConvention.file != undefined) {
        if (
          fs.existsSync(
            path.normalize(
              __dirname + "/.." + singleGeneralConvention.image.fileUrl
            )
          )
        ) {
          fs.unlinkSync(
            path.normalize(
              __dirname + "/.." + singleGeneralConvention.image.fileUrl
            )
          );
        }
      }

      let updateData = {};
      if (req.body.province != undefined) {
        updateData.province = req.body.province;
      }
      if (req.body.district != undefined) {
        updateData.district = req.body.district;
      }
      if (req.body.municipality != undefined) {
        updateData.municipality = req.body.municipality;
      }
      if (req.body.ward != undefined) {
        updateData.ward = req.body.ward;
      }
      updateData.userHandle = req.user.userHandle;
      updateData.updatedAt = Date.now();
      await singleGeneralConvention.save();

      return res.status(200).send({
        message: "General Convention has been updated!",
        results: singleGeneralConvention,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

router.post("/filterGeneralConvention", async (req, res) => {
  try {
    let filter = {};

    if (req.body.title != undefined) {
      filter.title = req.body.title;
    }
    if (req.body.province != undefined) {
      filter.province = req.body.province;
    }

    if (req.body.district != undefined) {
      filter.district = req.body.district;
    }

    if (req.body.municipality != undefined) {
      filter.municipality = req.body.municipality;
    }

    if (req.body.ward != undefined) {
      filter.ward = req.body.ward;
    }
    if (req.body.tole != undefined) {
      filter.tole = req.body.tole;
    }

    const generalConventions = await GeneralConvention.find(filter);

    const totalGeneralConvention = await GeneralConvention.countDocuments();

    var pg = globalpagination(totalGeneralConvention, req.body.skip, 100);
    let data = [];
    for await (let ele of generalConventions) {
      data.push({
        title: ele.title,
        province: ele.province,
        district: ele.district,
        municipality: ele.municipality,
        ward: ele.ward,
        tole: ele.tole,
        file: "https://api.nepalicongress.org" + ele.file[0].fileLocation,
      });
    }

    return res.status(200).send({
      message: "General Conventions",
      results: data,
      pagination: pg,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

router.post("/createUser", verifyToken, async (req, res) => {
  try {
    //checking if the user is already in the database
    if (req.body._id == undefined) {
      const emailExit = await GeneralConverntionUser.findOne({
        email: req.body.email,
      });
      if (emailExit) {
        return res.status(409).send({ message: "Email Already Exits" });
      }

      if (req.body.userFor == "Election Officer") {
        if (req.body.province == undefined || req.body.district == undefined) {
          return res.status(409).send({
            message:
              "If you are going to add election officer please select provice and district",
          });
        }
      }

      //checking if the user is already in the database
      const phoneExit = await GeneralConverntionUser.findOne({
        phone: req.body.phone,
      });
      if (phoneExit) {
        return res.status(409).send({ message: "Phone Number Already Exits" });
      }

      //Has passwords
      const salt = await bcrypt.genSalt(10);
      const pass = req.body.password;
      const hashedPassword = await bcrypt.hash(pass, salt);

      //Create new user
      const user = new GeneralConverntionUser({
        name: req.body.name,
        userFor: req.body.userFor,
        userHandle:
          "GC" +
          req.body.name.slice(0, 3) +
          Math.floor(1000 + Math.random() * 9000),
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
        passwordShow: req.body.password,
        province: req.body.province,
        district: req.body.district,
        municipality: req.body.municipality,
        ward: req.body.ward,
        houseofrepresentative: req.body.houseofrepresentative,
        pradeshassemblyconstituency: req.body.pradeshassemblyconstituency,
        ward: req.body.ward,
        status: true,
        createdAt: Date.now(),
        updateAt: Date.now(),
      });

      await user.save();
      return res
        .status(201)
        .send({ message: "You Have Successfully register the active user" });
    } else {
      let user = await GeneralConverntionUser.findOne({ _id: req.body._id });
      let filter = {};
      if (req.body.password != undefined) {
        const salt = await bcrypt.genSalt(10);
        const pass = req.body.password;
        const hashedPassword = await bcrypt.hash(pass, salt);
        filter.password = hashedPassword;
      }
      if (req.body.name != undefined) {
        filter.name = req.body.name;
      }
      if (req.body.status != undefined) {
        filter.status = req.body.status;
      }

      await GeneralConverntionUser.updateOne(
        { _id: user._id },
        { $set: filter }
      );

      await user.save();

      return res.status(200).send({ message: "User profile has been updated" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/listOfGeneralConvetionUser", verifyToken, async (req, res) => {
  try {
    //Create new user
    let filter = {};
    if (req.body.userFor != undefined) {
      filter.userFor = req.body.userFor;
    }
    if (req.body.province != undefined) {
      filter.province = req.body.province;
    }
    if (req.body.district != undefined) {
      filter.district = req.body.district;
    }

    const user = await GeneralConverntionUser.find(filter).skip(0).limit(1000);
    const userTotal = await GeneralConverntionUser.countDocuments();

    const pg = globalpagination(userTotal, req.body.skip, 1000);
    return res.status(200).send({
      message: "List of general convention user",
      results: user,
      pagination: pg,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/singleUser/:id", verifyToken, async (req, res) => {
  try {
    const singleUser = await GeneralConverntionUser.findOne({
      _id: req.params.id,
    });
    return res.status(200).send({
      message: "Single General User",
      results: singleUser,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  //validations applying
  const { error } = loginValidationGeneral(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  //checking if the user email exit
  const user = await GeneralConverntionUser.findOne({ phone: req.body.input });
  if (!user) return res.status(404).send({ message: "General User Not Found" });

  //checking if the user email exit
  const userStatus = await GeneralConverntionUser.findOne({
    phone: req.body.input,
    status: true,
  });
  if (userStatus == undefined)
    return res.status(400).send({
      message: "User access has been Deactivated please contact admin",
    });

  //password is correct
  const validpass = await bcrypt.compare(req.body.password, user.password);
  if (!validpass) return res.status(401).send({ message: "Invalid Password" });

  //set time for token for 30days
  const tokenTime = (60 * 60 * 24 * 1) / 2;
  //create and assign the token
  const token = jwt.sign(
    {
      _id: user._id,
      userHandle: user.userHandle,
      userFor: user.userFor,
      name: user.name,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: tokenTime,
    }
  );

  let userData = {
    token: token,
    user: {
      first_name: user.name,
      province: user.province,
      district: user.district,
      userFor: user.userFor,
      id: user._id,
    },
  };
  res.status(200).send(userData);
});

router.post("/createVote", verifyToken, async (req, res) => {
  try {
    if (req.body._id == undefined) {
      const vote = new GeneralConventionElection({
        title: req.body.title,
        post: req.body.post,
        province: req.body.province,
        district: req.body.district,
        municipality: req.body.municipality,
        houseofrepresentative: req.body.houseofrepresentative,
        pradeshassemblyconstituency: req.body.pradeshassemblyconstituency,
        name: req.body.name,
        phone: req.body.phone,
        ward: req.body.ward,
        electoralSystem: req.body.electoral_system,
        electoralProcess: req.body.electoral_process,
        inclusivegroup: req.body.inclusivegroup,
        remark: req.body.remark,
        gender: req.body.gender,
        voteCount: req.body.voteCount,
        userHandle: req.user.userHandle,
        createdAt: Date.now(),
        updateAt: Date.now(),
      });
      await vote.save();
      return res.status(201).send({ message: "Vote has been created" });
    } else {
      const singleVote = await GeneralConventionElection.findOne({
        _id: req.body._id,
      });
      await GeneralConventionElection.updateOne(
        { _id: req.body._id },
        {
          title: req.body.title,
          post: req.body.post,
          province: req.body.province,
          district: req.body.district,
          houseofrepresentative: req.body.houseofrepresentative,
          municipality: req.body.municipality,
          pradeshassemblyconstituency: req.body.pradeshassemblyconstituency,
          name: req.body.name,
          phone: req.body.phone,
          ward: req.body.ward,
          electoralSystem: req.body.electoral_system,
          electoralProcess: req.body.electoral_process,
          inclusivegroup: req.body.inclusivegroup,
          remark: req.body.remark,
          gender: req.body.gender,
          voteCount: req.body.voteCount,
          updateUseruserHandle: req.user.userHandle,
          updateAt: Date.now(),
        }
      );
      await singleVote.save();
      return res.status(200).send({ message: "Vote has been created" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

router.delete("/deleteVote/:id", verifyToken, async (req, res) => {
  try {
    if (req.body._id == undefined) {
      const vote = await GeneralConventionElection.findOne({
        _id: req.params.id,
      });
      await GeneralConventionElection.updateOne(
        { _id: req.params.id },
        {
          deletedUserHandle: req.user.userHandle,
          deletedAt: Date.now(),
          status: false,
        }
      );
      await vote.save();
      return res.status(200).send({ message: "Vote has been deleted" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});
router.get("/singleVote/:id", verifyToken, async (req, res) => {
  try {
    if (req.body._id == undefined) {
      const vote = await GeneralConventionElection.findOne({
        _id: req.params.id,
      });

      return res
        .status(200)
        .send({ message: "Single vote entry", results: vote });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

router.post("/votelist", verifyToken, async (req, res) => {
  try {
    let data = {};

    if (req.body.title != undefined) {
      data.title = req.body.title;
    }

    if (req.body.post != undefined) {
      data.post = req.body.post;
    }
    if (req.body.province != undefined) {
      data.province = req.body.province;
    } else {
      return res.status(412).send({ message: "Province is required" });
    }
    if (req.body.district != undefined) {
      data.district = req.body.district;
    } else {
      return res.status(412).send({ message: "District is required" });
    }
    if (req.body.houseofrepresentative != undefined) {
      data.houseofrepresentative = req.body.houseofrepresentative;
    }
    if (req.body.pradeshassemblyconstituency != undefined) {
      data.pradeshassemblyconstituency = req.body.pradeshassemblyconstituency;
    }
    if (req.body.municipality != undefined) {
      data.municipality = req.body.municipality;
    }
    if (req.body.ward != undefined) {
      data.ward = req.body.ward;
    }
    if (req.body.electoral_system != undefined) {
      data.electoral_system = req.body.electoral_system;
    }
    if (req.body.inclusivegroup != undefined) {
      data.inclusivegroup = req.body.inclusivegroup;
    }
    if (req.body.remark != undefined) {
      data.remark = req.body.remark;
    }
    if (req.body.electoral_process != undefined) {
      data.electoral_process = req.body.electoral_process;
    }
    if (req.body.gender != undefined) {
      data.gender = req.body.gender;
    }
    if (req.body.voteCount != undefined) {
      data.voteCount = req.body.voteCount;
    }

    data.status = { $nin: [false] };

    const vote = await GeneralConventionElection.find(data)
      .sort({ voteCount: -1 })
      .skip(req.body.skip * 500)
      .limit(500);
    const voteCount = await GeneralConventionElection.countDocuments(data);

    return res.status(200).send({
      message: "Vote has been created",
      results: vote,
      pagination: voteCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

router.post(
  "/generalConvenstionCommitteeMember",
  verifyToken,
  async (req, res) => {
    try {
      let data = {};

      if (req.body.title != undefined) {
        data.title = req.body.title;
      }

      if (req.body.post != undefined) {
        data.post = req.body.post;
      }
      if (req.body.province != undefined) {
        data.province = req.body.province;
      }
      if (req.body.district != undefined) {
        data.district = req.body.district;
      }
      if (req.body.houseofrepresentative != undefined) {
        data.houseofrepresentative = req.body.houseofrepresentative;
      }
      if (req.body.pradeshassemblyconstituency != undefined) {
        data.pradeshassemblyconstituency = req.body.pradeshassemblyconstituency;
      }
      if (req.body.municipality != undefined) {
        data.municipality = req.body.municipality;
      }
      if (req.body.ward != undefined) {
        data.ward = req.body.ward;
      }
      if (req.body.tole != undefined) {
        data.tole = req.body.tole;
      }

      data.status = { $nin: [false] };

      const vote = await GeneralConventionElection.aggregate([
        {
          $match: data,
        },
        {
          $addFields: {
            orderRank: {
              $switch: {
                branches: [
                  { case: { $eq: ["$post", "सभापति"] }, then: 1 },
                  { case: { $eq: ["$post", "उपसभापति"] }, then: 2 },
                  { case: { $eq: ["$post", "सचिव"] }, then: 3 },
                  { case: { $eq: ["$post", "सहसचिव"] }, then: 4 },
                  {
                    case: { $eq: ["$post", "केन्द्रिय महाधिवेशन प्रतिनिधि"] },
                    then: 6,
                  },
                  {
                    case: { $eq: ["$post", "प्रदेश महाधिवेशन प्रतिनिधि"] },
                    then: 5,
                  },

                  { case: { $eq: ["$post", "सदस्य"] }, then: 7 },
                ],
                default: 7,
              },
            },
          },
        },
        {
          $sort: { orderRank: 1 },
        },
      ]);
      const voteCount = await GeneralConventionElection.countDocuments(data);

      return res.status(200).send({
        message: "Vote has been created",
        results: vote,
        pagination: voteCount,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Something went wrong!" });
    }
  }
);

module.exports = router;
