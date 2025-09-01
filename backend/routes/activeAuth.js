const router = require("express").Router();
const bcrypt = require("bcryptjs");
const verify = require("../extra/verifyToken");
const ActiveUser = require("../model/ActiveUser");
const jwt = require("jsonwebtoken");
const { activeMemberVaidation } = require("../validation/activeMember");
const { loginValidation } = require("../validation/userValidation");
const Subdomain = require("../model/Subdomain");

router.post("/create", verify, async (req, res) => {
  //validations applying
  const { error } = activeMemberVaidation(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  //checking if the user is already in the database
  const emailExit = await ActiveUser.findOne({
    email: req.body.email,
    accountType: req.body.accountType,
  });
  if (emailExit) {
    return res.status(409).send({ message: "Email Already Exits" });
  }

  //checking if the user is already in the database
  const phoneExit = await ActiveUser.findOne({
    phone: req.body.phone,
    accountType: req.body.accountType,
  });
  if (phoneExit) {
    return res.status(409).send({ message: "Phone Number Already Exits" });
  }

  //Has passwords
  const salt = await bcrypt.genSalt(10);
  const pass = req.body.password;
  const hashedPassword = await bcrypt.hash(pass, salt);

  //Create new user
  const activeuser = new ActiveUser({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    userHandle: req.body.first_name + Math.floor(1000 + Math.random() * 9000),
    email: req.body.email,
    phone: req.body.phone,
    subDomain: req.body.subDomain,
    password: hashedPassword,
    passwordShow: req.body.password,
    accountType: req.body.accountType,
    status: true,
    province: req.body.province,
    district: req.body.district,
    houseofrepresentative: req.body.houseofrepresentative,
    pradeshassemblyconstituency: req.body.pradeshassemblyconstituency,
    municipality: req.body.municipality,
    ward: req.body.ward,
    tole: req.body.tole,
    committeeMemberType: req.body.committeeMemberType,
    createdAt: Date.now(),
    updateAt: Date.now(),
  });

  try {
    const saveActiveUser = await activeuser.save();
    if (saveActiveUser) {
      res
        .status(201)
        .send({ message: "You Have Successfully register the active user" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", verify, async (req, res) => {
  //validations applying
  const { error } = loginValidation(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  //get sudomain
  const subdomain = await Subdomain.findOne({ _id: req.user._id });

  //checking if the user email exit
  const user = await ActiveUser.findOne({ phone: req.body.input });
  if (!user) return res.status(404).send({ message: "Active User Not Found" });

  //checking if the user email exit
  const userStatus = await ActiveUser.findOne({
    phone: req.body.input,
    status: true,
  });
  if (!userStatus)
    return res.status(400).send({
      message: "User access has been Deactivated please contact admin",
    });

  if (subdomain.userHandle !== user.subDomain) {
    return res
      .status(404)
      .send({ message: "Active login is not for this subdomain " });
  }

  //password is correct
  const validpass = bcrypt.compare(req.body.password, user.password);
  if (!validpass) return res.status(401).send({ message: "Invalid Password" });

  //set time for token for 30days
  const tokenTime = 60 * 60 * 24 * 1;
  //create and assign the token
  const token = jwt.sign(
    {
      _id: user._id,
      userHandle: user.subDomain,
      username: user.first_name + user.last_name + user.phone,
      subDomain: user.subDomain,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: tokenTime,
    }
  );

  let userData = {
    token: token,
    user: {
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      subDomain: user.subDomain,
      accountType: user.accountType,
      id: user._id,
    },
  };
  res.status(200).send(userData);
});

router.post("/logincard", async (req, res) => {
  //validations applying
  const { error } = loginValidation(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  //get sudomain

  //checking if the user email exit
  let user = await ActiveUser.findOne({
    phone: req.body.input,
    accountType: "printcard",
    status: true,
  });
  if (!user)
    user = await ActiveUser.findOne({
      email: req.body.input,
      accountType: "printcard",
      status: true,
    });
  if (!user) return res.status(404).send({ message: "Active User Not Found" });

  //password is correct
  const validpass = bcrypt.compare(req.body.password, user.password);
  if (!validpass) return res.status(401).send({ message: "Invalid Password" });

  const sub = await Subdomain.findOne(
    { userHandle: user.subDomain },
    { userHandle: 1, nepname: 1, _id: 1, province: 1 }
  );

  //set time for token for 30days
  const tokenTime = 60 * 60 * 24 * 1;
  //create and assign the token
  const token = jwt.sign(
    {
      _id: user._id,
      userHandle: user.subDomain,
      username: user.first_name + user.last_name + user.phone,
      province: sub.province,
      subDomain: user.subDomain,
      subDomainId: sub._id,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: tokenTime,
    }
  );

  let userData = {
    token: token,
    user: {
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      subDomain: user.subDomain,
      accountType: user.accountType,
      id: user._id,
      nepname: sub.nepname,
      subDomainId: sub._id,
    },
  };
  res.status(200).send(userData);
});

router.post("/logincommittee", async (req, res) => {
  //validations applying
  const { error } = loginValidation(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  //get sudomain

  //checking if the user email exit
  const user = await ActiveUser.findOne({
    phone: req.body.input,
    accountType: "committeeMember",
    status: true,
  });
  
  if (!user) return res.status(404).send({ message: "Active User Not Found" });

  //password is correct
  const validpass = bcrypt.compare(req.body.password, user.password);
  if (!validpass) return res.status(401).send({ message: "Invalid Password" });

  //set time for token for 30days
  const tokenTime = 60 * 60 * 24 * 1;
  //create and assign the token
  const token = jwt.sign(
    {
      _id: user._id,
      userHandle: user.userHandle,
      
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: tokenTime,
    }
  );

  let userData = {
    token: token,
    user: {
      first_name: user.first_name,
      last_name: user.last_name,
      committeeMemberType: user.committeeMemberType,
      province: user.province,
      district: user.district,
      houseofrepresentative: user.houseofrepresentative,
      pradeshassemblyconstituency: user.pradeshassemblyconstituency,
      municipality: user.municipality,
      ward: user.ward,
      tole: user.tole
    },
  };
  res.status(200).send(userData);
});

//subdomain
router.get("/userlists/:accountType", async (req, res) => {
  const allUser = await ActiveUser.find({
    accountType: req.params.accountType,
  });
  let data = [];
  let i = 1;

  allUser.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ activeusers: Object.assign(data) });
});

//subdomain single
router.get("/profile", verify, async (req, res) => {
  const allUser = await ActiveUser.find({ _id: req.user._id });
  res.status(200).send({ activeusers: allUser });
});

router.get("/singleUser/:id", verify, async (req, res) => {
  try {
    const acUser = await ActiveUser.findById(req.params.id);

    res.status(200).send({
      message: "Switched Subdomain Access Successfully",
      user: acUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});

router.put("/updateActiveUser", verify, async (req, res) => {
  try {
    const acUser = await ActiveUser.findById(req.body.id);
    await ActiveUser.updateOne(
      { _id: req.body.id },
      { subDomain: req.body.subDomain }
    );
    await acUser.save();
    res.status(200).send({ message: "Switched Subdomain Access Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});

router.post("/accountstatus", verify, async (req, res) => {
  const userphone = await ActiveUser.findOne({
    phone: req.body.input,
  });

  //Create new user
  const activeuser = {
    status: req.body.status,
    updateAt: Date.now(),
  };

  // console.log(subdomain)
  const updateUser = await ActiveUser.updateOne(
    { phone: req.body.input },
    { $set: activeuser }
  );

  if (!updateUser)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  try {
    const saveActiveUser = await userphone.save();

    if (saveActiveUser) {
      if (req.body.status) {
        res
          .status(200)
          .send({ message: "You Have Successfully Activated The Account" });
      } else {
        res
          .status(200)
          .send({ message: "You Have Successfully Deactivated The Account" });
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/forgetpassword", verify, async (req, res) => {
  const userphone = await ActiveUser.findOne({
    phone: req.body.input,
  });

  //password is correct
  const validpass = await bcrypt.compare(req.body.password, userphone.password);
  if (!validpass) return res.status(401).send({ message: "Invalid Password" });

  //Has passwords
  const salt = await bcrypt.genSalt(10);
  const pass = req.body.confirmpassword;
  const hashedPassword = await bcrypt.hash(pass, salt);

  //Create new user
  const activeuser = {
    password: hashedPassword,
    passwordShow: req.body.confirmpassword,
    updateAt: Date.now(),
  };

  // console.log(subdomain)
  const updateUser = await ActiveUser.updateOne(
    { phone: req.body.input },
    { $set: activeuser }
  );

  if (!updateUser)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  try {
    const saveActiveUser = await userphone.save();

    if (saveActiveUser) {
      res
        .status(200)
        .send({ message: "You Have Successfully update the acitve user" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
