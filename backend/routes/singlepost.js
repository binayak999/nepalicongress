const router = require("express").Router();
const verify = require("../extra/verifyToken");
const Post = require("../model/Post");
const Event = require("../model/Event");
const Notice = require("../model/Notice");
const News = require("../model/News");
const History = require("../model/History");
const PressRelease = require("../model/PressRelease");
const RulesNRegulation = require("../model/RulesNRegulation");
const OurInspiration = require("../model/OurInspiration");
const PartyConstitution = require("../model/PartyConstitution");
const OnlineLibrary = require("../model/OnlineLibrary");
const Category = require("../model/Category");
const Subdomain = require("../model/Subdomain");
const User = require("../model/User");
const Documents = require("../model/Documents");
const PopPosts = require("../model/PopPosts");
const CircularDocument = require("../model/CircularDocument");
const President = require("../model/President");
const DateHistory = require("../model/DateHistory");
const e = require("cors");
const CalendarEvent = require("../model/CalendarEvent");
const globalpagination = require("../extra/globalpagination");

function addFullImageUrl(mixArray) {
  try {
    mixArray.forEach((ele) => {
      // let pageLink = `https://nepalicongress.org/single/${ele.category[0].slug}/${ele.slug}/?nohead=true`;
      let phoneLink = `/mobile/${ele.category[0].slug}/${ele.slug}`;
      // console.log(ele);

      if (ele.images != undefined && ele.images.length > 0) {
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
      if (ele.videos.length > 0 && ele.videos != undefined) {
        for (let i = 0; i < ele.videos.length; i++) {
          let main = ele.videos[i].fileUrl;
          let pre = "https://api.nepalicongress.org";
          let final = pre + main;
          ele.videos[i].fileUrl = final;
        }
      }
      ele.slug = phoneLink;
    });
  } catch (err) {
    console.log(err);
  }
}

function addFullImageUrlSingle(mixArray) {
  try {
    let pageLink = `https://nepalicongress.org/single/${mixArray.category[0].slug}/${mixArray.slug}`;
    let phoneLink = `/mobile/${mixArray.category[0].slug}-mobile/${mixArray.slug}`;
    let ext = "hey";
    // console.log(ele);

    if (mixArray.images != undefined && mixArray.images.length > 0) {
      for (let i = 0; i < mixArray.images.length; i++) {
        let main = mixArray.images[i].fileUrl;
        let pre = "https://api.nepalicongress.org";
        let final = pre + main;
        mixArray.images[i].fileUrl = final;
      }
    }
    if (mixArray.attachment.length > 0 && mixArray.attachment != undefined) {
      for (let i = 0; i < mixArray.attachment.length; i++) {
        let main = mixArray.attachment[i].fileUrl;
        let pre = "https://api.nepalicongress.org";
        let final = pre + main;
        mixArray.attachment[i].fileUrl = final;
      }
    }
    if (mixArray.videos.length > 0 && mixArray.videos != undefined) {
      for (let i = 0; i < mixArray.videos.length; i++) {
        let main = mixArray.videos[i].fileUrl;
        let pre = "https://api.nepalicongress.org";
        let final = pre + main;
        mixArray.videos[i].fileUrl = final;
      }
    }
    mixArray.slug = phoneLink;
    mixArray.externalContent = mixArray.externallink;
    mixArray.externallink = pageLink;
  } catch (error) {
    console.log(error);
  }
}

function pagination(mixArray, page) {
  const limit = 10;
  const total = parseInt(mixArray.length / limit);

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

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

//application
router.get("/appfirstpage", async (req, res) => {
  try {
    const news = await News.find({ status: true })
      .sort({ createdAt: -1 })
      .limit(10);
    const history = await History.find({ status: true })
      .sort({ createdAt: -1 })
      .limit(10);
    const notice = await Notice.find({ status: true })
      .sort({ createdAt: -1 })
      .limit(10);
    const documents = await Documents.find({ status: true })
      .sort({
        createdAt: -1,
      })
      .limit(10);
    const pressrelease = await PressRelease.find({ status: true })
      .sort({
        createdAt: -1,
      })
      .limit(20);

    let mixArray = Object.assign(
      news,
      history,
      pressrelease,
      notice,
      documents
    );

    addFullImageUrl(mixArray);
    shuffleArray(mixArray);
    let result = pagination(mixArray, parseInt(req.query.page));

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});

//app homepage
//banner
router.get("/app_banner", async (req, res) => {
  const allPosts = await Post.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  })
    .sort({ sort: 0 })
    .limit(5);
  addFullImageUrl(allPosts);
  res.status(200).send({ results: allPosts });
});
//banner
router.post("/app_calendar_events", async (req, res) => {
  try {
    const allPosts = await CalendarEvent.find({
      $and: [
        {
          "nep.timestamp": { $gte: req.body.startdate },
        },
        {
          "nep.timestamp": { $lte: req.body.enddate },
        },
        { status: true },
      ],
    });

    addFullImageUrl(allPosts);
    res.status(200).send(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});

//banner
router.get("/app_events", async (req, res) => {
  const allPosts = await Event.find({ status: true })
    .sort({ createdAt: -1 })
    .limit(5);
  addFullImageUrl(allPosts);
  res.status(200).send(allPosts);
});

//frontend
//pressrelease
router.get("/app_pressrelease/frontend", async (req, res) => {
  const allPosts = await PressRelease.find({ status: true }).sort({
    createdAt: -1,
  });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});

//posts
router.get("/app_posts/frontend", async (req, res) => {
  const allPosts = await Post.find({ status: true }).sort({ sort: 0 });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});

//popposts
router.get("/app_popposts/frontend", async (req, res) => {
  const allPosts = await PopPosts.find({ status: true }).sort({ sort: 0 });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});

//news
router.get("/app_news/frontend", async (req, res) => {
  const allPosts = await News.find({ status: true }).sort({ createdAt: -1 });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});

//historys
router.get("/app_history/frontend", async (req, res) => {
  const allPosts = await History.find({ status: true }).sort({ createdAt: -1 });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});

//events
router.get("/app_events/frontend", async (req, res) => {
  const allPosts = await Event.find({ status: true }).sort({ createdAt: -1 });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});

//notice
router.get("/app_notice/frontend", async (req, res) => {
  const allPosts = await Notice.find({ status: true }).sort({ createdAt: -1 });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});

//documents
router.get("/app_documents/frontend", async (req, res) => {
  const allPosts = await Documents.find({ status: true }).sort({
    createdAt: -1,
  });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});

//circulars
router.get("/app_circulardocument/frontend", async (req, res) => {
  const allPosts = await CircularDocument.find({ status: true }).sort({
    createdAt: -1,
  });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});

//ourinspiration
router.get("/app_ourinspiration/frontend", async (req, res) => {
  const allPosts = await OurInspiration.find({ status: true }).sort({
    createdAt: -1,
  });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});

//rulesandregulation
router.get("/app_rulesandregulation/frontend", async (req, res) => {
  const allPosts = await RulesNRegulation.find({ status: true }).sort({
    createdAt: -1,
  });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});
//pressrelease
router.get("/app_pressrelease/frontend", async (req, res) => {
  const allPosts = await PressRelease.find({ status: true }).sort({
    createdAt: -1,
  });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});

//partyconstitution
router.get("/app_partyconstitution/frontend", async (req, res) => {
  const allPosts = await PartyConstitution.find({ status: true }).sort({
    createdAt: -1,
  });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});
//onlinelibrary
router.get("/app_onlinelibrary/frontend", async (req, res) => {
  const allPosts = await OnlineLibrary.find({ status: true }).sort({
    createdAt: -1,
  });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});

//homepage
//posts
router.get("/app_posts/homepage", async (req, res) => {
  const allPosts = await Post.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  }).sort({ sort: 0 });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});

//popposts
router.get("/app_popposts/homepage", async (req, res) => {
  const allPosts = await PopPosts.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  }).sort({ sort: 0 });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});

//president
router.get("/app_president/homepage", async (req, res) => {
  const allPosts = await President.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  }).sort({ sort: 0 });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});

//datehistory
router.get("/app_datehistory/homepage", async (req, res) => {
  const allPosts = await DateHistory.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  }).sort({ sort: 0 });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});

//news
router.get("/app_news/homepage", async (req, res) => {
  const allPosts = await News.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  }).sort({ sort: 0 });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});

//historys
router.get("/app_history/homepage", async (req, res) => {
  const allPosts = await History.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  }).sort({ sort: 0 });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});

//events
router.get("/app_events/homepage", async (req, res) => {
  const allPosts = await Event.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  }).sort({ sort: 0 });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});

//notice
router.get("/app_notice/homepage", async (req, res) => {
  const allPosts = await Notice.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  }).sort({ sort: 0 });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});

//ourinspiration
router.get("/app_ourinspiration/homepage", async (req, res) => {
  const allPosts = await OurInspiration.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  }).sort({ sort: 0 });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});

//rulesandregulation
router.get("/app_rulesandregulation/homepage", async (req, res) => {
  const allPosts = await RulesNRegulation.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  }).sort({ sort: 0 });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});
//pressrelease
router.get("/app_pressrelease/homepage", async (req, res) => {
  const allPosts = await PressRelease.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  }).sort({ sort: 0 });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});
//documents
router.get("/app_documents/homepage", async (req, res) => {
  const allPosts = await Documents.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  }).sort({ sort: 0 });
  addFullImageUrl(allPosts);
  let result = pagination(allPosts, parseInt(req.query.page));
  res.status(200).send(result);
});

//backend admin
//posts
router.get("/posts", verify, async (req, res) => {
  // //userdata
  const user = await Subdomain.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const singleCategory = await Category.findOne({ slug: "posts" });
  const allPosts = await Post.find({
    "category.slug": singleCategory.slug,
    userHandle: user.userHandle,
  });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//popposts
router.get("/popposts", verify, async (req, res) => {
  // //userdata
  const user = await Subdomain.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const singleCategory = await Category.findOne({ slug: "popposts" });
  const allPosts = await PopPosts.find({
    "category.slug": singleCategory.slug,
    userHandle: user.userHandle,
  });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//news
router.get("/news", verify, async (req, res) => {
  // //userdata
  const user = await Subdomain.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });
  const singleCategory = await Category.findOne({ slug: "news" });
  const allPosts = await News.find({
    "category.slug": singleCategory.slug,
    userHandle: user.userHandle,
  });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//historys
router.get("/history", verify, async (req, res) => {
  // //userdata
  const user = await Subdomain.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });
  const singleCategory = await Category.findOne({ slug: "history" });
  const allPosts = await History.find({
    "category.slug": singleCategory.slug,
    userHandle: user.userHandle,
  });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//events
router.get("/events", verify, async (req, res) => {
  // //userdata
  const user = await Subdomain.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });
  const singleCategory = await Category.findOne({ slug: "events" });
  const allPosts = await Event.find({
    "category.slug": singleCategory.slug,
    userHandle: user.userHandle,
  });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//notice
router.get("/notice", verify, async (req, res) => {
  // //userdata
  const user = await Subdomain.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const singleCategory = await Category.findOne({ slug: "notice" });
  const allPosts = await Notice.find({
    "category.slug": singleCategory.slug,
    userHandle: user.userHandle,
  });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//ourinspiration
router.get("/ourinspiration", verify, async (req, res) => {
  // //userdata
  const user = await Subdomain.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const singleCategory = await Category.findOne({ slug: "our-inspiration" });
  const allPosts = await OurInspiration.find({
    "category.slug": singleCategory.slug,
    userHandle: user.userHandle,
  });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//rulesandregulation
router.get("/rulesandregulation", verify, async (req, res) => {
  // //userdata
  const user = await Subdomain.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const singleCategory = await Category.findOne({
    slug: "rules-and-regulations",
  });
  const allPosts = await RulesNRegulation.find({
    "category.slug": singleCategory.slug,
    userHandle: user.userHandle,
  });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//pressrelease
router.get("/pressrelease", verify, async (req, res) => {
  // //userdata
  const user = await Subdomain.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const singleCategory = await Category.findOne({ slug: "press-release" });
  const allPosts = await PressRelease.find({
    "category.slug": singleCategory.slug,
    userHandle: user.userHandle,
  });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//partyconstitution
router.get("/partyconstitution", verify, async (req, res) => {
  // //userdata
  const user = await Subdomain.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const singleCategory = await Category.findOne({ slug: "party-constitution" });
  const allPosts = await PartyConstitution.find({
    "category.slug": singleCategory.slug,
    userHandle: user.userHandle,
  });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//documents
router.get("/documents", verify, async (req, res) => {
  // //userdata
  const user = await Subdomain.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const singleCategory = await Category.findOne({ slug: "documents" });
  const allPosts = await Documents.find({
    "category.slug": singleCategory.slug,
    userHandle: user.userHandle,
  });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//onlinelibrary
router.get("/onlinelibrary", verify, async (req, res) => {
  // //userdata
  const user = await Subdomain.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const singleCategory = await Category.findOne({ slug: "online-library" });
  const allPosts = await OnlineLibrary.find({
    "category.slug": singleCategory.slug,
    userHandle: user.userHandle,
  });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//frontend
//posts
router.get("/posts/frontend", async (req, res) => {
  const singleCategory = await Category.findOne({ slug: "posts" });
  const allPosts = await Post.find({
    "category.slug": singleCategory.slug,
    status: true,
  }).sort({ sort: 0 });
  res.status(200).send({ posts: allPosts });
});

//popposts
router.get("/popposts/frontend", async (req, res) => {
  const singleCategory = await Category.findOne({ slug: "popposts" });
  const allPosts = await PopPosts.find({
    "category.slug": singleCategory.slug,
    status: true,
  }).sort({ sort: 0 });
  res.status(200).send({ posts: allPosts });
});

//news
router.get("/news/frontend", async (req, res) => {
  const singleCategory = await Category.findOne({ slug: "news" });
  const allPosts = await News.find({
    "category.slug": singleCategory.slug,
    status: true,
  }).sort({ createdAt: -1 });
  res.status(200).send({ posts: allPosts });
});

//historys
router.get("/history/frontend", async (req, res) => {
  const singleCategory = await Category.findOne({ slug: "history" });
  const allPosts = await History.find({
    "category.slug": singleCategory.slug,
    status: true,
  }).sort({ createdAt: -1 });
  res.status(200).send({ posts: allPosts });
});

//events
router.get("/events/frontend", async (req, res) => {
  const singleCategory = await Category.findOne({ slug: "events" });
  const allPosts = await Event.find({
    "category.slug": singleCategory.slug,
    status: true,
  }).sort({ createdAt: -1 });
  res.status(200).send({ posts: allPosts });
});

//notice
router.get("/notice/frontend", async (req, res) => {
  const singleCategory = await Category.findOne({ slug: "notice" });
  const allPosts = await Notice.find({
    "category.slug": singleCategory.slug,
    status: true,
  }).sort({ createdAt: -1 });
  res.status(200).send({ posts: allPosts });
});

//documents
router.get("/documents/frontend", async (req, res) => {
  const singleCategory = await Category.findOne({ slug: "documents" });

  const allPosts = await Documents.find({
    "category.slug": singleCategory.slug,
    status: true,
  }).sort({ createdAt: -1 });
  res.status(200).send({ posts: allPosts });
});

//circulars
router.get("/circulardocument/frontend", async (req, res) => {
  const singleCategory = await Category.findOne({ slug: "circulars" });

  const allPosts = await CircularDocument.find({
    "category.slug": singleCategory.slug,
    status: true,
  }).sort({ createdAt: -1 });
  res.status(200).send({ posts: allPosts });
});

//ourinspiration
router.get("/ourinspiration/frontend", async (req, res) => {
  const allPosts = await OurInspiration.find({
    status: true,
  }).sort({ createdAt: -1 });
  res.status(200).send({ posts: allPosts });
});

//rulesandregulation
router.get("/rulesandregulation/frontend", async (req, res) => {
  const allPosts = await RulesNRegulation.find({
    status: true,
  }).sort({ createdAt: -1 });
  res.status(200).send({ posts: allPosts });
});
//pressrelease
router.post("/pressrelease/frontend", async (req, res) => {
  try {
    const allPosts = await PressRelease.find({
      status: true,
    })
      .sort({ createdAt: -1 })
      .skip(req.body.skip - 1)
      .limit(req.body.limit);
    const total = await PressRelease.countDocuments();
    let e = globalpagination(total, req.body.skip, req.body.limit);
    return res.status(200).send({ posts: allPosts, pagination: e });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
});

//partyconstitution
router.get("/partyconstitution/frontend", async (req, res) => {
  const allPosts = await PartyConstitution.find({
    status: true,
  }).sort({ createdAt: -1 });
  res.status(200).send({ posts: allPosts });
});
//onlinelibrary
router.get("/onlinelibrary/frontend", async (req, res) => {
  const allPosts = await OnlineLibrary.find({
    status: true,
  }).sort({ createdAt: -1 });

  res.status(200).send({ posts: allPosts });
});

//homepage
//posts
router.get("/posts/homepage", async (req, res) => {
  const allPosts = await Post.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  }).sort({ sort: 0 });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//popposts
router.get("/popposts/homepage", async (req, res) => {
  const allPosts = await PopPosts.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  }).sort({ createdAt: -1 });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//president
router.get("/president/homepage", async (req, res) => {
  const allPosts = await President.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  }).sort({ createdAt: -1 });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//datehistory
router.get("/datehistory/homepage", async (req, res) => {
  const allPosts = await DateHistory.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  }).sort({ sort: 0 });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//news
router.get("/news/homepage", async (req, res) => {
  const allPosts = await News.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  }).sort({ createdAt: -1 });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//historys
router.get("/history/homepage", async (req, res) => {
  const allPosts = await History.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  })
    .sort({ createdAt: -1 })
    .limit(1);
  res.status(200).send({ posts: allPosts });
});

//events
router.get("/events/homepage", async (req, res) => {
  const allPosts = await Event.find({ status: true })
    .sort({ createdAt: -1 })
    .limit(10);
  res.status(200).send({ posts: allPosts });
});

//notice
router.get("/notice/homepage", async (req, res) => {
  const allPosts = await Notice.find({ status: true })
    .sort({ createdAt: -1 })
    .limit(10);
  res.status(200).send({ posts: allPosts });
});

//ourinspiration
router.get("/ourinspiration/homepage", async (req, res) => {
  const allPosts = await OurInspiration.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  })
    .sort({ createdAt: -1 })
    .limit(1);
  res.status(200).send({ posts: allPosts });
});

//rulesandregulation
router.get("/rulesandregulation/homepage", async (req, res) => {
  const allPosts = await RulesNRegulation.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  })
    .sort({ createdAt: -1 })
    .limit(10);
  res.status(200).send({ posts: allPosts });
});
//pressrelease
router.get("/pressrelease/homepage", async (req, res) => {
  const allPosts = await PressRelease.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  })
    .sort({ createdAt: -1 })
    .limit(3);
  await res.status(200).send({ posts: allPosts });
});
//documents
router.get("/documents/homepage", async (req, res) => {
  const allPosts = await Documents.find({
    status: true,
    userHandle: { $regex: /^@_/ },
  })
    .sort({ createdAt: -1 })
    .limit(3);
  await res.status(200).send({ posts: allPosts });
});

//single popposts slug
router.get("/popposts/:slug", async (req, res) => {
  const allPosts = await PopPosts.findOne({
    slug: req.params.slug,
    status: true,
  });
  if (!allPosts)
    res.status(404).send({ message: "PopPosts Not Found or Is Deactivated" });

  const updatePost = await PopPosts.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });
  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single post id
router.get("/popposts/dashboard/:id", async (req, res) => {
  const allPosts = await PopPosts.findOne({ _id: req.params.id });
  if (!allPosts)
    res.status(404).send({ message: "PopPosts Not Found or Is Deactivated" });

  const updatePost = await PopPosts.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single events slug
router.get("/events/:slug", async (req, res) => {
  try {
    const allPosts = await Event.findOne({
      slug: req.params.slug,
      status: true,
    });
    if (!allPosts)
      res.status(404).send({ message: "Event Not Found or Is Deactivated" });

    const updatePost = await Event.updateOne(
      { _id: allPosts._id },
      { $set: { countView: allPosts.countView + 1 } }
    );
    if (!updatePost)
      return res
        .status(500)
        .send({ message: "There was some error please try again" });
    allPosts.save();

    if (allPosts) await res.status(200).send({ posts: allPosts });
  } catch (err) {
    console.log(err);
  }
});

//single post id
router.get("/datehistory/dashboard/:id", async (req, res) => {
  const allPosts = await DateHistory.findOne({ _id: req.params.id });
  if (!allPosts)
    res
      .status(404)
      .send({ message: "Date History Not Found or Is Deactivated" });

  const updatePost = await DateHistory.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single post id
router.get("/president/dashboard/:id", async (req, res) => {
  const allPosts = await President.findOne({ _id: req.params.id });
  if (!allPosts)
    res
      .status(404)
      .send({ message: "President Message Not Found or Is Deactivated" });

  const updatePost = await President.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single post id
router.get("/events/dashboard/:id", async (req, res) => {
  const allPosts = await Event.findOne({ _id: req.params.id });
  if (!allPosts)
    res.status(404).send({ message: "Event Not Found or Is Deactivated" });

  const updatePost = await Event.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single calendar event id
router.get("/calendar-events/dashboard/:id", async (req, res) => {
  const allPosts = await CalendarEvent.findOne({ _id: req.params.id });
  if (!allPosts)
    res
      .status(404)
      .send({ message: "Calendar Event Not Found or Is Deactivated" });

  const updatePost = await CalendarEvent.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single circulars id
router.get("/circulars/dashboard/:id", async (req, res) => {
  const allPosts = await CircularDocument.findOne({ _id: req.params.id });
  if (!allPosts)
    res
      .status(404)
      .send({ message: "CircularDocument Not Found or Is Deactivated" });

  const updatePost = await CircularDocument.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single circulars slug
router.get("/circulars/:slug", async (req, res) => {
  // console.log(req.params.slug)
  const allPosts = await CircularDocument.findOne({
    slug: req.params.slug,
    status: true,
  });
  if (!allPosts)
    res.status(404).send({ message: "Document Not Found or Is Deactivated" });

  const updatePost = await CircularDocument.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single documents id
router.get("/documents/dashboard/:id", async (req, res) => {
  const allPosts = await Documents.findOne({ _id: req.params.id });
  if (!allPosts)
    res.status(404).send({ message: "Documents Not Found or Is Deactivated" });

  const updatePost = await Documents.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single documents slug
router.get("/documents/:slug", async (req, res) => {
  // console.log(req.params.slug)
  const allPosts = await Documents.findOne({
    slug: req.params.slug,
    status: true,
  });
  if (!allPosts)
    res.status(404).send({ message: "Document Not Found or Is Deactivated" });

  const updatePost = await Documents.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single post id
router.get("/posts/dashboard/:id", async (req, res) => {
  const allPosts = await Post.findOne({ _id: req.params.id });
  if (!allPosts)
    res.status(404).send({ message: "Post Not Found or Is Deactivated" });

  const updatePost = await Post.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single post slug
router.get("/posts/:slug", async (req, res) => {
  const allPosts = await Post.findOne({ slug: req.params.slug, status: true });
  if (!allPosts)
    res.status(404).send({ message: "Post Not Found or Is Deactivated" });

  const updatePost = await Post.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single party-contitution slug
router.get("/party-constitution/:slug", async (req, res) => {
  const allPosts = await PartyConstitution.findOne({
    slug: req.params.slug,
    status: true,
  });
  if (!allPosts)
    res
      .status(404)
      .send({ message: "Party Constitution Not Found or Is Deactivated" });

  const updatePost = await PartyConstitution.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single party-contitution id
router.get("/party-constitutions/dashboard/:id", async (req, res) => {
  const allPosts = await PartyConstitution.findOne({ _id: req.params.id });
  if (!allPosts)
    res
      .status(404)
      .send({ message: "Party Constitution Not Found or Is Deactivated" });

  const updatePost = await PartyConstitution.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single online-library slug
router.get("/online-library/:slug", async (req, res) => {
  const allPosts = await OnlineLibrary.findOne({
    slug: req.params.slug,
    status: true,
  });
  if (!allPosts)
    res
      .status(404)
      .send({ message: "Online Library Not Found or Is Deactivated" });

  const updatePost = await OnlineLibrary.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single online-library id
router.get("/online-library/dashboard/:id", async (req, res) => {
  const allPosts = await OnlineLibrary.findOne({ _id: req.params.id });
  if (!allPosts)
    res
      .status(404)
      .send({ message: "Online Library Not Found or Is Deactivated" });

  const updatePost = await OnlineLibrary.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single news slug
router.get("/news/:slug", async (req, res) => {
  const allPosts = await News.findOne({ slug: req.params.slug, status: true });
  if (!allPosts)
    return res
      .status(404)
      .send({ message: "News Not Found or Is Deactivated" });

  const updatePost = await News.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single news id
router.get("/news/dashboard/:id", async (req, res) => {
  // console.log(req.params.id);
  const allPosts = await News.findOne({ _id: req.params.id });
  if (!allPosts)
    res.status(404).send({ message: "News Not Found or Is Deactivated" });

  const updatePost = await News.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single notice slug
router.get("/notice/:slug", async (req, res) => {
  const allPosts = await Notice.findOne({
    slug: req.params.slug,
    status: true,
  });
  if (!allPosts)
    res.status(404).send({ message: "Manifesto Not Found or Is Deactivated" });

  const updatePost = await Notice.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single notice id
router.get("/notice/dashboard/:id", async (req, res) => {
  const allPosts = await Notice.findOne({ _id: req.params.id });
  if (!allPosts)
    res.status(404).send({ message: "Manifesto Not Found or Is Deactivated" });

  const updatePost = await Notice.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single press-release slug
router.get("/press-release/:slug", async (req, res) => {
  const allPosts = await PressRelease.findOne({
    slug: req.params.slug,
    status: true,
  });
  if (!allPosts)
    res
      .status(404)
      .send({ message: "Press Release Not Found or Is Deactivated" });

  const updatePost = await PressRelease.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single press-release id
router.get("/press-release/dashboard/:id", async (req, res) => {
  const allPosts = await PressRelease.findOne({ _id: req.params.id });
  if (!allPosts)
    res
      .status(404)
      .send({ message: "Press Release Not Found or Is Deactivated" });

  const updatePost = await PressRelease.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single rules-and-regulation slug
router.get("/rules-and-regulations/:slug", async (req, res) => {
  const allPosts = await RulesNRegulation.findOne({
    slug: req.params.slug,
    status: true,
  });
  if (!allPosts)
    res
      .status(404)
      .send({ message: "Rules and Regulations Not Found or Is Deactivated" });

  const updatePost = await RulesNRegulation.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single rules-and-regulation id
router.get("/rules-and-regulations/dashboard/:id", async (req, res) => {
  const allPosts = await RulesNRegulation.findOne({ _id: req.params.id });
  if (!allPosts)
    res
      .status(404)
      .send({ message: "Rules and Regulations Not Found or Is Deactivated" });

  const updatePost = await RulesNRegulation.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single history slug
router.get("/history/:slug", async (req, res) => {
  const allPosts = await History.findOne({
    slug: req.params.slug,
    status: true,
  });
  if (!allPosts)
    res.status(404).send({ message: "History Not Found or Is Deactivated" });

  const updatePost = await History.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single history id
router.get("/history/dashboard/:id", async (req, res) => {
  const allPosts = await History.findOne({ _id: req.params.id });
  if (!allPosts)
    res.status(404).send({ message: "History Not Found or Is Deactivated" });

  const updatePost = await History.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single our-inspiration slug
router.get("/our-inspiration/:slug", async (req, res) => {
  const allPosts = await OurInspiration.findOne({
    slug: req.params.slug,
    status: true,
  });
  if (!allPosts)
    res
      .status(404)
      .send({ message: "Our Inspiration Not Found or Is Deactivated" });

  const updatePost = await OurInspiration.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//single our-inspiration id
router.get("/our-inspiration/dashboard/:id", async (req, res) => {
  const allPosts = await OurInspiration.findOne({ _id: req.params.id });
  if (!allPosts)
    res
      .status(404)
      .send({ message: "Our Inspiration Not Found or Is Deactivated" });

  const updatePost = await OurInspiration.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

//admin
//posts
router.get("/adminposts", verify, async (req, res) => {
  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const singleCategory = await Category.findOne({ slug: "posts" });
  const allPosts = await Post.find({ "category._id": singleCategory._id }).sort(
    {
      createdAt: -1,
    }
  );
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//president
router.get("/adminpresident", verify, async (req, res) => {
  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const singleCategory = await Category.findOne({ slug: "president" });
  const allPosts = await President.find({
    "category._id": singleCategory._id,
  }).sort({
    createdAt: -1,
  });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//datehistory
router.get("/admindatehistory", verify, async (req, res) => {
  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const singleCategory = await Category.findOne({ slug: "datehistory" });
  const allPosts = await DateHistory.find({
    "category._id": singleCategory._id,
  }).sort({
    createdAt: -1,
  });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//popposts
router.get("/adminpopposts", verify, async (req, res) => {
  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const singleCategory = await Category.findOne({ slug: "popposts" });
  const allPosts = await PopPosts.find({
    "category._id": singleCategory._id,
  }).sort({
    createdAt: -1,
  });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//news
router.get("/adminnews", verify, async (req, res) => {
  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const singleCategory = await Category.findOne({ slug: "news" });
  const allPosts = await News.find({ "category._id": singleCategory._id }).sort(
    {
      createdAt: -1,
    }
  );
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//historys
router.get("/adminhistory", verify, async (req, res) => {
  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });
  const singleCategory = await Category.findOne({ slug: "history" });
  const allPosts = await History.find({
    "category._id": singleCategory._id,
  }).sort({
    createdAt: -1,
  });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//events
router.get("/adminevents", verify, async (req, res) => {
  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });
  const singleCategory = await Category.findOne({ slug: "events" });
  const allPosts = await Event.find({
    "category._id": singleCategory._id,
  }).sort({
    createdAt: -1,
  });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//notice
router.get("/adminnotice", verify, async (req, res) => {
  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const singleCategory = await Category.findOne({ slug: "notice" });
  const allPosts = await Notice.find({
    "category._id": singleCategory._id,
  }).sort({
    createdAt: -1,
  });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//ourinspiration
router.get("/adminourinspiration", verify, async (req, res) => {
  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const singleCategory = await Category.findOne({ slug: "our-inspiration" });
  const allPosts = await OurInspiration.find({
    "category._id": singleCategory._id,
  }).sort({ createdAt: -1 });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//rulesandregulation
router.get("/adminrulesandregulation", verify, async (req, res) => {
  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const singleCategory = await Category.findOne({
    slug: "rules-and-regulations",
  });
  const allPosts = await RulesNRegulation.find({
    "category._id": singleCategory._id,
  }).sort({ createdAt: -1 });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//pressrelease
router.get("/adminpressrelease", verify, async (req, res) => {
  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const singleCategory = await Category.findOne({ slug: "press-release" });
  const allPosts = await PressRelease.find({
    "category._id": singleCategory._id,
  }).sort({
    createdAt: -1,
  });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});
//pressrelease
router.get("/admincalendarevents", verify, async (req, res) => {
  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const allPosts = await CalendarEvent.find({}).sort({ createdAt: -1 });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//partyconstitution
router.get("/adminpartyconstitution", verify, async (req, res) => {
  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const singleCategory = await Category.findOne({ slug: "party-constitution" });
  const allPosts = await PartyConstitution.find({
    "category.slug": singleCategory.slug,
  }).sort({ createdAt: -1 });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//onlinelibrary
router.get("/adminonlinelibrary", verify, async (req, res) => {
  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const singleCategory = await Category.findOne({ slug: "online-library" });
  const allPosts = await OnlineLibrary.find({
    "category._id": singleCategory._id,
  }).sort({
    createdAt: -1,
  });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//documents
router.get("/admindocuments", verify, async (req, res) => {
  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const singleCategory = await Category.findOne({ slug: "documents" });
  const allPosts = await Documents.find({
    "category._id": singleCategory._id,
  }).sort({
    createdAt: -1,
  });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

//posts
router.get("/admincirculardocument", verify, async (req, res) => {
  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  const singleCategory = await Category.findOne({ slug: "circulars" });
  const allPosts = await CircularDocument.find({
    "category.slug": singleCategory.slug,
  }).sort({ createdAt: -1 });
  let data = [];
  let i = 1;

  allPosts.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ posts: Object.assign(data) });
});

// single mobile api

router.get("/mobile/posts/:slug", async (req, res) => {
  const allPosts = await Post.findOne({ slug: req.params.slug, status: true });
  if (!allPosts)
    res.status(404).send({ message: "Post Not Found or Is Deactivated" });
  const updatePost = await Post.updateOne(
    { _id: allPosts._id },
    { $set: { countView: allPosts.countView + 1 } }
  );
  if (!updatePost)
    return res
      .status(500)
      .send({ message: "There was some error please try again" });

  allPosts.save();

  addFullImageUrlSingle(allPosts);

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

router.get("/mobile/press-release/:slug", async (req, res) => {
  const allPosts = await PressRelease.findOne({
    slug: req.params.slug,
    status: true,
  });
  if (!allPosts)
    res.status(404).send({ message: "Post Not Found or Is Deactivated" });
  addFullImageUrlSingle(allPosts);
  if (allPosts) await res.status(200).send({ posts: allPosts });
});

router.get("/mobile/press-release/:slug/count", async (req, res) => {
  try {
    const allPosts = await PressRelease.findOne({
      slug: req.params.slug,
      status: true,
    });
    await PressRelease.updateOne(
      { _id: allPosts._id },
      { $set: { countView: allPosts.countView + 1 } }
    );
    allPosts.save();
    if (allPosts) await res.status(200).send({ count: allPosts.countView });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/mobile/posts/:slug", async (req, res) => {
  const allPosts = await Post.findOne({ slug: req.params.slug, status: true });
  if (!allPosts)
    res.status(404).send({ message: "Post Not Found or Is Deactivated" });
  addFullImageUrlSingle(allPosts);

  if (allPosts) await res.status(200).send({ posts: allPosts });
});

router.get("/mobile/post/:slug/count", async (req, res) => {
  try {
    const allPosts = await Post.findOne({
      slug: req.params.slug,
      status: true,
    });
    await Post.updateOne(
      { _id: allPosts._id },
      { $set: { countView: allPosts.countView + 1 } }
    );
    allPosts.save();
    if (allPosts) await res.status(200).send({ count: allPosts.countView });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/mobile/news/:slug", async (req, res) => {
  const allPosts = await News.findOne({ slug: req.params.slug, status: true });
  if (!allPosts)
    res.status(404).send({ message: "Post Not Found or Is Deactivated" });
  addFullImageUrlSingle(allPosts);
  if (allPosts) await res.status(200).send({ posts: allPosts });
});

router.get("/mobile/news/:slug/count", async (req, res) => {
  try {
    const allPosts = await News.findOne({
      slug: req.params.slug,
      status: true,
    });
    await News.updateOne(
      { _id: allPosts._id },
      { $set: { countView: allPosts.countView + 1 } }
    );
    allPosts.save();
    if (allPosts) await res.status(200).send({ count: allPosts.countView });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/mobile/history/:slug", async (req, res) => {
  try {
    const allPosts = await History.findOne({
      slug: req.params.slug,
      status: true,
    });
    if (!allPosts)
      res.status(404).send({ message: "Post Not Found or Is Deactivated" });

    if (allPosts) await res.status(200).send({ posts: allPosts });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/mobile/history/:slug/count", async (req, res) => {
  try {
    const allPosts = await History.findOne({
      slug: req.params.slug,
      status: true,
    });
    await History.updateOne(
      { _id: allPosts._id },
      { $set: { countView: allPosts.countView + 1 } }
    );
    allPosts.save();
    if (allPosts) await res.status(200).send({ count: allPosts.countView });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/mobile/events/:slug", async (req, res) => {
  try {
    const allPosts = await Event.findOne({
      slug: req.params.slug,
      status: true,
    });
    if (!allPosts)
      res.status(404).send({ message: "Post Not Found or Is Deactivated" });

    addFullImageUrlSingle(allPosts);

    if (allPosts) await res.status(200).send({ posts: allPosts });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/mobile/events/:slug/count", async (req, res) => {
  try {
    const allPosts = await Event.findOne({
      slug: req.params.slug,
      status: true,
    });
    await Event.updateOne(
      { _id: allPosts._id },
      { $set: { countView: allPosts.countView + 1 } }
    );
    allPosts.save();
    if (allPosts) await res.status(200).send({ count: allPosts.countView });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/mobile/notice/:slug", async (req, res) => {
  try {
    const allPosts = await Notice.findOne({
      slug: req.params.slug,
      status: true,
    });
    if (!allPosts)
      res.status(404).send({ message: "Post Not Found or Is Deactivated" });
    addFullImageUrlSingle(allPosts);

    if (allPosts) await res.status(200).send({ posts: allPosts });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/mobile/notice/:slug/count", async (req, res) => {
  try {
    const allPosts = await Notice.findOne({
      slug: req.params.slug,
      status: true,
    });
    await Notice.updateOne(
      { _id: allPosts._id },
      { $set: { countView: allPosts.countView + 1 } }
    );
    allPosts.save();
    if (allPosts) await res.status(200).send({ count: allPosts.countView });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/mobile/ourinspiration/:slug", async (req, res) => {
  try {
    const allPosts = await OurInspiration.findOne({
      slug: req.params.slug,
      status: true,
    });
    if (!allPosts)
      res.status(404).send({ message: "Post Not Found or Is Deactivated" });
    addFullImageUrlSingle(allPosts);

    if (allPosts) await res.status(200).send({ posts: allPosts });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/mobile/ourinspiration/:slug/count", async (req, res) => {
  try {
    const allPosts = await OurInspiration.findOne({
      slug: req.params.slug,
      status: true,
    });
    await OurInspiration.updateOne(
      { _id: allPosts._id },
      { $set: { countView: allPosts.countView + 1 } }
    );
    allPosts.save();
    if (allPosts) await res.status(200).send({ count: allPosts.countView });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/mobile/rules-and-regulations/:slug", async (req, res) => {
  try {
    const allPosts = await RulesNRegulation.findOne({
      slug: req.params.slug,
      status: true,
    });
    if (!allPosts)
      res.status(404).send({ message: "Post Not Found or Is Deactivated" });

    if (allPosts) await res.status(200).send({ posts: allPosts });
  } catch (err) {
    console.log(err);
  }
});

router.get("/mobile/rules-and-regulations/:slug/count", async (req, res) => {
  try {
    const allPosts = await RulesNRegulation.findOne({
      slug: req.params.slug,
      status: true,
    });
    await RulesNRegulation.updateOne(
      { _id: allPosts._id },
      { $set: { countView: allPosts.countView + 1 } }
    );
    allPosts.save();
    if (allPosts) await res.status(200).send({ count: allPosts.countView });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/mobile/party-constitution/:slug", async (req, res) => {
  try {
    const allPosts = await PartyConstitution.findOne({
      slug: req.params.slug,
      status: true,
    });
    if (!allPosts)
      res.status(404).send({ message: "Post Not Found or Is Deactivated" });
    addFullImageUrlSingle(allPosts);

    if (allPosts) await res.status(200).send({ posts: allPosts });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/mobile/party-constitution/:slug/count", async (req, res) => {
  try {
    const allPosts = await PartyConstitution.findOne({
      slug: req.params.slug,
      status: true,
    });
    await PartyConstitution.updateOne(
      { _id: allPosts._id },
      { $set: { countView: allPosts.countView + 1 } }
    );
    allPosts.save();
    if (allPosts) await res.status(200).send({ count: allPosts.countView });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/mobile/documents/:slug", async (req, res) => {
  try {
    const allPosts = await Documents.findOne({
      slug: req.params.slug,
      status: true,
    });
    if (!allPosts)
      res.status(404).send({ message: "Post Not Found or Is Deactivated" });

    addFullImageUrlSingle(allPosts);

    if (allPosts) await res.status(200).send({ posts: allPosts });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/mobile/documents/:slug/count", async (req, res) => {
  try {
    const allPosts = await Documents.findOne({
      slug: req.params.slug,
      status: true,
    });
    await Documents.updateOne(
      { _id: allPosts._id },
      { $set: { countView: allPosts.countView + 1 } }
    );
    allPosts.save();
    if (allPosts) await res.status(200).send({ count: allPosts.countView });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/mobile/circulars/:slug", async (req, res) => {
  try {
    const allPosts = await CircularDocument.findOne({
      slug: req.params.slug,
      status: true,
    });
    if (!allPosts)
      res.status(404).send({ message: "Post Not Found or Is Deactivated" });

    addFullImageUrlSingle(allPosts);

    if (allPosts) await res.status(200).send({ posts: allPosts });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/mobile/circulars/:slug/count", async (req, res) => {
  try {
    const allPosts = await CircularDocument.findOne({
      slug: req.params.slug,
      status: true,
    });
    await CircularDocument.updateOne(
      { _id: allPosts._id },
      { $set: { countView: allPosts.countView + 1 } }
    );
    allPosts.save();
    if (allPosts) await res.status(200).send({ count: allPosts.countView });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/mobile/online-library/:slug", async (req, res) => {
  try {
    const allPosts = await OnlineLibrary.findOne({
      slug: req.params.slug,
      status: true,
    });
    if (!allPosts)
      res.status(404).send({ message: "Post Not Found or Is Deactivated" });
    addFullImageUrlSingle(allPosts);

    if (allPosts) await res.status(200).send({ posts: allPosts });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/mobile/online-library/:slug/count", async (req, res) => {
  try {
    const allPosts = await OnlineLibrary.findOne({
      slug: req.params.slug,
      status: true,
    });
    await OnlineLibrary.updateOne(
      { _id: allPosts._id },
      { $set: { countView: allPosts.countView + 1 } }
    );
    allPosts.save();
    if (allPosts) await res.status(200).send({ count: allPosts.countView });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

// Combined route handler for all models
router.post("/getposts", async (req, res) => {
  try {
    const { postType, slug, page = 1, limit = 10 } = req.body;

    let Model;
    let query = { status: true };
    let sortOption = { createdAt: -1 };

    // Determine which model to use based on postType
    switch (postType) {
      case "posts":
        Model = Post;
        sortOption = { sort: 0 };
        break;
      case "popposts":
        Model = PopPosts;
        sortOption = { sort: 0 };
        break;
      case "partyconstitution":
        Model = PopPosts;
        sortOption = { sort: 0 };
        break;
      case "news":
        Model = News;
        break;
      case "history":
        Model = History;
        break;
      case "events":
        Model = Event;
        break;
      case "notice":
        Model = Notice;
        break;
      case "documents":
        Model = Documents;
        break;
      case "circulars":
        Model = CircularDocument;
        break;
      case "ourinspiration":
        Model = OurInspiration;
        break;
      case "rules-and-regulations":
        Model = RulesNRegulation;
        break;
      case "press-release":
        Model = PressRelease;
        break;
      case "online-library":
        Model = OnlineLibrary;
        break;
      case "president":
        Model = President;
        break;
      case "date-history":
        Model = DateHistory;
        break;
      case "calendar-event":
        Model = CalendarEvent;
        break;
      default:
        return res.status(400).send({ message: "Invalid model name provided" });
    }

    // Add category filter if slug is provided and not special cases
    if (
      slug &&
      !["ourinspiration", "rulesandregulation", "pressrelease"].includes(
        modelName
      )
    ) {
      const singleCategory = await Category.findOne({ slug });
      if (singleCategory) {
        query["category.slug"] = singleCategory.slug;
      }
    }

    // Get total count for pagination
    const total = await Model.countDocuments(query);

    // Get data with pagination
    const allPosts = await Model.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    // Use global pagination function for all routes
    const pagination = globalpagination(total, page, limit);

    return res.status(200).send({ posts: allPosts, pagination });
  } catch (error) {
    console.error("Error in getposts route:", error);
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
