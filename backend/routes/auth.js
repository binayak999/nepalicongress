const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const {
  registerValidation,
  loginValidation,
  verifyValidation,
  resendOTPValidation,
  forgetPasswordValidation,
} = require("../validation/userValidation");
const jwt = require("jsonwebtoken");
const mail = require("../extra/mail");
const verify = require("../extra/verifyToken");
const Subdomain = require("../model/Subdomain");
const request = require("request");
const fs = require("fs");
const path = require("path");

router.post("/register", async (req, res) => {
  try {
    // validations applying
    const { error } = registerValidation(req.body);
    if (error)
      return res.status(422).send({ message: error.details[0].message });

    // checking if the user is already in the database
    const emailExit = await User.findOne({ email: req.body.email });
    if (emailExit) {
      return res.status(409).send({ message: "Email Already Exits" });
    }

    // checking if the user is already in the database
    const phoneExit = await User.findOne({ phone: req.body.phone });
    if (phoneExit) {
      return res.status(409).send({ message: "Phone Number Already Exits" });
    }

    // Has passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      req.body.password != undefined ? req.body.password : "6nfsz5*E7",
      salt
    );

    // remove / from dob
    // const dob = req.body.dob.replace(/-/g, '');
    let user;
    // console.log(dob)
    if (req.body.memberId == undefined && req.body.memberPost == undefined) {
      // Create new user
      user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        userHandle: `@_${req.body.first_name}${Math.floor(
          1000 + Math.random() * 900
        )}`,
        email: req.body.email,
        phone: req.body.phone,
        userRole: "User",
        dob: req.body.dob,
        gender: req.body.gender,
        about: req.body.about,
        municipality: req.body.municipality,
        district: req.body.district,
        ward: req.body.ward,
        city: req.body.city,
        province: req.body.province,
        nearestlandmark: req.body.nearestlandmark,
        address: req.body.address,
        otp: Math.floor(1000 + Math.random() * 9000),
        verified: false,
        verifiedAsMember: 0,
        password: hashedPassword,
        profile_image:
          "https://upliftsolutions.info/congressimage/usericon.png",
      });
    } else {
      // Create new user
      user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        userHandle: `@_${req.body.first_name}${Math.floor(
          1000 + Math.random() * 900
        )}`,
        email: req.body.email,
        phone: req.body.phone,
        userRole: "Member",
        dob: req.body.dob,
        gender: req.body.gender,
        about: req.body.about,
        municipality: req.body.municipality,
        district: req.body.district,
        ward: req.body.ward,
        city: req.body.city,
        province: req.body.province,
        nearestlandmark: req.body.nearestlandmark,
        address: req.body.address,
        memberId: req.body.memberId,
        memberPost: req.body.memberPost,
        otp: Math.floor(1000 + Math.random() * 9000),
        verified: false,
        verifiedAsMember: 0,
        password: hashedPassword,
        profile_image:
          "https://upliftsolutions.info/congressimage/usericon.png",
        status: true,
      });
    }

    let mailOptions = {
      from: `${process.env.MAIL_FROM} <${process.env.MAIL_ADDRESS}>`,
      to: user.email,
      subject: "Registration OTP",
      text: `Your otp code is ${user.otp}`,
      html: `Your otp code is <strong>${user.otp}</strong>`,
    };

    await user.save();

    mail(mailOptions);
    // request.post(
    //   "https://sms.aakashsms.com/sms/v3/send",
    //   {
    //     json: {
    //       auth_token: process.env.SMS_AUTH_TOKEN,
    //       to: `${user.phone}`,
    //       text: `Login OTP Nepali Congress : ${user.otp}`,
    //     },
    //   },
    //   function (error, response, body) {
    //     if (!error && response.status == 200) {
    //       // console.log(body);
    //     }
    //   }
    // );

    return res
      .status(201)
      .send({ message: "You Have Successfully member the user" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// verify route
router.post("/verify", async (req, res) => {
  try {
    // validations applying
    const { error } = verifyValidation(req.body);
    if (error)
      return res.status(422).send({ message: error.details[0].message });

    // checking if the user email exit
    const user = await User.findOne({ email: req.body.input });
    const userphone = await User.findOne({ phone: req.body.input });

    if (!user && !userphone)
      return res.status(404).send({ message: "Email Or Password Not Found" });

    if (user) {
      // checking the verified status of the user
      if (user.verified)
        return res.status(412).send({ message: "User already Activated" });

      // otp is correct
      const validotp = await User.findOne({
        otp: req.body.otp,
        email: req.body.input,
      });
      if (!validotp) return res.status(401).send({ message: "Invalid OTP" });
    } else {
      // checking the verified status of the user
      if (userphone.verified)
        return res.status(412).send({ message: "User already Activated" });

      // otp is correct
      const validotp = await User.findOne({
        otp: req.body.otp,
        phone: req.body.input,
      });
      if (!validotp) return res.status(401).send({ message: "Invalid OTP" });
    }

    let newotp = Math.floor(1000 + Math.random() * 9000);

    if (user) {
      const updateUser = await User.updateOne(
        {
          _id: user._id,
        },
        {
          $set: {
            verified: true,
            otp: newotp,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      await user.save();
      // create and assign the token
      res.status(200).send({
        message: "User has been activated successfully! Please Login",
      });
    } else {
      const updateUser = await User.updateOne(
        {
          _id: userphone._id,
        },
        {
          $set: {
            verified: true,
            otp: newotp,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      await userphone.save();
      // create and assign the token
      return res.status(200).send({
        message: "User has been activated successfully! Please Login",
      });
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

// resend OTP
router.post("/resendotp", async (req, res) => {
  try {
    // validations applying
    const { error } = resendOTPValidation(req.body);
    if (error)
      return res.status(422).send({ message: error.details[0].message });

    // checking if the user email exit
    const user = await User.findOne({ email: req.body.input });
    const userphone = await User.findOne({ phone: req.body.input });
    if (!user && !userphone)
      return res.status(404).send({ message: "Email Or Password Not Found" });

    if (user) {
      // checking the verified status of the user
      if (user.verified)
        return res.status(412).send({ message: "User  Activated" });
    } else {
      // checking the verified status of the user
      if (userphone.verified)
        return res.status(412).send({ message: "User  Activated" });
    }

    let newotp = Math.floor(1000 + Math.random() * 9000);

    let mailOptions;
    if (user) {
      // request.post(
      //   "https://sms.aakashsms.com/sms/v3/send",
      //   {
      //     json: {
      //       auth_token:
      //         "29ed0ec58213e4d87765d7f47f347c69cda83701b84229d3dd8a0717ac0701b5",

      //       to: `${user.phone}`,
      //       text: `Your New OTP code is ${newotp}`,
      //     },
      //   },
      //   function (error, response, body) {
      //     if (!error && response.status == 200) {
      //       // console.log(body);
      //     }
      //   }
      // );
      mailOptions = {
        from: `${process.env.MAIL_FROM} <${process.env.MAIL_ADDRESS}>`,
        to: user.email,
        subject: "New OTP Code",
        text: `Your New OTP code is ${newotp}`,
        html: `Your New OTP code is <strong>${newotp}</strong>`,
      };
    } else {
      // request.post(
      //   "https://sms.aakashsms.com/sms/v3/send",
      //   {
      //     json: {
      //       auth_token:
      //         "29ed0ec58213e4d87765d7f47f347c69cda83701b84229d3dd8a0717ac0701b5",

      //       to: `${userphone.phone}`,
      //       text: `Your New OTP code is ${newotp}`,
      //     },
      //   },
      //   function (error, response, body) {
      //     if (!error && response.status == 200) {
      //       // console.log(body);
      //     }
      //   }
      // );
      mailOptions = {
        from: `${process.env.MAIL_FROM} <${process.env.MAIL_ADDRESS}>`,
        to: userphone.email,
        subject: "New OTP Code",
        text: `Your New OTP code is ${newotp}`,
        html: `Your New OTP code is <strong>${newotp}</strong>`,
      };
    }
    if (user) {
      const updateUser = await User.updateOne(
        {
          _id: user._id,
        },
        {
          $set: {
            otp: newotp,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      await user.save();
      mail(mailOptions);
    } else {
      const updateUser = await User.updateOne(
        {
          _id: userphone._id,
        },
        {
          $set: {
            otp: newotp,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      await userphone.save();
      mail(mailOptions);
    }

    res.status(201).send({ message: "New OTP Code Has Been Sent" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// forget OTP
router.post("/forgetPassword", async (req, res) => {
  // validations applying
  const { error } = resendOTPValidation(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  // checking if the user email exit
  const user = await User.findOne({ email: req.body.input });
  const userphone = await User.findOne({ phone: req.body.input });
  if (!user && !userphone)
    return res.status(404).send({ message: "Email Or Password Not Found" });

  if (user) {
    // checking the verified status of the user
    if (!user.verified)
      return res.status(412).send({ message: "User not verified" });
  } else {
    // checking the verified status of the user
    if (!userphone.verified)
      return res.status(412).send({ message: "User not verified" });
  }

  let newotp = Math.floor(1000 + Math.random() * 9000);

  let mailOptions;
  if (user) {
    try {
      // request.post(
      //   "https://sms.aakashsms.com/sms/v3/send",
      //   {
      //     json: {
      //       auth_token:
      //         "29ed0ec58213e4d87765d7f47f347c69cda83701b84229d3dd8a0717ac0701b5",

      //       to: `${user.phone}`,
      //       text: `Your New OTP code is ${newotp}`,
      //     },
      //   },
      //   function (error, response, body) {
      //     if (!error && response.status == 200) {
      //       // console.log(body);
      //     }
      //   }
      // );
    } catch (error) {
      console.log(error);
    }

    mailOptions = {
      from: `${process.env.MAIL_FROM} <${process.env.MAIL_ADDRESS}>`,
      to: user.email,
      subject: "OTP Code For Forget Password",
      text: `Your OTP code For Forget Password is ${newotp}`,
      html: `Your OTP code For Forget Password is <strong>${newotp}</strong>`,
    };
  } else {
    // try {
    //   request.post(
    //     "https://sms.aakashsms.com/sms/v3/send",
    //     {
    //       json: {
    //         auth_token:
    //           "29ed0ec58213e4d87765d7f47f347c69cda83701b84229d3dd8a0717ac0701b5",

    //         to: `${userphone.phone}`,
    //         text: `Your New OTP code is ${newotp}`,
    //       },
    //     },
    //     function (error, response, body) {
    //       if (!error && response.status == 200) {
    //         console.log(body);
    //       }
    //     }
    //   );
    // } catch (error) {
    //   console.log(error);
    // }

    mailOptions = {
      from: `${process.env.MAIL_FROM} <${process.env.MAIL_ADDRESS}>`,
      to: userphone.email,
      subject: "OTP Code For Forget Password",
      text: `Your OTP code For Forget Password is ${newotp}`,
      html: `Your OTP code For Forget Password is <strong>${newotp}</strong>`,
    };
  }
  try {
    if (user) {
      const updateUser = await User.updateOne(
        {
          _id: user._id,
        },
        {
          $set: {
            otp: newotp,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      await user.save();
      mail(mailOptions);
      res
        .status(200)
        .send({ message: "New OTP Code Has Been Sent For Forget Password" });
    } else {
      const updateUser = await User.updateOne(
        {
          _id: userphone._id,
        },
        {
          $set: {
            otp: newotp,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      await userphone.save();
      mail(mailOptions);
      res
        .status(200)
        .send({ message: "New OTP Code Has Been Sent For Forget Password" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// update Password
router.put("/updatePassword", async (req, res) => {
  // validations applying
  const { error } = forgetPasswordValidation(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  // checking if the user email exit
  const user = await User.findOne({ email: req.body.input });
  const userphone = await User.findOne({ phone: req.body.input });
  if (!user && !userphone)
    return res.status(404).send({ message: "Email Or Password Not Found" });

  if (user) {
    // checking the verified status of the user
    if (!user.verified)
      return res.status(412).send({ message: "User Not Activated" });

    // otp is correct
    const validotp = await User.findOne({
      otp: req.body.otp,
      email: req.body.input,
    });
    if (!validotp) return res.status(401).send({ message: "Invalid OTP" });

    // check old password
    const validpass = await bcrypt.compare(req.body.password, user.password);
    if (validpass)
      return res.status(412).send({ message: "Please choose new password" });
  } else {
    // checking the verified status of the user
    if (!userphone.verified)
      return res.status(412).send({ message: "User Not Activated" });

    // otp is correct
    const validotp = await User.findOne({
      otp: req.body.otp,
      phone: req.body.input,
    });
    if (!validotp) return res.status(401).send({ message: "Invalid OTP" });

    // check old password
    const validpass = await bcrypt.compare(
      req.body.password,
      userphone.password
    );
    if (validpass)
      return res.status(412).send({ message: "Please choose new password" });
  }

  // creating new hashpassword
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  let newotp = Math.floor(1000 + Math.random() * 9000);

  if (user) {
    const updateUser = await User.updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          password: hashedPassword,
          otp: newotp,
        },
      }
    );
    if (!updateUser)
      return res
        .status(500)
        .send({ message: "There was some error please try again" });

    await user.save();
  } else {
    const updateUser = await User.updateOne(
      {
        _id: userphone._id,
      },
      {
        $set: {
          password: hashedPassword,
          otp: newotp,
        },
      }
    );
    if (!updateUser)
      return res
        .status(500)
        .send({ message: "There was some error please try again" });

    await userphone.save();
  }
  // create and assign the token
  res
    .status(200)
    .send({ message: "Your Password Has been Updated Successfully" });
});

// setNewPassword
router.put("/setNewPassword", verify, async (req, res) => {
  // validations applying

  // checking if the user email exit
  const user = await User.findOne({ _id: req.user._id });

  if (!user) return res.status(404).send({ message: "User not found " });

  // password is correct
  const validpass = await bcrypt.compare(req.body.oldpassword, user.password);
  if (validpass)
    return res.status(412).send({ message: "Please choose new password" });

  // creating new hashpassword
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.newpassword, salt);

  let newotp = Math.floor(1000 + Math.random() * 9000);

  const updateUser = await User.updateOne(
    {
      _id: req.user._id,
    },
    {
      $set: {
        password: hashedPassword,
        otp: newotp,
      },
    }
  );
  if (!updateUser)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  await user.save();

  // create and assign the token
  res
    .status(200)
    .send({ message: "Your New Password Has been Updated Successfully" });
});

// login
router.post("/login", async (req, res) => {
  try {
    // validations applying
    const { error } = loginValidation(req.body);
    if (error)
      return res.status(422).send({ message: error.details[0].message });

    // checking if the user email exit
    const user = await User.findOne({ email: req.body.input });
    const userphone = await User.findOne({ phone: req.body.input });

    if (!user && !userphone)
      return res.status(404).send({ message: "Email Or Password Not Found" });

    if (user) {
      // password is correct
      const validpass = await bcrypt.compare(req.body.password, user.password);
      if (!validpass)
        return res.status(401).send({ message: "Invalid Password" });

      // checking the verified status of the user
      if (!user.verified)
        return res
          .status(443)
          .send({ message: "Please Verify Your Account First" });

      if (user.deleteStatus != undefined && user.deleteStatus == true)
        return res.status(403).send({
          message:
            "You account has been deleted please register your new account to continue.",
        });

      if (!user.status)
        return res
          .status(403)
          .send({ message: "You account has been deactivated" });

      // set time for token for 30days
      const tokenTime = 60 * 60 * 24 * 1;
      // create and assign the token
      const token = jwt.sign(
        {
          _id: user._id,
          userHandle: user.userHandle,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: tokenTime }
      );

      let userData = {
        token: token,
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          profile_image: user.profile_image,
          userHandle: user.userHandle,
          phone: user.phone,
          role: user.userRole,
        },
      };

      return res.status(200).send(userData);
    } else if (userphone) {
      // password is correct
      const validpass = bcrypt.compare(req.body.password, userphone.password);
      if (!validpass)
        return res.status(401).send({ message: "Invalid Password" });

      // checking the verified status of the user
      if (!userphone.verified)
        return res
          .status(443)
          .send({ message: "Please Verify Your Account First" });

      if (userphone.deleteStatus != undefined && userphone.deleteStatus == true)
        return res.status(403).send({
          message:
            "You account has been deleted please register your new account to continue.",
        });

      if (!userphone.status)
        return res
          .status(403)
          .send({ message: "You account has been deactivated" });

      // set time for token for 30days
      const tokenTime = 60 * 60 * 24 * 30;
      // create and assign the token
      const token = jwt.sign(
        {
          _id: userphone._id,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: tokenTime }
      );

      let userData = {
        token: token,
        user: {
          id: userphone.id,
          first_name: userphone.first_name,
          last_name: userphone.last_name,
          profile_image: userphone.profile_image,
          phone: userphone.phone,
          role: userphone.userRole,
        },
      };

      return res.status(200).send(userData);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

// loginsub
router.post("/loginsub", async (req, res) => {
  try {
    // validations applying
    const { error } = loginValidation(req.body);
    if (error)
      return res.status(422).send({ message: error.details[0].message });

    // checking if the user email exit
    const user = await Subdomain.findOne({ userHandle: req.body.input });
    if (!user) return res.status(404).send({ message: "Subdomain Not Found" });

    // password is correct
    const validpass = await bcrypt.compare(req.body.password, user.password);
    if (!validpass)
      return res.status(401).send({ message: "Invalid Password" });

    // set time for token for 30days
    const tokenTime = 60 * 60 * 24 * 30;
    // create and assign the token
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: tokenTime }
    );

    let userData = {
      token: token,
      user: {
        name: user.name,
        nepname: user.parentSubdomain == undefined ? user.nepname : user.city,
        role: user.userRole,
        userHandle: user._id,
        category: user.category,
        slug: user.slug,
        hasparent:
          user.parentSubdomain != undefined ? user.parentSubdomain : false,
        hasChetra: user.hasChetra != undefined ? user.hasChetra : false,
      },
    };
    return res.status(200).send(userData);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// updateProfile route
router.put("/applyformembership", verify, async (req, res) => {
  // console.log(req.user._id)
  // Create new user
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  if (user.onlineMemberId != undefined)
    return res.status(203).send({ message: "Already Applided for membership" });

  if (req.files === null) {
    res.send(400).send({ message: "File Check you file" });
  }
  // file select in formdata
  const file_front = req.files.citizenship_front;
  const file_back = req.files.citizenship_back;
  const passportphoto = req.files.passportphoto;
  const applyMemberShipFor = req.body.applyMemberShipFor;

  const imagepath = path.normalize(__dirname + "/../uploads/citizenship");

  // split image data
  const imageName1 = file_front.name.split(".");
  const imageName2 = file_back.name.split(".");
  const imageName3 = passportphoto.name.split(".");

  // get the extension of file
  const ext1 = imageName1[imageName1.length - 1];
  const ext2 = imageName2[imageName2.length - 1];
  const ext3 = imageName2[imageName3.length - 1];

  const img1 = `nccitizenfront${Math.floor(
    Math.random() * 9999999999999
  ).toString()}-${Date.now()}.${ext1}`;
  const img2 = `nccitizenback${Math.floor(
    Math.random() * 9999999999999
  ).toString()}-${Date.now()}.${ext2}`;
  const img3 = `ncpassportphoto${Math.floor(
    Math.random() * 9999999999999
  ).toString()}-${Date.now()}.${ext3}`;

  const uploadPath1 = `${imagepath}/${img1}`;
  const uploadPath2 = `${imagepath}/${img2}`;
  const uploadPath3 = `${imagepath}/${img3}`;

  let frontCitizen;
  let backCitizen;
  let passPort;

  file_front.mv(uploadPath1, async (err) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
    frontCitizen = uploadPath1;
  });
  file_back.mv(uploadPath2, async (err) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
    backCitizen = uploadPath2;
  });
  passportphoto.mv(uploadPath3, async (err) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
    passPort = uploadPath3;
  });

  if (user.citizenship_front[0] != undefined) {
    fs.unlinkSync(
      path.normalize(__dirname + "/.." + user.citizenship_front[0].image)
    );
  }
  if (user.citizenship_back[0] != undefined) {
    fs.unlinkSync(
      path.normalize(__dirname + "/.." + user.citizenship_front[0].image)
    );
  }
  if (user.passportphoto[0] != undefined) {
    fs.unlinkSync(
      path.normalize(__dirname + "/.." + user.passportphoto[0].image)
    );
  }

  const usernew = {
    onlineMemberId: `${
      user.municipality[0] + user.municipality[1] + user.municipality[2]
    }${user.district[0] + user.district[1] + user.district[2]}${
      user.city[0] + user.city[1] + user.city[2]
    }${user.ward}${user.province}${new Date(
      user.dob
    ).getTime()}${new Date().getFullYear()}${
      user.first_name[0] + user.first_name[1] + user.first_name[3]
    }${
      user.last_name[0] + user.last_name[1] + user.last_name[3]
    }`.toLocaleUpperCase(),
    citizenship_front: {
      image: `/uploads/citizenship/${img1}`,
      name: img1,
    },
    citizenship_back: {
      image: `/uploads/citizenship/${img2}`,
      name: img2,
    },
    passportphoto: {
      image: `/uploads/citizenship/${img3}`,
      name: img3,
    },
    applyMemberShipFor: applyMemberShipFor,
    appliedMembership: true,
  };

  try {
    const updateUser = await User.updateOne(
      {
        _id: req.user._id,
      },
      usernew
    );
    if (!updateUser)
      return res
        .status(500)
        .send({ message: "There was some error please try again" });

    if (updateUser) {
      res
        .status(200)
        .send({ message: "You Have Successfully Update Your Profile" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// users
router.get("/users", verify, async (req, res) => {
  const allUser = await User.find(
    {
      userRole: "User",
    },
    {
      subdomain: 0,
      category: 0,
    }
  );
  let data = [];
  let i = 1;

  allUser.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ users: Object.assign(data) });
});

// members
router.get("/members", verify, async (req, res) => {
  const usersingle = await Subdomain.findOne(
    {
      _id: req.user._id,
    },
    {
      subdomain: 0,
      category: 0,
    }
  );
  if (!usersingle)
    return res.status(404).send({ message: "Subdomain Not Found" });

  const allUser = await User.find(
    {
      appliedMembership: true,
      applyMemberShipFor: usersingle.name,
    },
    {
      subdomain: 0,
      category: 0,
    }
  );
  let data = [];
  let i = 1;

  allUser.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ member: Object.assign(data) });
});
router.get("/membersadmin", verify, async (req, res) => {
  const allUser = await User.find(
    {
      appliedMembership: true,
    },
    {
      subdomain: 0,
      category: 0,
    }
  );
  let data = [];
  let i = 1;

  allUser.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ member: Object.assign(data) });
});

router.post("/approveMember", verify, async (req, res) => {
  const user = await User.findOne({
    _id: req.body.id,
    appliedMembership: true,
  });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const usernew = {
    verifiedAsMember: req.body.verifiedAsMember,
  };

  try {
    const updateUser = await User.updateOne(
      {
        _id: user._id,
      },
      usernew
    );
    if (!updateUser)
      return res
        .status(500)
        .send({ message: "There was some error please try again" });

    if (updateUser) {
      res.status(200).send({ message: "You approved member successfully" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/getProfile", verify, async (req, res) => {
  try {

    const user = await User.findOne(
      { _id: req.user._id },
      {
        first_name: 1,
        last_name: 1,
        gender: 1,
        dob: 1,
        about: 1,
        municipality: 1,
        district: 1,
        ward: 1,
        city: 1,
        province: 1,
        address: 1,
        _id: 0,
        email: 1,
        phone: 1,
        createdAt: 1,
        updatedAt: 1,
        image: 1,
      }
    );
    return res.status(200).send({ message: "User Profle", results: user });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!");
  }
});

router.put("/updateProfile", verify, async (req, res) => {
  // checking if the user email exit
  const user = await User.findOne(
    { _id: req.user._id },
    { first_name: 1, last_name: 1, gender: 1, dob: 1, email: 1, phone: 1 }
  );
  let newotp = Math.floor(1000 + Math.random() * 9000);
  const updateUser = await User.updateOne(
    {
      _id: req.user._id,
    },
    {
      $set: {
        first_name:
          req.body.first_name != undefined
            ? req.body.first_name
            : user.first_name,
        last_name:
          req.body.last_name != undefined ? req.body.last_name : user.last_name,
        gender: req.body.gender != undefined ? req.body.gender : user.gender,
        dob: req.body.dob != undefined ? req.body.dob : user.dob,
        about: req.body.about != undefined ? req.body.about : user.about,
        otp: newotp,
      },
    }
  );
  if (!updateUser)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  await user.save();
  const user1 = await User.findOne(
    { _id: req.user._id },
    { first_name: 1, last_name: 1, gender: 1, dob: 1, email: 1, phone: 1 }
  );
  // create and assign the token
  res
    .status(200)
    .send({ message: "Your Profile has been updated", results: user1 });
});

router.post("/getotpemail", verify, async (req, res) => {
  // checking if the user email exit
  const user = await User.findOne({ _id: req.user._id });

  const checkother = await User.findOne({ email: req.body.email });
  if (checkother)
    return res.status(412).send({
      message:
        "Sorry you cannot use this email address other user has already used this one",
    });

  if (!user) return res.status(404).send({ message: "User not found " });

  let newotp = Math.floor(1000 + Math.random() * 9000);

  mailOptions = {
    from: `${process.env.MAIL_FROM} <${process.env.MAIL_ADDRESS}>`,
    to: req.body.email,
    subject: "New OTP Code",
    text: `Your New OTP code is ${newotp}`,
    html: `Your New OTP code is <strong>${newotp}</strong>`,
  };

  mail(mailOptions);

  const updateUser = await User.updateOne(
    {
      _id: req.user._id,
    },
    {
      $set: {
        otp: newotp,
      },
    }
  );
  if (!updateUser)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  if (user) {
    await user.save();
  }
  // create and assign the token
  res.status(200).send({ message: "Check your otp code on new email address" });
});

router.put("/setNewEmail", verify, async (req, res) => {
  // checking if the user email exit
  const user = await User.findOne({ _id: req.user._id });
  if (req.body.email == user.email)
    return res
      .status(412)
      .send({ message: "Please enter your new email address" });

  const checkother = await User.findOne({ email: req.body.email });
  if (checkother)
    return res.status(412).send({
      message:
        "Sorry you cannot use this email address other user has already used this one",
    });

  if (!user) return res.status(404).send({ message: "User not found " });

  if (user.otp != req.body.otp) {
    return res.status(409).send({ message: "Your OTP code doesn't match" });
  }

  const updateUser = await User.updateOne(
    {
      _id: req.user._id,
      otp: req.body.otp,
    },
    {
      $set: {
        email: req.body.email,
      },
    }
  );
  if (!updateUser)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  if (user) {
    await user.save();
  }
  // create and assign the token
  res.status(200).send({ message: "Your email has been updated" });
});

router.post("/getotpphone", verify, async (req, res) => {
  // checking if the user email exit
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(404).send({ message: "User not found " });

    const checkother = await User.findOne({ phone: req.body.phone });
    if (checkother)
      return res.status(412).send({
        message:
          "Sorry you cannot use this phone number other user has already used this one",
      });

    let newotp = Math.floor(1000 + Math.random() * 9000);
    // request.post(
    //   "https://sms.aakashsms.com/sms/v3/send",
    //   {
    //     json: {
    //       auth_token:
    //         "29ed0ec58213e4d87765d7f47f347c69cda83701b84229d3dd8a0717ac0701b5",

    //       to: req.body.phone,
    //       text: `Your new otp code is  : ${newotp}`,
    //     },
    //   },
    //   function (error, response, body) {
    //     if (!error && response.status == 200) {
    //       // console.log(body);
    //     }
    //   }
    // );

    const updateUser = await User.updateOne(
      {
        _id: req.user._id,
      },
      {
        $set: {
          otp: newotp,
        },
      }
    );
    if (!updateUser)
      return res
        .status(500)
        .send({ message: "There was some error please try again" });

    if (user) {
      await user.save();
    }
    // create and assign the token
    res.status(200).send({ message: "Check you otp code on new phone number" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});

router.put("/setNewPhone", verify, async (req, res) => {
  // checking if the user email exit
  const user = await User.findOne({ _id: req.user._id });

  const checkother = await User.findOne({ email: req.body.email });
  if (checkother)
    return res.status(412).send({
      message:
        "Sorry you cannot use this email address other user has already used this one",
    });

  if (!user) return res.status(404).send({ message: "User not found " });

  if (user.otp != req.body.otp) {
    return res.status(409).send({ message: "Your OTP code doesn't match" });
  }

  const updateUser = await User.updateOne(
    {
      _id: req.user._id,
      otp: req.body.otp,
    },
    {
      $set: {
        phone: req.body.phone,
      },
    }
  );
  if (!updateUser)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  if (user) {
    await user.save();
  }
  // create and assign the token
  res.status(200).send({ message: "Your email has been updated" });
});

router.delete("/deleteAccount", verify, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(404).send({ message: "User not found" });

    await User.updateOne(
      {
        _id: req.user._id,
      },
      {
        $set: {
          deleteStatus: true,
        },
      }
    );

    return res.status(200).send({ message: "Your account has been deleted" });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

// logout route
router.post("/logout", verify, async (req, res) => {
  try {
    // The token is already invalidated by the client
    // We just need to log the logout action
    return res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Error during logout" });
  }
});

module.exports = router;
