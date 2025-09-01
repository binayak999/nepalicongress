const router = require("express").Router();
const bcrypt = require("bcryptjs");
const verify = require("../extra/verifyToken");
const Subdomain = require("../model/Subdomain");
const { subDominVaidation } = require("../validation/subDomainVallidation");
const fs = require("fs");
const path = require("path");
const slugify = require("slugify");
// const Subdomain = require('../model/Subdomain');
const verifyToken = require("../extra/verifyToken");

router.post("/create", verify, async (req, res) => {
  //validations applying
  const { error } = subDominVaidation(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  //checking if the user is already in the database
  const nameExit = await Subdomain.findOne({ name: req.body.name });
  if (nameExit)
    return res.status(409).send({ message: "Subdomain Already Exits" });

  //checking if the user is already in the database
  const emailExit = await Subdomain.findOne({ name: req.body.name });
  if (emailExit) return res.status(409).send({ message: "Email Already Used" });

  //Has passwords
  const salt = await bcrypt.genSalt(10);
  const pass =
    req.body.userHandle +
    Math.floor(1000 + Math.random() * 9000) +
    new Date().getFullYear() +
    new Date().getMonth() +
    new Date().getDate();
  const hashedPassword = await bcrypt.hash(pass, salt);

  //Create new user
  const subdomain = new Subdomain({
    name: req.body.name,
    nepname: req.body.nepname,
    slug: slugify(req.body.name, {
      replacement: "-",
      remove: undefined,
      lower: true,
      strict: false,
      locale: "vi",
    }),
    email: req.body.email,
    phone: req.body.phone,
    userHandle: req.body.userHandle,
    password: hashedPassword,
    municipality: req.body.municipality,
    image: req.body.image,
    district: req.body.district,
    ward: req.body.ward,
    province: req.body.province,
    city: req.body.city,
    userRole: "subdomain",
    address: req.body.address,
    category: req.body.category,
    categoryNep: req.body.categoryNep,
    subcategory: req.body.subcategory,
    subcategoryNep: req.body.subcategoryNep,
    facebookUrl: req.body.facebookUrl,
    twitterUrl: req.body.twitterUrl,
    instagramUrl: req.body.instagramUrl,
    externalLink: req.body.externalLink,
    pass: pass,
    parentSubdomain: req.body.parentSubdomain,
    hasChetra: req.body.hasChetra,
    isChetraParent: req.body.isChetraParent,
    isNagarPalika: req.body.isNagarPalika,
  });

  // let mailOptions = {
  //     from: `${process.env.MAIL_FROM} <${process.env.MAIL_ADDRESS}>`,
  //     to: subdomain.email,
  //     subject: "Login Credential",
  //     html: `<table>
  //         <tr><th cols="2">Nepali Congress</th></tr>
  //         <tr><td>Username : </td><td>${subdomain.userHandle}</td></tr>
  //         <tr><td>Password : </td><td>${pass}</td></tr>
  //         </table>`,
  // }

  try {
    const saveSubDomain = await subdomain.save();
    // mail(mailOptions);
    if (saveSubDomain) {
      res
        .status(201)
        .send({ message: "You Have Successfully register the subdomain" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/updatePassword",async (req, res) => {
  try {
    const subdomains = await Subdomain.find();
    for (let ele of subdomains) {
      const salt = await bcrypt.genSalt(10);
      const pass =
        ele.userHandle +
        Math.floor(1000 + Math.random() * 9000)

      const hashedPassword = await bcrypt.hash(pass, salt);
      await Subdomain.updateOne(
        { _id: ele._id },
        {
          $set: {
            pass: pass,
            password: hashedPassword,
            oldPaaaword: ele.password,
          },
        }
      );
    }
    return res
      .status(200)
      .send({ message: "Password Updated Successfully Updated" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: error });
  }
});

//subdomain
router.get("/", async (req, res) => {
  const allUser = await Subdomain.find(
    {},
    { subdomain: 0, category: 0, events: 0, posts: 0 }
  );
  let data = [];
  let i = 1;

  allUser.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ subdomains: Object.assign(data) });
});

//subdomain single
router.get("/profile", verify, async (req, res) => {
  try {
    const allUser = await Subdomain.find(
      { _id: req.user._id },
      {
        subdomain: 0,
        events: 0,
        posts: 0,
        news: 0,
        history: 0,
        ourinspirations: 0,
        pressrelease: 0,
        circular: 0,
        pass: 0,
        reports: 0,
        votes: 0,
        onlinelibrary: 0,
        committee: 0,
        documents: 0,
        popposts: 0,
        notice: 0,
        partyconstitution: 0,
        rulesandregulation: 0,
        password: 0,
        userHandle: 0,
      }
    );
    let data = [];
    let i = 1;

    allUser.forEach((post) => {
      data.push(Object.assign(post, { __v: i }));
      i++;
    });
    return res.status(200).send({ subdomains: Object.assign(data) });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

//subdomain single
router.get("/profileSub", verify, async (req, res) => {
  const allUser = await Subdomain.find(
    { _id: req.user.subDomainId },
    {
      subdomain: 0,
      events: 0,
      posts: 0,
      news: 0,
      history: 0,
      ourinspirations: 0,
      pressrelease: 0,
      circular: 0,
      pass: 0,
      reports: 0,
      votes: 0,
      onlinelibrary: 0,
      committee: 0,
      documents: 0,
      popposts: 0,
      notice: 0,
      partyconstitution: 0,
      rulesandregulation: 0,
      password: 0,
      userHandle: 0,
    }
  );
  let data = [];
  let i = 1;

  allUser.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ subdomains: Object.assign(data) });
});

//subdomain
router.get("/specific", async (req, res) => {
  const allUser = await Subdomain.find(
    {
      $or: [
        { category: "Nepali Congress District Working Committee" },
        { category: "Nepalese People's Co-ordination Committee" },
      ],
      circular: { $exists: true },
    },
    { subdomain: 0, category: 0, events: 0, posts: 0 }
  );
  let data = [];
  allUser.forEach((post) => {
    let i = 1;
    if (post.circular != undefined) {
      // console.log(post.circular);
    }
    data.push(Object.assign(post, { __v: i }));
    i++;
  });

  res.status(200).send({ subdomains: Object.assign(data) });
});

router.get("/optionAction", verifyToken, async (req, res) => {
  try {
    const sub = await Subdomain.findOne(
      { _id: req.user._id },
      { _id: 0, optionAction: 1 }
    );
    res.status(200).send({ message: "Option Action Get", results: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});
router.post("/updatedAction", verifyToken, async (req, res) => {
  try {
    const subsingle = await Subdomain.findOne({ _id: req.body.id });
    let up = await Subdomain.updateOne(
      { _id: req.body.id },
      { $set: { optionAction: !subsingle.optionAction } }
    );

    await subsingle.save();

    const subdomains = await Subdomain.find();
    res
      .status(200)
      .send({ message: "Option Action Get", subdomains: subdomains });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});

router.post("/updatedShowPublic", verifyToken, async (req, res) => {
  try {
    const subsingle = await Subdomain.findOne({ _id: req.body.id });
    let up = await Subdomain.updateOne(
      { _id: req.body.id },
      { $set: { showPublic: !subsingle.showPublic } }
    );

    await subsingle.save();

    const subdomains = await Subdomain.find();
    res
      .status(200)
      .send({ message: "Show public successful", subdomains: subdomains });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});

//subdomain
router.get("/specificcategory", async (req, res) => {
  const allUser = await Subdomain.find(
    {
      $or: [
        { category: "Nepali Congress District Working Committee" },
        { category: "Nepalese People's Co-ordination Committee" },
      ],
    },
    { subdomain: 0, category: 0, events: 0, posts: 0 }
  );
  // console.log(allUser.length);
  let data = [];
  let i = 1;
  allUser.forEach((post) => {
    if (post.circular != undefined) {
      // console.log(post.circular);
    }
    data.push(Object.assign(post, { __v: i }));
    i++;
  });

  res.status(200).send({ subdomains: Object.assign(data) });
});

//subdomain chetra
router.get("/chetra/:slug", async (req, res) => {
  let name =
    req.params.slug.charAt(0).toUpperCase() +
    req.params.slug.slice(1, req.params.slug.length);

  const allUser = await Subdomain.find(
    { parentSubdomain: { $regex: name.replaceAll("-", " "), $options: "i" } },
    { subdomain: 0, category: 0, events: 0, posts: 0 }
  );

  let data = [];
  let i = 1;
  allUser.forEach((post) => {
    // if (post.parentSubdomain != undefined && post.parentSubdomain != '') {
    data.push(Object.assign(post, { __v: i }));
    i++;
    // }
  });
  res.status(200).send({ subdomains: Object.assign(data) });
});

//subdomain zilla
router.get("/zilla", async (req, res) => {
  const allUser = await Subdomain.find(
    {
      category: "Nepali Congress District Working Committee",
      $or: [
        { parentSubdomain: null },
        { parentSubdomain: "" },
        { parentSubdomain: { $exists: false } },
        { hasChetra: "Yes" },
      ],
    },
    { subdomain: 0, category: 0, events: 0, posts: 0 }
  );
  let data = [];
  let i = 1;
  allUser.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ subdomains: Object.assign(data) });
});
router.get("/chetra", async (req, res) => {
  const allUser = await Subdomain.find(
    {
      category: "Nepali Congress District Working Committee",
      parentSubdomain: { $ne: null },
    },
    { subdomain: 0, category: 0, events: 0, posts: 0 }
  );
  let data = [];
  let i = 1;
  allUser.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ subdomains: Object.assign(data) });
});

//subdomain frontend
router.get("/frontend", async (req, res) => {
  const allUser = await Subdomain.find({ parentSubdomain: null });
  res.status(200).send({ subdomain: allUser });
});

//subdomain slug
router.get("/frontend/:slug", async (req, res) => {
  const allUser = await Subdomain.findOne({ slug: req.params.slug });
  res.status(200).send({ subdomain: allUser });
});
//subdomain slug
router.get("/dashbaord/:id", async (req, res) => {
  const allUser = await Subdomain.findOne({ _id: req.params.id });
  // console.log(allUser)
  res.status(200).send({ subdomain: allUser });
});

router.post("/update", verify, async (req, res) => {
  if (req.body.removedImage.length != 0) {
    req.body.removedImage.forEach((ele) => {
      if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
        fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
      }
    });
  }
  //checking if the user is already in the database
  const emailExit = await Subdomain.findOne({
    userHandle: req.body.userHandle,
  });
  if (!emailExit)
    return res.status(409).send({ message: "Subdomain Does't Exits" });

  //Create new user
  const subdomain = {
    name: req.body.name,
    nepname: req.body.nepname,
    slug: slugify(req.body.name, {
      replacement: "-",
      remove: undefined,
      lower: true,
      strict: false,
      locale: "vi",
    }),
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    municipality: req.body.municipality,
    image: req.body.image,
    district: req.body.district,
    ward: req.body.ward,
    province: req.body.province,
    phone: req.body.phone,
    email: req.body.email,
    city: req.body.city,
    userRole: "subdomain",
    category: req.body.category,
    categoryNep: req.body.categoryNep,
    subcategory: req.body.subcategory,
    facebookUrl: req.body.facebookUrl,
    twitterUrl: req.body.twitterUrl,
    instagramUrl: req.body.instagramUrl,
    externalLink: req.body.externalLink,
    subcategoryNep: req.body.subcategoryNep,
    parentSubdomain: req.body.parentSubdomain,
    hasChetra: req.body.hasChetra,
  };

  // console.log(subdomain)
  const updateUser = await Subdomain.updateOne(
    { _id: emailExit._id },
    { $set: subdomain }
  );
  if (!updateUser)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  try {
    const saveSubDomain = await emailExit.save();
    // mail(mailOptions);
    if (saveSubDomain) {
      res
        .status(200)
        .send({ message: "You Have Successfully update the subdomain" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
