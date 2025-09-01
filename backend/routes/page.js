const router = require("express").Router();
const verify = require("../extra/verifyToken");
const { pageVaidation } = require("../validation/contentValidation");
const Post = require("../model/Post");
const slugify = require("slugify");
const User = require("../model/User");
var schedule = require("node-schedule");
const Page = require("../model/Page");
const fs = require("fs");
const path = require("path");

//page
router.get("/", async (req, res) => {
  const alPage = await Page.find();
  let data = [];
  let i = 1;

  alPage.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ pages: Object.assign(data) });
});

router.post("/create", verify, async (req, res) => {
  var rule = new schedule.RecurrenceRule();
  rule.second = 0;

  //validations applying
  const { error } = pageVaidation(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  //checking if the user is already in the database
  const engpostname = await Page.findOne({ eng: req.body.eng });
  if (engpostname)
    return res.status(409).send({ message: "English Page Already Exits" });

  // //checking if the user is already in the database
  const neppostname = await Page.findOne({ nep: req.body.nep });
  if (neppostname)
    return res.status(409).send({ message: "Nepali Page Already Exits" });

  // //Create new user
  const page = new Page({
    eng: req.body.eng,
    nep: req.body.nep,
    slug: slugify(req.body.eng.title, {
      replacement: "-",
      remove: undefined,
      lower: true,
      strict: false,
      locale: "vi",
    }),
    externallink: req.body.externallink,
    images: req.body.images,
    videos: req.body.videos,
    attachment: req.body.attachment,
    status: false,
    position: req.body.position,
    pageType: req.body.pageType,
    parentPage: req.body.parentPage,
  });

  // setTimeout(async () => {
  const pageDone = await page.save();
  if (pageDone) {
    res
      .status(201)
      .send({ message: "Your Post Will Be Created After 30 mins" });
  }
  // }, 30 * 60 * 1000)
});

router.delete("/single/:id", verify, async (req, res) => {
  try {
    //Select single user
    const user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(404).send({ message: "Username Not Found" });

    //Select single page
    const page = await Page.findOne({ _id: req.params.id });
    if (!page) return res.status(404).send({ message: "Page in not found" });

    // console.log(page)
    if (page.images && page.images.length != 0) {
      page.images.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }
    // console.log(page)
    if (page.videos && page.videos.length != 0) {
      page.videos.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }
    // console.log(page)
    if (page.attachment && page.attachment.length != 0) {
      page.attachment.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    const delone = await Page.findByIdAndDelete(req.params.id);
    if (!delone) res.status(404).send("Sorry no file found");

    res.status(200).send({ message: "The page has been deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/singlepage/:slug", async (req, res) => {
  try {
    //Select single page
    const page = await Page.findOne({ slug: req.params.slug });
    if (!page) return res.status(404).send({ message: "Page in not found" });

    res.status(200).send({ page: page });
  } catch (error) {
    console.log(error);
  }
});

function addFullImageUrlSingle(mixArray) {
  console.log(mixArray);
  // let pageLink = `https://nepalicongress.org/single/${mixArray.slug}`;
  // let phoneLink = `/mobile/mobile/${mixArray.slug}`;
  // let ext = "hey";
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
  // mixArray.slug = phoneLink;
  // mixArray.externalContent = mixArray.externallink;
  // mixArray.externallink = pageLink;
}

router.get("/mobile/singlepage/:slug", async (req, res) => {
  try {
    //Select single page
    const page = await Page.findOne({ _id: req.params.slug });

    if (!page) return res.status(404).send({ message: "Page in not found" });

    addFullImageUrlSingle(page);

    res.status(200).send({ page: page });
  } catch (error) {
    console.log(error);
  }
});

router.get("/headermenu", async (req, res) => {
  try {
    // const page = await Page.find({ position:'Header' },{images:0,videos:0,attachment:0,createdAt:0,updateAt:0, nep: {content:0},eng: {content:0},_id:0,})
    const page = await Page.find(
      { position: "Header", status: true },
      {
        "nep.title": 1,
        "eng.title": 1,
        slug: 1,
        _id: 1,
        pageType: 1,
        parentPage: 1,
      }
    ).sort({ createdAt: 1 });
    if (!page) return res.status(404).send({ message: "Page in not found" });

    let menu = [];
    let children = [];
    page.forEach((ele) => {
      // console.log(ele.)
      if (ele.pageType == "Dynamic") {
        ele.slug = "/page/" + ele.slug;
      } else {
        ele.slug = "/" + ele.slug;
      }
      if (ele.parentPage == null) {
        ele = Object.assign(ele.toObject(), { children: [] });
        menu.push(ele);
      } else {
      }
    });

    page.forEach((ele) => {
      menu.forEach((e) => {
        if (ele.parentPage != null && e._id == ele.parentPage) {
          e.children.unshift(ele);
        }
      });
    });

    res.status(200).send({ menus: Object.assign(menu) });
  } catch (error) {
    console.log(error);
  }
});

router.get("/footermenu", async (req, res) => {
  try {
    // const page = await Page.find({ position:'Header' },{images:0,videos:0,attachment:0,createdAt:0,updateAt:0, nep: {content:0},eng: {content:0},_id:0,})
    const page = await Page.find(
      { position: "Footer", status: true },
      { "nep.title": 1, "eng.title": 1, slug: 1, _id: 0, pageType: 1 }
    );
    if (!page) return res.status(404).send({ message: "Page in not found" });

    page.forEach((ele) => {
      // console.log(ele.)
      if (ele.pageType == "Dynamic") {
        ele.slug = "/page/" + ele.slug;
      } else {
        ele.slug = "/" + ele.slug;
      }
    });

    // console.log(page)
    res.status(200).send({ menus: page });
  } catch (error) {
    console.log(error);
  }
});

router.put("/update", verify, async (req, res) => {
  // //userdata
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).send({ message: "Username Not Found" });

  if (req.body.removedImage && req.body.removedImage.length != 0) {
    req.body.removedImage.forEach((ele) => {
      fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
    });
  }
  if (req.body.removedVideo && req.body.removedVideo.length != 0) {
    req.body.removedVideo.forEach((ele) => {
      fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
    });
  }
  if (req.body.removedAttachment && req.body.removedAttachment.length != 0) {
    req.body.removedAttachment.forEach((ele) => {
      fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
    });
  }

  let post;

  let updateData = {
    eng: req.body.eng,
    nep: req.body.nep,
    slug: slugify(req.body.eng.title, {
      replacement: "-",
      remove: undefined,
      lower: true,
      strict: false,
      locale: "vi",
    }),
    images: req.body.images,
    videos: req.body.videos,
    attachment: req.body.attachment,
    externallink: req.body.externallink,
    status: req.body.status,
    position: req.body.position,
    pageType: req.body.pageType,
    parentPage: req.body.parentPage,
    updateAt: Date.now(),
  };

  // //Update new posts
  post = await Page.findOne({ _id: req.body.id });
  if (!post) res.status(404).send({ message: "Page Didn't not found" });
  await Page.updateOne({ _id: req.body.id }, { $set: updateData });

  // setTimeout(async () => {
  const pageDone = await post.save();
  if (pageDone) {
    res
      .status(200)
      .send({ message: "Your Post Will Be Created After 30 mins" });
  }
  // }, 30 * 60 * 1000)
});

module.exports = router;
