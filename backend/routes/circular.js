const router = require("express").Router();
const verifySubdomain = require("../extra/verifyActiveMember");
const verifyadmin = require("../extra/verifyToken");
const { circularValidation } = require("../validation/circularValidation");
const Circular = require("../model/Circular");
const fs = require("fs");
const User = require("../model/User");
const ActiveUser = require("../model/ActiveUser");
const path = require("path");
const Subdomain = require("../model/Subdomain");
const ActiveMemberSubmit = require("../model/ActiveMemberSubmit");
const ActiveDataStatus = require("../model/ActiveDataStatus");
const globalpagination = require("../extra/globalpagination");
const verifyToken = require("../extra/verifyToken");
const Signature = require("../model/Signature");
const Medias = require("../model/Medias");
const QRCode = require("qrcode");
const mediaUpload = require("../extra/mediaUpload");
const svg2img = require("svg2img");
const { default: axios } = require("axios");
const dotenv = require("dotenv");
const ActiveMemberPhoneInquiry = require("../model/ActiveMemberPhoneInquiry");
const { Parser } = require("json2csv");
const { withErrorHandling } = require("../extra/errorHandling");

dotenv.config();

// Add this mapping function
const regionToProvince = {
  1: "कोशी",
  2: "मधेश",
  3: "बागमती",
  4: "गण्डकी",
  5: "लुम्बिनी",
  6: "कर्णाली",
  7: "सुदूरपश्चिम",
};

const remapData = (data) => {
  return data.map((item) => {
    const remapped = { ...item };
    // Rename fields
    remapped["kriyasil_number"] = item.workingformnumber;
    remapped["old_kriyasil_number"] = item.workingformnumberold;
    // Map region to province
    remapped["province"] = regionToProvince[item.region] || item.region;

    // Remove old fields
    delete remapped.workingformnumber;
    delete remapped.workingformnumberold;
    delete remapped.region;

    return remapped;
  });
};

// Update the fields array
const fields = [
  "kriyasil_number",
  "old_kriyasil_number",
  "formNumber",
  "membername",
  "gender",
  "age",
  "phone",
  "email",
  "address",
  "province",
  "district",
  "municipality",
  "ward",
  "inclusivegroup",
  "memberType",
  "fathermothername",
  "mothername",
  "profession",
];

router.post("/create", verifySubdomain, async (req, res) => {
  let user;
  // //userdata

  user = await Subdomain.findOne({ userHandle: req.user.userHandle });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  let activeuser = await ActiveUser.findById(req.user._id);
  if (!activeuser.status)
    return res.status(409).send({
      message: "You cannot add new data you have been deactivated by the admin",
    });

  if (!user.optionAction)
    return res.status(409).send({
      message: "You cannot add new data you have been deactivated by the admin",
    });

  const reportSubmited = await ActiveMemberSubmit.find({
    subdomain: user.userHandle,
  });

  // if (!reportSubmited[0] != undefined) {
  let post;

  if (
    user.category == "Nepali Congress District Working Committee" ||
    user.category == "Nepalese People's Co-ordination Committee"
  ) {
    // if (user.category == "Nepali Congress District Working Committee") { // validations applying
    const { error } = circularValidation(req.body);
    if (error)
      return res.status(422).send({ message: error.details[0].message });

    let baseNumber = 0;
    let checkLength = await Circular.find({
      numberMix: req.body.workingformnumber,
    });
    baseNumber = checkLength.length + 1;

    if (baseNumber < 10) {
      baseNumber = "0000" + baseNumber;
    } else if (baseNumber < 100) {
      baseNumber = "000" + baseNumber;
    } else if (baseNumber < 1000) {
      baseNumber = "00" + baseNumber;
    } else if (baseNumber < 10000) {
      baseNumber = "0" + baseNumber;
    } else {
      baseNumber;
    }

    // console.log(req.body);

    post = new Circular({
      numberMix: req.body.workingformnumber,
      formNumber: req.body.formNumber,
      workingformnumber:
        req.body.workingformnumber + baseNumber + "/" + req.body.dateofkriyasil,
      workingformnumberold: req.body.workingformnumberold,
      membername: req.body.membername,
      fathermothername: req.body.fathermothername,
      husbandwifename: req.body.husbandwifename,
      age: req.body.age,
      profession: req.body.profession,
      gender: req.body.gender,
      region:
        user.category != "Nepalese People's Co-ordination Committee"
          ? user.province
          : req.body.province,
      district:
        user.category != "Nepalese People's Co-ordination Committee"
          ? user.nepname
          : req.body.district,
      houseofrepresentative: req.body.houseofrepresentative,
      pradeshassemblyconstituency: req.body.pradeshassemblyconstituency,
      municipality: req.body.municipality,
      wardno: req.body.wardno,
      inclusivegroup: req.body.inclusivegroup,
      froRconstituencyNo: req.body.froRconstituencyNo,
      savikmunicipality: req.body.savikmunicipality,
      savikwardno: req.body.savikwardno,
      phone: req.body.phone,
      email: req.body.email,
      kaifiyat: req.body.kaifiyat,
      images: req.body.images,
      memberType: req.body.memberType,
      userHandle: user.userHandle,
      userName: req.user.username,
      maindistrict: req.body.maindistrict,
      country:
        user.category != "Nepalese People's Co-ordination Committee"
          ? ""
          : user.name,
      fullAddress: req.body.fullAddress,
      createdAt: Date.now(),
      updateAt: Date.now(),
      status: true,
    });
  }
  if (req.body.userRole === "subdomain") {
    try {
      if (user.optionAction) {
        await post.save();
        return res.status(201).send({
          message: "Active Member has been created",
        });
      } else {
        return res.status(201).send({
          message: "You cannot add new active member the time has been gone",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
});

// circular
router.get(
  "/circulars",
  verifySubdomain,
  withErrorHandling(async (req, res) => {
    // User verification
    const subdomain = await Subdomain.findOne({
      userHandle: req.user.userHandle,
    });
    if (!subdomain)
      return res.status(404).send({ message: "Username Not Found" });

    let activeuser = await ActiveUser.findById(req.user._id);
    if (!activeuser.status)
      return res.status(409).send({
        message: "You cannot view data you have been deactivated by the admin",
      });

    if (!subdomain.optionAction)
      return res.status(409).send({
        message: "You cannot view data you have been deactivated by the admin",
      });

    // Pagination parameters
    const limit = parseInt(req.query.limit || 10);
    const page = parseInt(req.query.page || 1);

    // Condition object for query
    let condition = {
      memberType: "New",
      status: { $ne: false },
      membername: { $ne: " " },
    };

    // Set the filter based on subdomain type
    if (
      subdomain.parentSubdomain == undefined ||
      subdomain.parentSubdomain == null
    ) {
      condition.maindistrict = subdomain.name;
    } else {
      condition.userHandle = subdomain.userHandle;
    }

    // Get circulars with pagination
    let allPosts = [];
    if (limit != 0) {
      allPosts = await Circular.find(condition)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    }

    // Count total posts
    let totalpost = await Circular.countDocuments(condition);

    // Generate pagination details
    let pg = globalpagination(totalpost, page, limit);

    return res.status(200).send({
      posts: allPosts,
      total: totalpost,
      pagination: pg,
    });
  })
);

// circularall
router.get("/circularsall", verifySubdomain, async (req, res) => {
  // //userdata
  try {
    const user = await Subdomain.findOne({ userHandle: req.user.userHandle });
    if (!user) return res.status(404).send({ message: "Username Not Found" });

    let activeuser = await ActiveUser.findById(req.user._id);
    if (!activeuser.status && activeuser.accountType != "printcard")
      return res.status(409).send({
        message: "You cannot view data you have been deactivated by the admin",
      });

    if (!user.optionAction && activeuser.accountType != "printcard")
      return res.status(409).send({
        message: "You cannot view data you have been deactivated by the admin",
      });

    let allPosts;

    if (user.parentSubdomain == undefined || user.parentSubdomain == null) {
      allPosts = await Circular.find({
        maindistrict: user.name,
        status: {
          $ne: false,
        },

        membername: {
          $ne: " ",
        },
      })
        .sort({ createdAt: -1 })
        .limit(parseInt(req.query.limit));
      let data = [];
      for (let ele of allPosts) {
        data.unshift({
          ...ele._doc,
          fullAddress:
            user.category == "Nepalese People's Co-ordination Committee"
              ? req.body.district
              : ele.fullAddress,
        });
      }

      return res.status(200).send({ posts: data });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/getTotalReports", verifyadmin, async (req, res) => {
  const posts = await Circular.aggregate([
    {
      $match: {
        status: {
          $ne: false,
        },

        membername: {
          $ne: " ",
        },
      },
    },
    {
      $group: {
        _id: "$userHandle",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        place: "$_id",
        count: "$count",
        _id: 0,
      },
    },
  ]).sort({ count: -1 });
  const district = await Circular.aggregate([
    {
      $match: {
        status: {
          $ne: false,
        },

        membername: {
          $ne: " ",
        },
      },
    },
    {
      $group: {
        _id: "$maindistrict",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        place: "$_id",
        count: "$count",
        _id: 0,
      },
    },
  ]).sort({ count: -1 });

  res.status(200).send({ posts: posts, district: district });
});

router.get("/getTotalReportProvince", verifyadmin, async (req, res) => {
  const province = await Subdomain.find(
    {
      province: req.query.province,
      category: "Nepali Congress District Working Committee",
    },
    {
      _id: 0,
      name: 1,
    }
  );

  let main = [];

  province.forEach((ele) => {
    main.push({
      $and: [
        {
          maindistrict: ele.name,
        },
      ],
    });
  });
  const posts = await Circular.aggregate([
    {
      $match: {
        ...conditionCheck,
      },
    },
    {
      $match: {
        $or: main,
      },
    },
    {
      $group: {
        _id: "$userHandle",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        place: "$_id",
        count: "$count",
        _id: 0,
      },
    },
  ]).sort({ count: -1 });
  const district = await Circular.aggregate([
    {
      $match: {
        ...conditionCheck,
      },
    },
    {
      $match: {
        $or: main,
      },
    },
    {
      $group: {
        _id: "$maindistrict",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        place: "$_id",
        count: "$count",
        _id: 0,
      },
    },
  ]).sort({ count: -1 });

  res.status(200).send({ posts: posts, district: district });
});

router.get("/getTotalSubdomain", verifyadmin, async (req, res) => {
  try {
    const subdomain = await Subdomain.find(
      {
        category: "Nepali Congress District Working Committee",
      },
      {
        _id: 1,
        name: 1,
        totalActiveMember: 1,
      }
    );

    subdomain.forEach(async (ele) => {
      let cir = await Circular.find({
        maindistrict: ele.name,
      }).countDocuments();
      if (cir > 0) {
        let sb = await Subdomain.findOne({ _id: ele._id });

        await Subdomain.updateOne(
          {
            _id: ele._id,
          },
          {
            $set: {
              totalActiveMember: cir,
            },
          }
        );
        await sb.save();
      }
    });
    subdomain.forEach(async (ele) => {
      let cir = await Circular.find({ userHandle: ele.name }).countDocuments();
      if (cir > 0) {
        let sb = await Subdomain.findOne({ _id: ele._id });

        await Subdomain.updateOne(
          {
            _id: ele._id,
          },
          {
            $set: {
              totalActiveMember: cir,
            },
          }
        );
        await sb.save();
      }
    });

    res.status(200).send({ subdomain: subdomain });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/getTotalReportColor", verifyadmin, async (req, res) => {
  try {
    const province = await Subdomain.find(
      {
        // province: req.query.province,
        category: "Nepali Congress District Working Committee",
      },
      {
        _id: 0,
        name: 1,
        totalActiveMember: 1,
      }
    );

    res.status(200).send({ results: province });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
});

// circularall
router.get("/admincircularsall", verifyadmin, async (req, res) => {
  try {
    const allPosts = await Circular.find({
      status: {
        $ne: false,
      },
    });

    return res.status(200).send({ posts: allPosts });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: error });
  }
});

// circular
router.get("/circularsold", verifySubdomain, async (req, res) => {
  try {
    const user = await Subdomain.findOne({ userHandle: req.user.userHandle });
    if (!user) return res.status(404).send({ message: "Username Not Found" });

    let activeuser = await ActiveUser.findById(req.user._id);
    if (!activeuser.status)
      return res.status(409).send({
        message:
          "You cannot add new data you have been deactivated by the admin",
      });

    if (!user.optionAction)
      return res.status(409).send({
        message:
          "You cannot add new data you have been deactivated by the admin",
      });

    let allPosts = [];

    allPosts = await Circular.find({
      userHandle: user.userHandle,
      memberType: "Old",
      status: {
        $ne: false,
      },
      membername: {
        $ne: " ",
      },
    })
      .sort({ createdAt: -1 })
      .limit(parseInt(req.query.limit));

    let data = [];
    let i = allPosts.length;

    allPosts.forEach((post) => {
      data.push(Object.assign(post, { __v: i }));
      i--;
    });
    let totalpost = await Circular.find({
      userHandle: user.userHandle,
      memberType: "Old",
      status: {
        $ne: false,
      },
      membername: {
        $ne: " ",
      },
    }).countDocuments();
    res.status(200).send({ posts: allPosts, total: totalpost });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.get("/admincirculars", verifyadmin, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page ? req.query.page : 1);
    conditionCheck.memberType = req.query.memberType
      ? req.query.memberType
      : "New";
    let allPosts = [];
    if (req.query.limit != 0) {
      allPosts = await Circular.find(conditionCheck)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    }
    let totalpost = await Circular.countDocuments(conditionCheck);
    let pg = globalpagination(totalpost, page, limit);

    return res
      .status(200)
      .send({ posts: allPosts, total: totalpost, pagination: pg });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
});
router.get("/admincircularsold", verifyadmin, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(404).send({ message: "Username Not Found" });

    conditionCheck.memberType = "Old";
    let allPosts;
    if (req.query.limit != 0) {
      allPosts = await Circular.find(conditionCheck)
        .sort({ createdAt: -1 })
        .limit(parseInt(req.query.limit));
    }

    let totalpost = await Circular.countDocuments(conditionCheck);

    res.status(200).send({ posts: allPosts, total: totalpost });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
});

// single circular id
router.get("/single/:id", async (req, res) => {
  const allPosts = await Circular.findOne({
    _id: req.params.id,
    status: {
      $ne: false,
    },
    membername: {
      $ne: " ",
    },
  });
  if (!allPosts)
    res.status(404).send({ message: "Circular or Is Deactivated" });

  if (allPosts) await res.status(200).send({ post: allPosts });
});

router.put("/updateAll", verifySubdomain, async (req, res) => {
  let post = await Circular.findOne({ _id: req.body.id });
  if (!post) res.status(404).send({ message: "Circular Didn't not found" });

  const user = await Subdomain.findOne({ userHandle: req.user.userHandle });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  let updateData;

  if (
    user.category == "Nepali Congress District Working Committee" ||
    user.category == "Nepalese People's Co-ordination Committee"
  ) {
    if (user.category == "Nepali Congress District Working Committee") {
      updateData = {
        membername: req.body.membername,
        formNumber: req.body.formNumber,
        workingformnumberold: req.body.workingformnumberold,
        fathermothername: req.body.fathermothername,
        husbandwifename: req.body.husbandwifename,
        age: req.body.age,
        profession: req.body.profession,
        gender: req.body.gender,
        region: req.body.region,
        district: req.body.district,
        houseofrepresentative: req.body.houseofrepresentative,
        pradeshassemblyconstituency: req.body.pradeshassemblyconstituency,
        municipality: req.body.municipality,
        wardno: req.body.wardno,
        inclusivegroup: req.body.inclusivegroup,
        froRconstituencyNo: req.body.froRconstituencyNo,
        savikmunicipality: req.body.savikmunicipality,
        savikwardno: req.body.savikwardno,
        phone: req.body.phone,
        email: req.body.email,
        kaifiyat: req.body.kaifiyat,
        images: req.body.images,
        maindistrict: req.body.maindistrict,
        updateduserName: req.user.username,
        updateAt: Date.now(),
        sort: req.body.sort != undefined ? req.body.sort : 0,
      };
    } else if (user.category == "Nepalese People's Co-ordination Committee") {
      post = new Circular({
        membername: req.body.membername,
        fathermothername: req.body.fathermothername,
        age: req.body.age,
        profession: req.body.profession,
        gender: req.body.gender,
        address: user.nepname,
        nepaladdress: req.body.nepaladdress,
        citizenshipno: req.body.citizenshipno,
        phone: req.body.phone,
        email: req.body.email,
        kaifiyat: req.body.kaifiyat,
        images: req.body.images,
        memberType: req.body.memberType,
        updateduserName: req.user.username,
        updateAt: Date.now(),
      });
    }
  }

  if (req.body.removedImage.length != 0) {
    req.body.removedImage.forEach((ele) => {
      if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
        fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
      }
    });
  }

  await Circular.updateOne(
    {
      _id: req.body.id,
    },
    {
      $set: {
        ...updateData,
      },
    }
  );

  try {
    if (user.optionAction) {
      await post.save();
      res.status(200).send({ message: "Your Circular Has Been Updated" });
    } else {
      res
        .status(200)
        .send({ message: "You cannot update data now the time has been gone" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/subDomainSubmit", verifySubdomain, async (req, res) => {
  let user;
  finalSubmitLog = new ActiveMemberSubmit({
    subdomain: req.user.userHandle,
    submittedby: req.user.username,
  });
  finalSubmitLog.save();

  user = await Subdomain.findOne({ userHandle: req.user.userHandle });
  if (user.userRole === "subdomain") {
    if (!user) return res.status(404).send({ message: "Username Not Found" });

    await Circular.updateMany(
      {
        userHandle: user.userHandle,
      },
      {
        $set: {
          subdomainStatus: false,
        },
      }
    );
    let allpost = await Circular.find({ userHandle: user.userHandle });
    if (allpost.length !== 0) {
      try {
        allpost = await Circular.find({ userHandle: user.userHandle });
        const updateUser = await ActiveUser.updateOne(
          {
            userHandle: user.userHandle,
          },
          {
            $set: {
              posts: allpost,
            },
          }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res.status(200).send({ message: "Your Circular Has Been Updated" });
      } catch (error) {
        console.log(error);
        res.status(200).send({ message: error });
      }
    }
  }
});

router.post("/toggleVisibility", verifyadmin, async (req, res) => {
  try {
    const user = await Subdomain.findById(req.body.id);
    await Subdomain.updateOne(
      { _id: user._id },
      { $set: { visible: !user.visible } }
    );
    await Circular.updateMany(
      {
        userHandle: user.userHandle,
      },
      {
        $set: {
          visible: !user.visible,
        },
      }
    );
    const subdomains = await Subdomain.find();
    res.status(200).send({
      message: "Your Circular Has Been Updated",
      subdomains: subdomains,
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({ message: error });
  }
});
router.post("/activedata", verifyadmin, async (req, res) => {
  try {
    const activedata = await ActiveDataStatus.findOne({
      district: req.body.district,
      houseofrepresentative: req.body.houseofrepresentative,
      memberType: req.body.memberType,
    });
    let rslt = false;
    let edslt = false;
    if (activedata) {
      rslt = !activedata.status;
      edslt = !activedata.editstatus;
    }
    res.status(200).send({
      message: "List of active member data status",
      results: { visible: rslt, edslt: edslt },
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/activedataall", verifyadmin, async (req, res) => {
  try {
    const activedata = await ActiveDataStatus.find();
    res.status(200).send({
      message: "List of active member data status",
      results: activedata,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/toggleVisibilityStatus", verifyadmin, async (req, res) => {
  try {
    const subdomain = await Subdomain.findOne({ nepname: req.body.district });
    const user = await User.findById(req.user._id);
    let statusActive = await ActiveDataStatus.findOne({
      district: req.body.district,
      houseofrepresentative: req.body.houseofrepresentative,
      memberType: req.body.memberType,
      userHandle: user.userHandle,
    });
    let amds;
    if (statusActive == null) {
      amds = new ActiveDataStatus({
        district: req.body.district,
        houseofrepresentative: req.body.houseofrepresentative,
        memberType: req.body.memberType,
        userHandle: user.userHandle,
        status: req.body.status,
        editstatus: req.body.status,
      });
    } else {
      amds = await ActiveDataStatus.findOne({
        district: req.body.district,
        houseofrepresentative: req.body.houseofrepresentative,
        memberType: req.body.memberType,
        userHandle: user.userHandle,
      });
      await ActiveDataStatus.updateOne(
        {
          district: req.body.district,
          houseofrepresentative: req.body.houseofrepresentative,
          memberType: req.body.memberType,
          userHandle: user.userHandle,
        },
        { $set: { status: req.body.status, editstatus: req.body.status } }
      );
    }

    await Circular.updateMany(
      {
        maindistrict: subdomain.name,
        houseofrepresentative: req.body.houseofrepresentative,
        memberType: req.body.memberType,
      },
      {
        $set: {
          visible: req.body.status,
        },
      }
    );

    await amds.save();

    res.status(200).send({
      message: "Your Circular Has Been Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({ message: error });
  }
});

router.get("/getSingleActiveMember/:id", verifyadmin, async (req, res) => {
  try {
    let post = await Circular.findOne({
      _id: req.params.id,
      status: {
        $ne: false,
      },
      membername: {
        $ne: " ",
      },
    });
    res.status(200).send({ activemember: post });
  } catch (error) {
    console.log(error);
    res.status(200).send({ message: error });
  }
});

router.post("/filterCircular", verifySubdomain, async (req, res) => {
  try {
    const user = await Subdomain.findOne({ userHandle: req.user.userHandle });
    if (!user) return res.status(404).send({ message: "Username Not Found" });

    let activeuser = await ActiveUser.findById(req.user._id);
    if (!activeuser.status)
      return res.status(409).send({
        message: "You cannot view data you have been deactivated by the admin",
      });

    if (!user.optionAction)
      return res.status(409).send({
        message: "You cannot view data you have been deactivated by the admin",
      });

    if (req.body.district != undefined) {
      let filterData;

      let post = await Subdomain.findOne({ nepname: req.body.district });

      let limit = req.body.limit;
      filterData = Object.assign(req.body, {
        status: {
          $ne: false,
        },
        membername: {
          $ne: " ",
        },
        maindistrict: post.name,
      });
      delete filterData.limit;
      delete filterData.district;

      try {
        let activeMember = await Circular.find(filterData)
          .sort({ createdAt: 1 })
          .limit(limit);
        let activeMemberAll = await Circular.find(filterData).countDocuments();
        let data = [];
        let i = 1;
        activeMember.forEach((post) => {
          data.push(Object.assign(post, { __v: i }));
          i++;
        });

        res
          .status(200)
          .send({ posts: Object.assign(data), total: activeMemberAll });
      } catch (error) {
        res.status(404).send({ posts: [], total: activeMemberAll });
      }
    } else {
      res.status(200).send({ posts: [], total: 0 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});

router.post(
  "/filterCircularAdmin",
  verifyadmin,
  withErrorHandling(async (req, res) => {
    let filterData = {
      status: { $ne: false },
      membername: { $ne: " " },
    };

    let limit = req.body.limit;
    let skip = req.body.skip;

    // Handle district filter
    if (req.body.district) {
      const post = await Subdomain.findOne({ nepname: req.body.district });
      if (post) {
        filterData.maindistrict = post.name;
      }
    }

    // Handle working form number filter
    if (req.body.workingformnumber) {
      filterData.workingformnumber = req.body.workingformnumber;
    }

    // Copy other filter parameters
    for (const key in req.body) {
      if (!["district", "limit", "skip"].includes(key)) {
        filterData[key] = req.body[key];
      }
    }
    // Use Promise.all to run queries in parallel
    const [activeMember, activeMemberAll] = await Promise.all([
      Circular.find(filterData)
        .sort({ createdAt: 1 })
        .skip(limit * (skip - 1))
        .limit(limit)
        .lean()
        .allowDiskUse(true), // Add allowDiskUse here
      Circular.countDocuments(filterData),
    ]);

    const pagination = globalpagination(activeMemberAll, skip, limit);

    // Get all media files in one query instead of querying for each member
    const memberIds = activeMember.map((member) => member._id);
    const allMedias = await Medias.find({
      assignedTo: { $in: memberIds },
      usedin: { $in: ["image", "nationalFile"] },
    }).lean();

    // Create a lookup map for faster access
    const mediaMap = {};
    allMedias.forEach((media) => {
      if (!mediaMap[media.assignedTo]) {
        mediaMap[media.assignedTo] = {};
      }
      mediaMap[media.assignedTo][media.usedin] = media;
    });

    // Process members with their media
    const data = activeMember.map((ele, index) => {
      const memberMedia = mediaMap[ele._id] || {};
      const imageFile = memberMedia.image;
      const nationalFile = memberMedia.nationalFile;

      return {
        ...ele,
        __v: index + 1,
        image:
          imageFile && `http://${req.headers.host}${imageFile.fileLocation}`,
        nationalFile:
          nationalFile &&
          `http://${req.headers.host}${nationalFile.fileLocation}`,
      };
    });

    return res.status(200).send({
      posts: data,
      pagination: pagination,
      totalAllGender: 0,
      totalAll: 0,
      totalAllInclusive: 0,
      totalAllAge: 0,
      total: 0,
      totalActive: 0,
      totalDistrict: 0,
      totalDistrictGender: 0,
      totalDistrictAge: 0,
      totalInclusive: 0,
      totalPhoneAdded: 0,
      totalPhoneNotAdded: 0,
    });
  })
);

router.post("/filterCircularAdminCard", verifyadmin, async (req, res) => {
  if (req.body.district != undefined) {
    let filterData;
    let post = await Subdomain.findOne({
      nepname: { $regex: req.body.district },
    });
    let subdomainObj = post;
    let limit = req.body.limit;
    filterData = Object.assign(
      req.body,
      {
        status: {
          $ne: false,
        },
        membername: {
          $ne: " ",
        },
        maindistrict: { $regex: "^" + post.address, $options: "i" },
      },
      {
        country: {
          $ne: "",
        },
      }
    );
    let skip = filterData.skip;
    delete filterData.limit;
    delete filterData.skip;

    try {
      const signature1 = await Signature.findOne({
        $and: [
          { province: { $exists: false } },
          { district: { $exists: false } },
        ],
      });

      const sign1 =
        signature1 && (await Medias.findOne({ assignedTo: signature1._id }));

      const signature2 = await Signature.findOne({
        $and: [
          { province: req.body.province },
          { district: { $exists: false } },
        ],
      });

      const sign2 =
        signature2 && (await Medias.findOne({ assignedTo: signature2._id }));

      const signature3 = await Signature.findOne({
        $and: [
          { province: req.body.province },
          { district: req.body.district },
        ],
      });

      const sign3 =
        signature3 && (await Medias.findOne({ assignedTo: signature3._id }));

      delete filterData.province;
      delete filterData.district;

      let activeMember = await Circular.find(filterData)
        .sort({ createdAt: 1 })
        .skip(limit * (skip - 1))
        .limit(limit);
      let activeMemberAll = await Circular.countDocuments(filterData);
      let pagination = globalpagination(activeMemberAll, skip, limit);

      let data = [];
      let i = 1;

      for (let post of activeMember) {
        let qr = undefined;
        QRCode.toString(
          `https://api.nepalicongress.org/api/v1/qrcode/code/${post.workingformnumber.replace(
            "/",
            "_"
          )}`,
          {
            errorCorrectionLevel: "H",
            type: "svg",
            quality: 0.92,
            width: 80,
            margin: 1,
            color: {
              dark: "#008000",
              light: "#FFF",
            },
          },
          function (err, QRcode) {
            if (err) return console.log("error occurred");
            qr = QRcode;

            // Printing the generated code
            return QRcode;
          }
        );

        svg2img(qr, function (error, buffer) {
          //returns a Buffer
          const blob = {
            buffer: buffer,
            type: "image/png",
            size: buffer.length,
          };

          const base64Image = buffer.toString("base64");
          const dataURI = "data:image/png;base64," + base64Image;

          data.push({
            qr: dataURI,
            ...post._doc,
            __v: i,
            fullAddress:
              subdomainObj.category ==
              "Nepalese People's Co-ordination Committee"
                ? subdomainObj.nepname
                : post.fullAddress,
          });
          i++;
          // fs.writeFileSync("foo1.png", buffer);
        });
      }

      return res.status(200).send({
        posts: Object.assign(data),
        pagination: pagination,
        signatures: {
          signature1:
            sign1 && `http://${req.headers.host}${sign1.fileLocation}`,
          signature2:
            sign2 && `http://${req.headers.host}${sign2.fileLocation}`,
          signature3:
            sign3 && `http://${req.headers.host}${sign3.fileLocation}`,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(404).send({ posts: [], total: error });
    }
  } else {
    res.status(200).send({ posts: [], total: 0 });
  }
});

router.post("/chartLoadAdmin", verifyadmin, async (req, res) => {
  if (req.body.district != undefined) {
    let filterData;
    let post = await Subdomain.findOne({ nepname: req.body.district });
    let limit = req.body.limit;
    filterData = Object.assign(req.body, {
      status: {
        $ne: false,
      },
      membername: {
        $ne: " ",
      },
      maindistrict: post.address,
    });
    let skip = filterData.skip;
    delete filterData.limit;
    delete filterData.skip;
    delete filterData.district;

    try {
      let activeMember = await Circular.find(filterData)
        .skip(limit * skip)
        .limit(limit);

      let activeAll = await Circular.countDocuments(filterData);

      // Perform all aggregations in parallel for better performance
      const [
        allInclusiveMain,
        allGenderMain,
        allAge,
        allMain,
        allInclusive,
        allActiveMemberDistrict,
        allActiveMemberGenderDistrict,
        allActiveMemberAgeDistrict,
        allPhoneAdded,
        allPhoneNotAdded,
      ] = await Promise.all([
        // All inclusive group aggregation
        Circular.aggregate([
          { $match: filterData },
          { $group: { _id: "$inclusivegroup", count: { $sum: 1 } } },
          { $project: { title: "$_id", count: "$count", _id: 0 } },
        ]),

        // All gender aggregation
        Circular.aggregate([
          { $match: filterData },
          { $group: { _id: "$gender", count: { $sum: 1 } } },
          { $project: { title: "$_id", count: "$count", _id: 0 } },
        ]),

        // All age aggregation
        Circular.aggregate([
          { $match: filterData },
          { $group: { _id: "$age", count: { $sum: 1 } } },
          { $project: { title: "$_id", count: "$count", _id: 0 } },
        ]),

        // All member type aggregation
        Circular.aggregate([
          { $match: filterData },
          { $group: { _id: "$memberType", count: { $sum: 1 } } },
          { $project: { title: "$_id", count: "$count", _id: 0 } },
        ]),

        // District inclusive group aggregation
        Circular.aggregate([
          { $match: filterData },
          { $group: { _id: "$inclusivegroup", count: { $sum: 1 } } },
          { $project: { title: "$_id", count: "$count", _id: 0 } },
        ]),

        // District member type aggregation
        Circular.aggregate([
          { $match: filterData },
          { $group: { _id: "$memberType", count: { $sum: 1 } } },
          { $project: { title: "$_id", count: "$count", _id: 0 } },
        ]),

        // District gender aggregation
        Circular.aggregate([
          { $match: filterData },
          { $group: { _id: "$gender", count: { $sum: 1 } } },
          { $project: { title: "$_id", count: "$count", _id: 0 } },
        ]),

        // District age aggregation
        Circular.aggregate([
          { $match: filterData },
          { $group: { _id: "$age", count: { $sum: 1 } } },
          { $project: { title: "$_id", count: "$count", _id: 0 } },
        ]),

        // Phone statistics
        Circular.countDocuments({
          ...filterData,
          phone: { $ne: "" },
        }),

        Circular.countDocuments({
          ...filterData,
          phone: "",
        }),
      ]);

      // Format the data
      let data = [];
      let i = 1;
      activeMember.forEach((post) => {
        data.push(Object.assign({ ...post._doc }, { __v: i }));
        i++;
      });

      // Send the response
      return res.status(200).send({
        totalAllGender: allGenderMain,
        totalAll: allMain,
        totalAllInclusive: allInclusiveMain,
        totalAllAge: totalAgeFunction(allAge),
        total: activeAll,
        totalActive: activeAll,
        totalDistrict: allActiveMemberDistrict,
        totalDistrictGender: allActiveMemberGenderDistrict,
        totalDistrictAge: totalAgeFunction(allActiveMemberAgeDistrict),
        totalInclusive: allInclusive,
        totalPhoneAdded: allPhoneAdded,
        totalPhoneNotAdded: allPhoneNotAdded,
        posts: data,
      });
    } catch (error) {
      console.log(error);
      res.status(404).send({ posts: [], total: error });
    }
  } else {
    return res.status(200).send({ posts: [], total: 0 });
  }
});

router.post("/filterUserActiveMember", async (req, res) => {
  try {
    let filterData;

    let post = await Subdomain.findOne(
      { nepname: req.body.district },
      { _id: 0, address: 1 }
    );
    if (!post) {
      post = await Subdomain.findOne({ address: req.body.district });
    }

    filterData = Object.assign(req.body, {
      status: {
        $ne: false,
      },
      membername: {
        $ne: " ",
      },
      maindistrict: post.address,
    });

    limit = 1000;
    // console.log(filterData)

    delete filterData.limit;
    delete filterData.district;
    let activeMember = await Circular.find(filterData, {
      membername: 1,
      _id: 0,
      gender: 1,
    })
      .sort({ createdAt: 1 })
      .limit(limit);

    res.status(200).send({
      posts: [], //activeMember
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({ posts: [], total: error });
  }
});
router.post("/filterUserActiveMemberWeb", async (req, res) => {
  try {
    let filterData;

    let post = await Subdomain.findOne(
      { nepname: req.body.district },
      { _id: 0, address: 1 }
    );
    if (!post) {
      post = await Subdomain.findOne({ address: req.body.district });
    }

    filterData = Object.assign(req.body, {
      status: {
        $ne: false,
      },
      membername: {
        $ne: " ",
      },
      maindistrict: post.address,
    });

    limit = 1000;
    // console.log(filterData)

    delete filterData.limit;
    delete filterData.district;
    let activeMember = await Circular.find(filterData, {
      membername: 1,
      _id: 0,
      gender: 1,
    })
      .sort({ createdAt: 1 })
      .limit(limit);

    res.status(200).send({
      posts: activeMember, //activeMember
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({ posts: [], total: error });
  }
});

router.get("/subdomainsubmitted", async (req, res) => {
  try {
    const reportSubmited = await ActiveMemberSubmit.distinct("subdomain");
    let allData = [];

    reportSubmited.forEach((ele) => {
      allData.push({ userHandle: ele });
    });

    let sub = await Subdomain.find(
      {
        $or: [{ category: "Nepali Congress District Working Committee" }],

        showPublic: true,
      },
      {
        province: 1,
        district: 1,
        _id: 0,
        parentSubdomain: 1,
        city: 1,
        nepname: 1,
        name: 1,
        userHandle: 1,
      }
    );

    return await res.status(200).send({
      message: "List of subdomain submitted report",
      results: sub,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
});

router.get("/allsubdomainsubmitted", verifyadmin, async (req, res) => {
  try {
    const reportSubmited = await ActiveMemberSubmit.aggregate([
      {
        $group: {
          _id: "$subdomain",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          place: "$_id",
          count: "$count",
          submittedby: 1,
          _id: 0,
        },
      },
    ]);

    return res.status(200).send({
      message: "List of final submission",
      results: reportSubmited,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
});

router.get("/changeStatus", verifyadmin, async (req, res) => {
  try {
    const subdomain = await Subdomain.findById(req.user._id);
    const reportSubmited = await ActiveMemberSubmit.find({
      subdomain: subdomain.userHandle,
    });

    return res.status(200).send(reportSubmited[0] != undefined);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
});

router.get("/getMenuStatusActive", verifyadmin, async (req, res) => {
  try {
    const subdomain = await Subdomain.findById(req.user._id);
    if (subdomain) {
      const reportSubmited = await ActiveMemberSubmit.find({
        subdomain: subdomain.userHandle,
      });
    }

    return res.status(200).send(reportSubmited[0] != undefined);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
});

function totalAgeFunction(allage) {
  let age1 = [];
  let age7 = [];
  let age2 = [];
  let age3 = [];
  let age4 = [];
  let age5 = [];
  let age6 = [];

  allage.forEach((ele) => {
    if (parseInt(ele.title) > 16 && parseInt(ele.title) < 25) {
      age1.push(parseInt(ele.count));
    }
    if (parseInt(ele.title) >= 16 && parseInt(ele.title) <= 50) {
      age7.push(parseInt(ele.count));
    }
    if (parseInt(ele.title) > 26 && parseInt(ele.title) < 40) {
      age2.push(parseInt(ele.count));
    }
    if (parseInt(ele.title) > 16 && parseInt(ele.title) <= 30) {
      age6.push(parseInt(ele.count));
    }
    if (parseInt(ele.title) > 41 && parseInt(ele.title) < 60) {
      age3.push(parseInt(ele.count));
    }
    if (parseInt(ele.title) > 61 && parseInt(ele.title) < 75) {
      age4.push(parseInt(ele.count));
    }
    if (parseInt(ele.title) < 100) {
      age5.push(parseInt(ele.count));
    }
  });

  age1 = age1.reduce((a, b) => a + b, 0);
  age2 = age2.reduce((a, b) => a + b, 0);
  age3 = age3.reduce((a, b) => a + b, 0);
  age4 = age4.reduce((a, b) => a + b, 0);
  age5 = age5.reduce((a, b) => a + b, 0);
  age6 = age6.reduce((a, b) => a + b, 0);
  age7 = age7.reduce((a, b) => a + b, 0);

  totalage = [
    { title: "16-25 age", count: age1 },
    { title: "26-40 age", count: age2 },
    { title: "16-30 age", count: age6 },
    { title: "41-60 age", count: age3 },
    { title: "61-75 age", count: age4 },
    { title: "75-Above age", count: age5 },
    { title: "Below 50", count: age7 },
  ];

  return totalage;
}

router.post("/getNumberList", verifyadmin, async (req, res) => {
  try {
    const circularWithPhone = await Circular.find({
      status: {
        $ne: false,
      },
      membername: {
        $ne: " ",
      },
      $expr: {
        $and: [
          {
            $gt: [
              {
                $strLenCP: "$phone",
              },
              9,
            ],
          },
          {
            $lt: [
              {
                $strLenCP: "$phone",
              },
              11,
            ],
          },
        ],
      },
    })
      .skip(req.body.limit * (req.body.skip - 1))
      .limit(req.body.limit);

    const circularWithOutPhone = await Circular.find({
      status: {
        $ne: false,
      },
      membername: {
        $ne: " ",
      },
      $expr: {
        $lt: [
          {
            $strLenCP: "$phone",
          },
          9,
        ],
      },
    })
      .skip(req.body.limit * (req.body.skip - 1))
      .limit(req.body.limit);

    res.status(200).send({
      resultwithphone: circularWithPhone,
      resultwithoutphone: circularWithOutPhone,
    });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
});

router.get("/getNumberList", verifyadmin, async (req, res) => {
  try {
    const circularWithPhoneTotal = await Circular.find({
      status: {
        $ne: false,
      },
      $expr: {
        $and: [
          {
            $gt: [
              {
                $strLenCP: "$phone",
              },
              9,
            ],
          },
          {
            $lt: [
              {
                $strLenCP: "$phone",
              },
              11,
            ],
          },
        ],
      },
    }).countDocuments();

    const circularWithOutPhoneTotal = await Circular.find({
      status: {
        $ne: false,
      },
      membername: {
        $ne: " ",
      },
      $expr: {
        $lt: [
          {
            $strLenCP: "$phone",
          },
          9,
        ],
      },
    }).countDocuments();

    res.status(200).send({
      totalWithPhone: circularWithPhoneTotal,
      totalWithoutPhone: circularWithOutPhoneTotal,
    });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
});

// single circular id
router.put("/delete/:id", verifySubdomain, async (req, res) => {
  const allPosts = await Circular.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        status: false,
        deleteduserName: req.user.username,
        deletedAt: Date.now(),
      },
    }
  );
  if (!allPosts)
    res.status(404).send({ message: "Circular or Is Deactivated" });
  if (allPosts) await res.status(200).send({ post: allPosts });
});

router.put("/deletemultiple", verifyadmin, async (req, res) => {
  let ids = { $or: [] };

  req.body.activememeberid.forEach((ele) => {
    ids.$or.push({ workingformnumber: ele });
  });

  const allPosts = await Circular.updateMany(ids, {
    $set: {
      status: false,
      deleteduserName: req.user.userHandle,
      deletedAt: Date.now(),
    },
  });
  if (!allPosts)
    res.status(404).send({ message: "Circular or Is Deactivated" });
  if (allPosts) await res.status(200).send({ post: allPosts });
});

router.get("/getProviceData/:subdomain", async (req, res) => {
  try {
    const subdomain = await Subdomain.findOne(
      { userHandle: req.params.subdomain },
      {
        province: 1,
        district: 1,
        _id: 0,
        parentSubdomain: 1,
        city: 1,
        nepname: 1,
      }
    );
    return res
      .status(200)
      .send({ message: "Subdomain Profile", results: subdomain });
  } catch (error) {
    console.log(error);
    return res.status(200).send({ message: "Something went wrong!" });
  }
});

let conditionCheck = {
  status: { $nin: [false] },
  // gender: { $nin: [null] },
  // membername: { $nin: [""] },
  municipality: { $nin: [null] },
  region: {
    $in: ["1", "2", "3", "4", "5", "6", "7"],
  },
};

router.get("/provinceanalysis", verifyadmin, async (req, res) => {
  try {
    let allDistrict = await Circular.aggregate([
      {
        $match: conditionCheck,
      },
      {
        $group: {
          _id: "$region",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          title: "$_id",
          count: "$count",
          _id: 0,
        },
      },
    ]).sort({ title: 1 });
    res.status(200).send({
      message: "Provice Count",
      allmember: allDistrict,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.post("/districtanalysis", verifyadmin, async (req, res) => {
  try {
    let allDistrict = await Circular.aggregate([
      {
        $match: {
          ...conditionCheck,
          region: req.body.region,
        },
      },
      {
        $group: {
          _id: "$maindistrict",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          title: "$_id",
          count: "$count",
          _id: 0,
        },
      },
    ]).sort({ count: -1 });

    res.status(200).send({
      message: "District Count",
      allmember: allDistrict,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.post("/houseofrepresentativeanalysis", verifyadmin, async (req, res) => {
  try {
    let allDistrict = await Circular.aggregate([
      {
        $match: {
          ...conditionCheck,
          maindistrict: req.body.maindistrict,
        },
      },
      {
        $group: {
          _id: "$houseofrepresentative",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          title: "$_id",
          count: "$count",
          _id: 0,
        },
      },
    ]);

    res.status(200).send({
      message: "House of Representative Count",
      allmember: allDistrict,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.post(
  "/pradeshassemblyconstituencyanalysis",
  verifyadmin,
  async (req, res) => {
    try {
      let allDistrict = await Circular.aggregate([
        {
          $match: {
            ...conditionCheck,
            ...req.body,
          },
        },
        {
          $group: {
            _id: "$pradeshassemblyconstituency",
            count: {
              $sum: 1,
            },
          },
        },
        {
          $project: {
            title: "$_id",
            count: "$count",
            _id: 0,
          },
        },
      ]);

      res.status(200).send({
        message: "Pradesh Assembly Constityency Count",
        allmember: allDistrict,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

router.post("/municipalityanalysis", verifyadmin, async (req, res) => {
  try {
    let allDistrict = await Circular.aggregate([
      {
        $match: {
          ...conditionCheck,
          ...req.body,
        },
      },
      {
        $group: {
          _id: "$municipality",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          title: "$_id",
          count: "$count",
          _id: 0,
        },
      },
    ]);

    res.status(200).send({
      message: "Municipality Count",
      allmember: allDistrict,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.post("/wardanalysis", verifyadmin, async (req, res) => {
  try {
    let allDistrict = await Circular.aggregate([
      {
        $match: {
          ...conditionCheck,
          ...req.body,
        },
      },
      {
        $group: {
          _id: "$wardno",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          title: "$_id",
          count: "$count",
          _id: 0,
        },
      },
    ]);

    res.status(200).send({
      message: "Ward Count",
      allmember: allDistrict,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.put("/updateByAdmin", verifyadmin, async (req, res) => {
  let post = await Circular.findOne({ _id: req.body.id });
  if (!post) res.status(404).send({ message: "Circular Didn't not found" });

  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  let updateData = {
    membername: req.body.membername,
    formNumber: req.body.formNumber,
    workingformnumberold: req.body.workingformnumberold,
    fathermothername: req.body.fathermothername,
    husbandwifename: req.body.husbandwifename,
    age: req.body.age,
    profession: req.body.profession,
    gender: req.body.gender,
    region: req.body.region,
    district: req.body.district,
    houseofrepresentative: req.body.houseofrepresentative,
    pradeshassemblyconstituency: req.body.pradeshassemblyconstituency,
    municipality: req.body.municipality,
    wardno: req.body.wardno,
    inclusivegroup: req.body.inclusivegroup,
    froRconstituencyNo: req.body.froRconstituencyNo,
    savikmunicipality: req.body.savikmunicipality,
    savikwardno: req.body.savikwardno,
    phone: req.body.phone,
    email: req.body.email,
    kaifiyat: req.body.kaifiyat,
    images: req.body.images,
    maindistrict: req.body.maindistrict,
    updateduserName: user.userHandle,
    updateAt: Date.now(),
    sort: req.body.sort != undefined ? req.body.sort : 0,
  };

  if (req.body.removedImage.length != 0) {
    req.body.removedImage.forEach((ele) => {
      if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
        fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
      }
    });
  }

  await Circular.updateOne(
    {
      _id: req.body.id,
    },
    {
      $set: {
        ...updateData,
      },
    }
  );

  try {
    if (user.optionAction) {
      await post.save();
      res.status(200).send({ message: "Your Circular Has Been Updated" });
    } else {
      res
        .status(200)
        .send({ message: "You cannot update data now the time has been gone" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/reportGenerationTree", verifyadmin, async (req, res) => {
  try {
    let filterCheck = {};
    if (req.body.province != undefined) {
      filterCheck.region = req.body.province;
    }
    if (req.body.maindistrict != undefined) {
      filterCheck.maindistrict = req.body.maindistrict;
    }
    if (req.body.houseofrepresentative != undefined) {
      filterCheck.houseofrepresentative = req.body.houseofrepresentative;
    }
    if (req.body.municipality != undefined) {
      filterCheck.municipality = req.body.municipality;
    }
    if (req.body.wardno != undefined) {
      filterCheck.wardno = req.body.wardno;
    }
    if (req.body.pradeshassemblyconstituency != undefined) {
      filterCheck.pradeshassemblyconstituency =
        req.body.pradeshassemblyconstituency;
    }

    let filterData;
    filterData = {
      ...conditionCheck,
      ...filterCheck,
    };

    try {
      console.log(filterData);
      let allInclusive = await Circular.aggregate([
        {
          $match: filterData,
        },
        {
          $group: {
            _id: "$inclusivegroup",
            count: {
              $sum: 1,
            },
          },
        },
        {
          $project: {
            title: "$_id",
            count: "$count",
            _id: 0,
          },
        },
      ]);

      let allActiveMemberDistrict = await Circular.aggregate([
        {
          $match: filterData,
        },
        {
          $group: {
            _id: "$memberType",
            count: {
              $sum: 1,
            },
          },
        },
        {
          $project: {
            title: "$_id",
            count: "$count",
            _id: 0,
          },
        },
      ]);

      let allActiveMemberGenderDistrict = await Circular.aggregate([
        {
          $match: filterData,
        },
        {
          $group: {
            _id: "$gender",
            count: {
              $sum: 1,
            },
          },
        },
        {
          $project: {
            title: "$_id",
            count: "$count",
            _id: 0,
          },
        },
      ]);

      let allActiveMemberAgeDistrict = await Circular.aggregate([
        {
          $match: filterData,
        },
        {
          $group: {
            _id: "$age",
            count: {
              $sum: 1,
            },
          },
        },
        {
          $project: {
            title: "$_id",
            count: "$count",
            _id: 0,
          },
        },
      ]);

      let allActiveMemberProfessionDistrict = await Circular.aggregate([
        {
          $match: filterData,
        },
        {
          $group: {
            _id: "$profession",
            count: {
              $sum: 1,
            },
          },
        },
        {
          $project: {
            title: "$_id",
            count: "$count",
            _id: 0,
          },
        },
      ])
        .limit(20)
        .sort({ count: -1 });

      let allActiveMemberTopAgeDistrict = await Circular.aggregate([
        {
          $match: {
            ...filterData,
            $or: [{ age: { $gte: "16" } }, { age: { $lte: "100" } }],
          },
        },
        {
          $group: {
            _id: "$age",
            count: {
              $sum: 1,
            },
          },
        },
        {
          $project: {
            title: "$_id",
            count: "$count",
            _id: 0,
          },
        },
      ])
        .limit(5)
        .sort({ count: -1 });

      res.status(200).send({
        total: allActiveMemberDistrict,
        totalGender: allActiveMemberGenderDistrict,
        totalAge: totalAgeFunction(allActiveMemberAgeDistrict),
        totalProfession: allActiveMemberProfessionDistrict,
        topTwentyAge: allActiveMemberTopAgeDistrict,
        allInclusive: allInclusive,
      });
    } catch (error) {
      console.log(error);
      res.status(404).send({ posts: [], total: error });
    }
  } catch (error) {}
});
router.get("/maindistrict", verifyToken, async (req, res) => {
  try {
    const maindistrict = await Circular.distinct("maindistrict");
    return res
      .status(200)
      .send({ message: "List of district", results: maindistrict });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});
router.post("/municipality", verifyToken, async (req, res) => {
  try {
    const maindistrict = await Circular.distinct("municipality", {
      maindistrict: req.body.maindistrict,
    });
    return res
      .status(200)
      .send({ message: "List of municipality", results: maindistrict });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

router.post("/checkTheLimit", verifyadmin, async (req, res) => {
  try {
    let filterCheck = {};

    if (req.body.maindistrict != undefined) {
      filterCheck.maindistrict = req.body.maindistrict;
    }
    if (req.body.municipality != undefined) {
      filterCheck.municipality = req.body.municipality;
    }

    let filterData;
    filterData = {
      ...conditionCheck,
      ...filterCheck,
    };

    try {
      let allWardData = await Circular.aggregate([
        {
          $match: filterData,
        },
        {
          $group: {
            _id: {
              ward: "$wardno",
              muncipality: "$municipality",
              maindistrict: "$maindistrict",
            },

            count: {
              $sum: 1,
            },
          },
        },

        {
          $project: {
            wardno: "$_id",
            count: "$count",

            _id: 0,
          },
        },
        {
          $match: {
            count: { $lte: parseInt(req.body.limit) },
          },
        },
        {
          $match: {
            count: { $gte: parseInt(req.body.limitGreater) },
          },
        },
      ]);

      res.status(200).send({
        results: allWardData,
      });
    } catch (error) {
      console.log(error);
      res.status(404).send({ posts: [], total: error });
    }
  } catch (error) {}
});

router.post("/checkTheLimitAll", verifyadmin, async (req, res) => {
  try {
    let filterCheck = {};

    let filterData;
    filterData = {
      ...conditionCheck,
      ...filterCheck,
    };

    try {
      let allWardData = await Circular.aggregate([
        {
          $match: filterData,
        },
        {
          $group: {
            _id: {
              ward: "$wardno",
              muncipality: "$municipality",
              maindistrict: "$maindistrict",
            },

            count: {
              $sum: 1,
            },
          },
        },

        {
          $project: {
            wardno: "$_id",
            count: "$count",

            _id: 0,
          },
        },
        {
          $match: {
            count: { $lte: parseInt(req.body.limit) },
          },
        },
        {
          $match: {
            count: { $gte: parseInt(req.body.limitGreater) },
          },
        },
      ]);

      res.status(200).send({
        results: allWardData,
      });
    } catch (error) {
      console.log(error);
      res.status(404).send({ posts: [], total: error });
    }
  } catch (error) {}
});

router.get("/single/:id", verifyToken, async (req, res) => {
  try {
    const circular = await Circular.findById(req.params.id);
    return res.status(200).send({ message: "Circular", results: circular });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

router.put("/updateCircular", verifyToken, async (req, res) => {
  try {
    const circular = await Circular.findOne({ _id: req.body._id });
    if (!circular)
      return res.status(400).send({ message: "No circular found" });

    let data = {};
    if (req.body.fathermothername) {
      data.fathermothername = req.body.fathermothername;
    }
    if (req.body.husbandwifename) {
      data.husbandwifename = req.body.husbandwifename;
    }
    if (req.body.age) {
      data.age = req.body.age;
    }
    if (req.body.email) {
      data.email = req.body.email;
    }
    if (req.body.phone) {
      data.phone = req.body.phone;
    }
    if (req.body.tole) {
      data.tole = req.body.tole;
    }
    if (req.body.occupation) {
      data.occupation = req.body.occupation;
    }

    if (req.body.nationalId) {
      data.nationalId = req.body.nationalId;
    }
    if (req.files != undefined) {
      if (req.files.nationalFile != undefined) {
        await mediaUpload(
          req.files.nationalFile,
          "nationalFile",
          circular._id,
          "image"
        );
      }
      if (req.files.image != undefined) {
        await mediaUpload(req.files.image, "image", circular._id, "image");
      }
    }
    await Circular.updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: data,
      }
    );

    return res.status(200).send({ message: "Circular", results: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

router.post("/dateOfIssue", verifyToken, async (req, res) => {
  if (req.body.district != undefined) {
    let filterData;
    let post = await Subdomain.findOne({ nepname: req.body.district });
    filterData = Object.assign(
      req.body,
      {
        status: {
          $ne: false,
        },
        membername: {
          $ne: " ",
        },
        maindistrict: post.address,
      },
      {
        country: {
          $ne: "",
        },
      }
    );

    delete filterData.limit;
    delete filterData.skip;

    try {
      delete filterData.province;
      delete filterData.district;

      await Circular.updateMany(
        { ...filterData, dateOfIssue: { $exists: false } },
        {
          $set: { dateOfIssue: new Date() },
        }
      );

      return res.status(200).send({
        results: "Date of issue updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "Something went wrong!" });
    }
  } else {
    res.status(200).send({ posts: [], total: 0 });
  }
});

router.post(
  "/sendOTP",
  withErrorHandling(async (req, res) => {
    // First check if the record exists with the provided phone number
    let circular = await Circular.findOne({
      phone: req.body.phone,
    });

    if (!circular) {
      return res.status(404).send({
        message: "Record not found with the provided phone number",
      });
    }

    // Validate if it's a Nepali phone number
    if (
      !req.body.phone ||
      req.body.phone.length !== 10 ||
      !(req.body.phone.startsWith("97") || req.body.phone.startsWith("98"))
    ) {
      return res.status(400).send({
        message:
          "Invalid phone number. Please provide a valid 10-digit Nepali phone number.",
      });
    }

    // Generate new OTP
    const newOTP = Math.floor(1000 + Math.random() * 9000);

    // Update the OTP in the database
    await Circular.updateOne(
      { phone: req.body.phone },
      { $set: { otp: newOTP } }
    );

    // Send SMS
    const response = await axios.post("https://sms.aakashsms.com/sms/v3/send", {
      auth_token: process.env.SMS_AUTH_TOKEN,
      to: `${req.body.phone}`,
      text: `Login OTP Nepali Congress : ${newOTP}`,
    });

    if (response.status == 200) {
      return res.status(200).send({
        message: `OTP code has been sent to your phone number ${req.body.phone}`,
      });
    } else {
      return res.status(500).send({
        message: "Failed to send OTP. Please try again.",
      });
    }
  })
);

router.post("/sendOTPByWorkingForm", async (req, res) => {
  try {
    const { workingformnumber, phone } = req.body;

    // Check if at least one parameter is provided
    if (!workingformnumber && !phone) {
      return res.status(400).send({
        message: "Please provide either workingformnumber or phone number",
      });
    }

    // Build the query based on provided parameters
    const query = {};
    if (workingformnumber) query.workingformnumber = workingformnumber;

    // First check if the record exists with the provided parameters
    let circular = await Circular.findOne(query);

    if (circular.phone) {
      //check the number lenght and also check if it starts with 97 or 98 or 96
      if (
        circular.phone.length !== 10 ||
        !(
          circular.phone.startsWith("97") ||
          circular.phone.startsWith("98") ||
          circular.phone.startsWith("96")
        )
      ) {
        return res.status(400).send({
          message:
            "Invalid phone number in our records. Please contact support.",
        });
      }
    }

    if (!circular) {
      return res.status(404).send({
        message: "Record not found with the provided details",
      });
    }

    // Use the phone from the database record if it exists
    const phoneToUse = phone;

    // Validate if it's a Nepali phone number
    if (
      !phoneToUse ||
      phoneToUse.length !== 10 ||
      !(
        phoneToUse.startsWith("97") ||
        phoneToUse.startsWith("98") ||
        phoneToUse.startsWith("96")
      )
    ) {
      return res.status(400).send({
        message: "Invalid phone number in our records. Please contact support.",
      });
    }

    // Generate new OTP
    const newOTP = Math.floor(1000 + Math.random() * 9000);

    // Update the OTP in the database
    await Circular.updateOne({ _id: circular._id }, { $set: { otp: newOTP } });

    // Send SMS
    try {
      const response = await axios.post(
        "https://sms.aakashsms.com/sms/v3/send",
        {
          auth_token: process.env.SMS_AUTH_TOKEN,
          to: phoneToUse,
          text: `Login OTP Nepali Congress : ${newOTP}`,
        }
      );

      if (response.status == 200) {
        return res.status(200).send({
          message: `OTP code has been sent to your phone number ${phoneToUse}`,
          success: true,
        });
      } else {
        return res.status(500).send({
          message: "Failed to send OTP. Please try again.",
          success: false,
        });
      }
    } catch (smsError) {
      return res.status(500).send({
        message: "SMS service error. Please try again later.",
        error: smsError.message,
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Server error occurred",
      error: error.message,
      success: false,
    });
  }
});

router.post("/getProfile", async (req, res) => {
  try {
    // Check if the required fields are provided
    if (!req.body.phone || !req.body.otp) {
      return res.status(400).send({
        message: "Working form number, phone number and OTP are required",
      });
    }

    // Find the circular with matching workingformnumber
    let circular = await Circular.findOne({
      phone: req.body.phone,
    });

    if (!circular) {
      circular = await Circular.updateOne(
        { workingformnumber: req.body.workingformnumber },
        { $set: { phone: req.body.phone } }
      );
      circular = await Circular.findOne({
        phone: req.body.phone,
      });
      if (!circular) {
        return res.status(404).send({
          message: "No record found with the provided working form number",
        });
      }
    }

    // Verify that both phone and OTP match
    if (circular.otp === parseInt(req.body.otp)) {
      const baseUrl = "https://api.nepalicongress.org";

      // Get subdomain information
      let subdomainObj = null;
      if (circular.district) {
        subdomainObj = await Subdomain.findOne({
          nepname: { $regex: circular.district },
        });
      }

      // Create QR code URL
      const qrCodeUrl = `${baseUrl}/v1/qrcode/code/${circular.workingformnumber.replace(
        "/",
        "_"
      )}`;

      // Get signatures
      const signatures = await getSignatures(
        baseUrl,
        circular.region,
        circular.district
      );

      // Prepare full address
      const fullAddress =
        subdomainObj &&
        subdomainObj.category === "Nepalese People's Co-ordination Committee"
          ? subdomainObj.nepname
          : circular.fullAddress;

      // Gather additional data similar to filterCircularAdminCard
      let additionalData = {};

      // Get active member stats if available
      if (circular.district) {
        const filterData = {
          status: { $ne: false },
          membername: { $ne: " " },
          country: { $ne: "" },
        };

        if (subdomainObj) {
          filterData.maindistrict = {
            $regex: "^" + subdomainObj.address,
            $options: "i",
          };
        }

        const activeMemberCount = await Circular.countDocuments(filterData);
        additionalData.memberStats = {
          activeMemberCount: activeMemberCount,
        };
      }

      // Prepare the enhanced response with all data
      const enhancedCircular = {
        ...circular._doc,
        qrCodeUrl: qrCodeUrl,
        fullAddress: fullAddress,
        signatures: signatures,
        subdomainInfo: subdomainObj
          ? {
              category: subdomainObj.category,
              nepname: subdomainObj.nepname,
              address: subdomainObj.address,
            }
          : null,
        ...additionalData,
      };

      return res.status(200).send({
        message: "Profile retrieved successfully",
        results: enhancedCircular,
      });
    } else {
      return res.status(401).send({
        message: "Authentication failed. Invalid phone number or OTP.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Server error occurred",
      error: error.message,
    });
  }
});

router.post("/sendInquiry", async (req, res) => {
  try {
    const { phone, presidentPhone } = req.body;
    const checkPhone = await ActiveMemberPhoneInquiry.findOne({
      phone: phone,
    });
    if (checkPhone)
      return res.status(200).send({ message: "Inquiry sent successfully" });

    const activememberphoneinquiry = new ActiveMemberPhoneInquiry({
      phone: phone,
      presidentPhone: presidentPhone,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    await activememberphoneinquiry.save();
    return res.status(200).send({
      message: "Inquiry sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Server error occurred",
    });
  }
});

router.put("/updateByUser", async (req, res) => {
  try {
    let circular = await Circular.findOne({ phone: req.body.phone });
    if (!circular)
      return res.status(404).send({ message: "Circular Not Found" });

    if (req.files) {
      await mediaUpload(req.files.image, "activemember", circular._id, "image");
    }

    const medias = await Medias.findOne({
      assignedTo: circular._id,
      type: "image",
    }).sort({ createdAt: -1 });

    if (medias) {
      await Circular.updateOne(
        { phone: req.body.phone },
        { $set: { ...req.body, images: [{ fileUrl: medias.fileLocation }] } }
      );
    } else {
      await Circular.updateOne(
        { phone: req.body.phone },
        { $set: { ...req.body } }
      );
    }

    circular = await Circular.findOne({ phone: req.body.phone });

    const baseUrl = "https://api.nepalicongress.org";

    // Get subdomain information
    let subdomainObj = null;
    if (circular.district) {
      subdomainObj = await Subdomain.findOne({
        nepname: { $regex: circular.district },
      });
    }

    // Create QR code URL
    const qrCodeUrl = `${baseUrl}/v1/qrcode/code/${circular.workingformnumber.replace(
      "/",
      "_"
    )}`;

    // Get signatures
    const signatures = await getSignatures(
      baseUrl,
      circular.region,
      circular.district
    );

    // Prepare full address
    const fullAddress =
      subdomainObj &&
      subdomainObj.category === "Nepalese People's Co-ordination Committee"
        ? subdomainObj.nepname
        : circular.fullAddress;

    // Gather additional data similar to filterCircularAdminCard
    let additionalData = {};

    // Get active member stats if available
    if (circular.district) {
      const filterData = {
        status: { $ne: false },
        membername: { $ne: " " },
        country: { $ne: "" },
      };

      if (subdomainObj) {
        filterData.maindistrict = {
          $regex: "^" + subdomainObj.address,
          $options: "i",
        };
      }

      const activeMemberCount = await Circular.countDocuments(filterData);
      additionalData.memberStats = {
        activeMemberCount: activeMemberCount,
      };
    }

    // Prepare the enhanced response with all data
    const enhancedCircular = {
      ...circular._doc,
      qrCodeUrl: qrCodeUrl,
      fullAddress: fullAddress,
      signatures: signatures,
      subdomainInfo: subdomainObj
        ? {
            category: subdomainObj.category,
            nepname: subdomainObj.nepname,
            address: subdomainObj.address,
          }
        : null,
      ...additionalData,
    };

    return res.status(200).send({
      message: "Circular updated successfully",
      results: enhancedCircular,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Server error occurred",
      error: error.message,
    });
  }
});

// Helper function to get signatures
async function getSignatures(baseUrl, province, district) {
  try {
    // Get signature 1 (national level)
    const signature1 = await Signature.findOne({
      $and: [
        { province: { $exists: false } },
        { district: { $exists: false } },
      ],
    });
    const sign1 =
      signature1 && (await Medias.findOne({ assignedTo: signature1._id }));

    // Get signature 2 (province level)
    const signature2 = province
      ? await Signature.findOne({
          $and: [{ province: province }, { district: { $exists: false } }],
        })
      : null;
    console.log(province, district);
    const sign2 =
      signature2 && (await Medias.findOne({ assignedTo: signature2._id }));

    // Get signature 3 (district level)
    const signature3 =
      province && district
        ? await Signature.findOne({
            $and: [{ province: province }, { district: district }],
          })
        : null;
    const sign3 =
      signature3 && (await Medias.findOne({ assignedTo: signature3._id }));

    return {
      signature1: sign1 && `${baseUrl}${sign1.fileLocation}`,
      signature2: sign2 && `${baseUrl}${sign2.fileLocation}`,
      signature3: sign3 && `${baseUrl}${sign3.fileLocation}`,
    };
  } catch (error) {
    console.log("Error fetching signatures:", error);
    return {
      signature1: null,
      signature2: null,
      signature3: null,
    };
  }
}

router.get("/getProfileToken", verifyadmin, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    const circularSingle = await Circular.findOne({
      phone: user.phone,
    });

    // Find the circular with matching workingformnumber
    const circular = await Circular.findOne({
      workingformnumber: circularSingle.workingformnumber,
    });

    // Check if circular exists
    if (!circular) {
      return res.status(404).send({
        message: "No record found with the provided working form number",
      });
    }

    // Verify that both phone and OTP match

    const baseUrl = "https://api.nepalicongress.org";

    // Get subdomain information
    let subdomainObj = null;
    if (circular.district) {
      subdomainObj = await Subdomain.findOne({
        nepname: { $regex: circular.district },
      });
    }

    // Create QR code URL
    const qrCodeUrl = `${baseUrl}/v1/qrcode/code/${circular.workingformnumber.replace(
      "/",
      "_"
    )}`;

    // Get signatures
    const signatures = await getSignatures(
      baseUrl,
      circular.region,
      circular.district
    );

    // Prepare full address
    const fullAddress =
      subdomainObj &&
      subdomainObj.category === "Nepalese People's Co-ordination Committee"
        ? subdomainObj.nepname
        : circular.fullAddress;

    // Gather additional data similar to filterCircularAdminCard
    let additionalData = {};

    // Get active member stats if available
    if (circular.district) {
      const filterData = {
        status: { $ne: false },
        membername: { $ne: " " },
        country: { $ne: "" },
      };

      if (subdomainObj) {
        filterData.maindistrict = {
          $regex: "^" + subdomainObj.address,
          $options: "i",
        };
      }

      const activeMemberCount = await Circular.countDocuments(filterData);
      additionalData.memberStats = {
        activeMemberCount: activeMemberCount,
      };
    }

    // Prepare the enhanced response with all data
    const enhancedCircular = {
      ...circular._doc,
      qrCodeUrl: qrCodeUrl,
      fullAddress: fullAddress,
      signatures: signatures,
      subdomainInfo: subdomainObj
        ? {
            category: subdomainObj.category,
            nepname: subdomainObj.nepname,
            address: subdomainObj.address,
          }
        : null,
      ...additionalData,
    };

    return res.status(200).send({
      message: "Profile retrieved successfully",
      results: enhancedCircular,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Server error occurred",
      error: error.message,
    });
  }
});

async function exportDataToCSV() {
  try {
    // Create export directory if it doesn't exist
    const exportDir = path.join(__dirname, "..", "export");
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir);
    }

    const batchSize = 20000;
    let skip = 0;
    let batchNumber = 1;
    let hasMoreData = true;

    // Filter criteria
    const filterData = {
      status: { $ne: false },
      membername: { $ne: " " },
    };

    // Get total count first
    const totalRecords = await Circular.countDocuments(filterData);
    const totalBatches = Math.ceil(totalRecords / batchSize);
    console.log(`Total records to export: ${totalRecords}`);
    console.log(`Total batches to process: ${totalBatches}`);

    const json2csvParser = new Parser({ fields });

    while (hasMoreData) {
      // Get batch of data with allowDiskUse option
      const data = await Circular.find(filterData)
        .sort({ createdAt: 1 })
        .skip(skip)
        .limit(batchSize)
        .lean()
        .allowDiskUse(true);

      if (data.length === 0) {
        hasMoreData = false;
        continue;
      }

      // Remap the data
      const remappedData = remapData(data);

      // Convert to CSV
      const csv = json2csvParser.parse(remappedData);

      // Save to file
      const filename = `export_batch_${batchNumber}.csv`;
      const filepath = path.join(exportDir, filename);
      fs.writeFileSync(filepath, csv);

      const remainingBatches = totalBatches - batchNumber;
      console.log(
        `Exported batch ${batchNumber}/${totalBatches} with ${data.length} records`
      );
      console.log(`Remaining batches: ${remainingBatches}`);

      skip += batchSize;
      batchNumber++;
    }

    console.log("Export completed successfully");
    return true;
  } catch (error) {
    console.error("Error during export:", error);
    throw error;
  }
}

// Usage
// exportDataToCSV()
//     .then(() => console.log('Export process completed'))
//     .catch(error => console.error('Export process failed:', error));

module.exports = router;
