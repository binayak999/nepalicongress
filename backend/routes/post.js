const router = require("express").Router();
const verify = require("../extra/verifyToken");
const { postVaidation } = require("../validation/contentValidation");
const Post = require("../model/Post");
const Event = require("../model/Event");
const CalendarEvent = require("../model/CalendarEvent");
const Subdomain = require("../model/Subdomain");
const User = require("../model/User");
const Category = require("../model/Category");
var schedule = require("node-schedule");
const Notice = require("../model/Notice");
const News = require("../model/News");
const History = require("../model/History");
const PressRelease = require("../model/PressRelease");
const RulesNRegulation = require("../model/RulesNRegulation");
const OurInspiration = require("../model/OurInspiration");
const PartyConstitution = require("../model/PartyConstitution");
const OnlineLibrary = require("../model/OnlineLibrary");
const Documents = require("../model/Documents");
const { update } = require("../model/Post");
const fs = require("fs");
const path = require("path");
const PopPosts = require("../model/PopPosts");
const CircularDocument = require("../model/CircularDocument");
const { title } = require("process");
const President = require("../model/President");
const DateHistory = require("../model/DateHistory");
const slug = require("slug");

router.post("/create", verify, async (req, res) => {
  var rule = new schedule.RecurrenceRule();
  rule.second = 0;

  // validations applying
  const { error } = postVaidation(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  let user;
  // //userdata
  if (req.body.userRole === "subdomain") {
    user = await Subdomain.findOne({ _id: req.user._id });
    if (!user) return res.status(404).send({ message: "Username Not Found" });
  } else {
    user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(404).send({ message: "Username Not Found" });
  }

  // //category
  const category = await Category.findOne({ slug: req.body.slug });
  if (!category) return res.status(404).send({ message: "Category Not Found" });

  let post;
  if (req.body.slug == "posts") {
    post = new Post({
      title: req.body.eng.title,
      eng: req.body.eng,
      nep: req.body.nep,
      category: category,
      userHandle: user.userHandle,
      images: req.body.images,
      videos: req.body.videos,
      attachment: req.body.attachment,
      externallink: req.body.externallink,
      status: false,
      createdAt: Date.now(),
      updateAt: Date.now(),
      sort: req.body.sort != undefined ? req.body.sort : 0,
    });
  } else if (req.body.slug == "events") {
    post = new Event({
      title: req.body.eng.title,
      eng: req.body.eng,
      nep: req.body.nep,
      category: category,
      userHandle: user.userHandle,
      images: req.body.images,
      videos: req.body.videos,
      attachment: req.body.attachment,
      externallink: req.body.externallink,
      status: false,
      createdAt: Date.now(),
      updateAt: Date.now(),
      sort: req.body.sort != undefined ? req.body.sort : 0,
    });
  } else if (req.body.slug == "calendar-events") {
    // event date
    const eventdateeng = await CalendarEvent.findOne({
      slug: req.body.eng.date,
    });
    if (eventdateeng)
      return res
        .status(412)
        .send({ message: "Please choose another date event already added" });

    const eventdatenep = await CalendarEvent.findOne({
      slug: req.body.nep.date,
    });
    if (eventdatenep)
      return res
        .status(412)
        .send({ message: "Please choose another date event already added" });

    post = new CalendarEvent({
      title: req.body.eng.title,
      eng: req.body.eng,
      nep: req.body.nep,
      category: category,
      userHandle: user.userHandle,
      images: req.body.images,
      videos: req.body.videos,
      attachment: req.body.attachment,
      externallink: req.body.externallink,
      status: false,
      eventRealDate: req.body.eventRealDate,
      createdAt: Date.now(),
      updateAt: Date.now(),
      sort: req.body.sort != undefined ? req.body.sort : 0,
    });
  } else if (req.body.slug == "history") {
    post = new History({
      title: req.body.eng.title,
      eng: req.body.eng,
      nep: req.body.nep,
      category: category,
      userHandle: user.userHandle,
      images: req.body.images,
      videos: req.body.videos,
      attachment: req.body.attachment,
      externallink: req.body.externallink,
      status: false,
      createdAt: Date.now(),
      updateAt: Date.now(),
      sort: req.body.sort != undefined ? req.body.sort : 0,
    });
  } else if (req.body.slug == "notice") {
    post = new Notice({
      title: req.body.eng.title,
      eng: req.body.eng,
      nep: req.body.nep,
      category: category,
      userHandle: user.userHandle,
      images: req.body.images,
      videos: req.body.videos,
      attachment: req.body.attachment,
      externallink: req.body.externallink,
      status: false,
      createdAt: Date.now(),
      updateAt: Date.now(),
      sort: req.body.sort != undefined ? req.body.sort : 0,
    });
  } else if (req.body.slug == "news") {
    post = new News({
      title: req.body.eng.title,
      eng: req.body.eng,
      nep: req.body.nep,
      category: category,
      userHandle: user.userHandle,
      images: req.body.images,
      videos: req.body.videos,
      attachment: req.body.attachment,
      externallink: req.body.externallink,
      status: false,
      createdAt: Date.now(),
      updateAt: Date.now(),
      sort: req.body.sort != undefined ? req.body.sort : 0,
    });
  } else if (req.body.slug == "press-release") {
    const productFindSlug = await PressRelease.findOne({
      slug: slug(req.body.eng.title, { mode: "rfc3986" }),
    });

    let slugGen = productFindSlug
      ? slug(req.body.eng.title + "-" + Math.floor(10 + Math.random() * 900), {
          mode: "rfc3986",
        })
      : slug(req.body.eng.title, { mode: "rfc3986" });

    post = new PressRelease({
      title: req.body.eng.title,
      slug: slugGen,
      eng: req.body.eng,
      nep: req.body.nep,
      category: category,
      userHandle: user.userHandle,
      images: req.body.images,
      videos: req.body.videos,
      attachment: req.body.attachment,
      externallink: req.body.externallink,
      status: false,
      createdAt: Date.now(),
      updateAt: Date.now(),
      sort: req.body.sort != undefined ? req.body.sort : 0,
    });
  } else if (req.body.slug == "rules-and-regulations") {
    post = new RulesNRegulation({
      title: req.body.eng.title,
      eng: req.body.eng,
      nep: req.body.nep,
      category: category,
      userHandle: user.userHandle,
      images: req.body.images,
      videos: req.body.videos,
      attachment: req.body.attachment,
      externallink: req.body.externallink,
      status: false,
      createdAt: Date.now(),
      updateAt: Date.now(),
      sort: req.body.sort != undefined ? req.body.sort : 0,
    });
  } else if (req.body.slug == "our-inspiration") {
    post = new OurInspiration({
      title: req.body.eng.title,
      eng: req.body.eng,
      nep: req.body.nep,
      category: category,
      userHandle: user.userHandle,
      images: req.body.images,
      videos: req.body.videos,
      attachment: req.body.attachment,
      externallink: req.body.externallink,
      status: false,
      createdAt: Date.now(),
      updateAt: Date.now(),
      sort: req.body.sort != undefined ? req.body.sort : 0,
    });
  } else if (req.body.slug == "party-constitution") {
    post = new PartyConstitution({
      title: req.body.eng.title,
      eng: req.body.eng,
      nep: req.body.nep,
      category: category,
      userHandle: user.userHandle,
      images: req.body.images,
      videos: req.body.videos,
      attachment: req.body.attachment,
      externallink: req.body.externallink,
      status: false,
      createdAt: Date.now(),
      updateAt: Date.now(),
      sort: req.body.sort != undefined ? req.body.sort : 0,
    });
  } else if (req.body.slug == "online-library") {
    post = new OnlineLibrary({
      title: req.body.eng.title,
      eng: req.body.eng,
      nep: req.body.nep,
      category: category,
      userHandle: user.userHandle,
      images: req.body.images,
      videos: req.body.videos,
      attachment: req.body.attachment,
      externallink: req.body.externallink,
      status: false,
      createdAt: Date.now(),
      updateAt: Date.now(),
      sort: req.body.sort != undefined ? req.body.sort : 0,
    });
  } else if (req.body.slug == "documents") {
    post = new Documents({
      title: req.body.eng.title,
      eng: req.body.eng,
      nep: req.body.nep,
      category: category,
      userHandle: user.userHandle,
      images: req.body.images,
      videos: req.body.videos,
      attachment: req.body.attachment,
      externallink: req.body.externallink,
      status: false,
      createdAt: Date.now(),
      updateAt: Date.now(),
      sort: req.body.sort != undefined ? req.body.sort : 0,
    });
  } else if (req.body.slug == "popposts") {
    post = new PopPosts({
      title: req.body.eng.title,
      eng: req.body.eng,
      nep: req.body.nep,
      category: category,
      userHandle: user.userHandle,
      images: req.body.images,
      videos: req.body.videos,
      attachment: req.body.attachment,
      externallink: req.body.externallink,
      status: false,
      createdAt: Date.now(),
      updateAt: Date.now(),
      sort: req.body.sort != undefined ? req.body.sort : 0,
    });
  } else if (req.body.slug == "circulars") {
    post = new CircularDocument({
      title: req.body.eng.title,
      eng: req.body.eng,
      nep: req.body.nep,
      category: category,
      userHandle: user.userHandle,
      images: req.body.images,
      videos: req.body.videos,
      attachment: req.body.attachment,
      externallink: req.body.externallink,
      status: false,
      createdAt: Date.now(),
      updateAt: Date.now(),
      sort: req.body.sort != undefined ? req.body.sort : 0,
    });
  } else if (req.body.slug == "president") {
    post = new President({
      title: req.body.eng.title,
      eng: req.body.eng,
      nep: req.body.nep,
      category: category,
      userHandle: user.userHandle,
      images: req.body.images,
      videos: req.body.videos,
      attachment: req.body.attachment,
      externallink: req.body.externallink,
      status: false,
      createdAt: Date.now(),
      updateAt: Date.now(),
      sort: req.body.sort != undefined ? req.body.sort : 0,
    });
  } else if (req.body.slug == "datehistory") {
    post = new DateHistory({
      title: req.body.eng.title,
      eng: req.body.eng,
      nep: req.body.nep,
      category: category,
      userHandle: user.userHandle,
      images: req.body.images,
      videos: req.body.videos,
      attachment: req.body.attachment,
      externallink: req.body.externallink,
      status: false,
      dateofhistory: req.body.dateofhistory,
      createdAt: Date.now(),
      updateAt: Date.now(),
      sort: req.body.sort != undefined ? req.body.sort : 0,
    });
  }

  let allpost = await Post.find({ userHandle: user.userHandle });
  let allevent = await Event.find({ userHandle: user.userHandle });

  let allhistory = await History.find({ userHandle: user.userHandle });
  let allnews = await News.find({ userHandle: user.userHandle });
  let allPressRelease = await PressRelease.find({
    userHandle: user.userHandle,
  });
  let allInspiration = await OurInspiration.find({
    userHandle: user.userHandle,
  });
  let allOnlineLibrary = await OnlineLibrary.find({
    userHandle: user.userHandle,
  });
  let allDocument = await Documents.find({ userHandle: user.userHandle });
  let allPopPost = await PopPosts.find({ userHandle: user.userHandle });
  let allCircularDocument = await CircularDocument.find({
    userHandle: user.userHandle,
  });

  if (req.body.userRole === "subdomain") {
    // posts
    if (allpost.length !== 0 && req.body.slug == "posts") {
      try {
        await post.save();
        allpost = await Post.find({ userHandle: user.userHandle });
        const updateUser = await Subdomain.updateOne(
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

        res
          .status(201)
          .send({ message: "Your Post Will Be Created After 30 mins" });
      } catch (error) {
        console.log(error);
      }
    } else if (allpost.length === 0 && req.body.slug == "posts") {
      try {
        // setTimeout(async () => {
        await post.save();
        // }, 30 * 60 * 1000)

        const updateUser = await Subdomain.updateOne(
          {
            userHandle: user.userHandle,
          },
          {
            $set: {
              posts: [post],
            },
          }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res
          .status(201)
          .send({ message: "Your Post Will Be Created After 30 mins" });
      } catch (error) {
        console.log(error);
      }
    }
    // events
    if (allevent.length !== 0 && req.body.slug == "events") {
      try {
        // setTimeout(async () => {
        await post.save();
        // }, 30 * 60 * 1000)
        allevent = await Event.find({ userHandle: user.userHandle });

        const updateUser = await Subdomain.updateOne(
          {
            userHandle: user.userHandle,
          },
          {
            $set: {
              events: allevent,
            },
          }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res
          .status(201)
          .send({ message: "Your Event Will Be Created After 30 mins" });
      } catch (error) {
        console.log(error);
      }
    } else if (allevent.length === 0 && req.body.slug == "events") {
      try {
        // setTimeout(async () => {
        await post.save();
        // }, 30 * 60 * 1000)

        const updateUser = await Subdomain.updateOne(
          {
            userHandle: user.userHandle,
          },
          {
            $set: {
              events: [post],
            },
          }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res
          .status(201)
          .send({ message: "Your Event Will Be Created After 30 mins" });
      } catch (error) {
        console.log(error);
      }
    }

    // calendar events
    if (allevent.length !== 0 && req.body.slug == "calendar-events") {
      try {
        await post.save();

        res
          .status(201)
          .send({ message: "Your Calendar Event Will Be Created" });
      } catch (error) {
        console.log(error);
      }
    }

    // history
    if (allhistory.length !== 0 && req.body.slug == "history") {
      try {
        // setTimeout(async () => {
        await post.save();
        // }, 30 * 60 * 1000)

        allhistory = await History.find({ userHandle: user.userHandle });

        const updateUser = await Subdomain.updateOne(
          {
            userHandle: user.userHandle,
          },
          {
            $set: {
              history: allhistory,
            },
          }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res
          .status(201)
          .send({ message: "Your History Will Be Created After 30 mins" });
      } catch (error) {
        console.log(error);
      }
    } else if (allhistory.length === 0 && req.body.slug == "history") {
      try {
        // setTimeout(async () => {
        await post.save();
        // }, 30 * 60 * 1000)

        const updateUser = await Subdomain.updateOne(
          {
            userHandle: user.userHandle,
          },
          {
            $set: {
              history: [post],
            },
          }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res
          .status(201)
          .send({ message: "Your History Will Be Created After 30 mins" });
      } catch (error) {
        console.log(error);
      }
    }

    // news
    if (allnews.length !== 0 && req.body.slug == "news") {
      try {
        // setTimeout(async () => {
        await post.save();
        // }, 30 * 60 * 1000)

        allnews = await News.find({ userHandle: user.userHandle });

        const updateUser = await Subdomain.updateOne(
          {
            userHandle: user.userHandle,
          },
          {
            $set: {
              news: allnews,
            },
          }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res
          .status(201)
          .send({ message: "Your News Will Be Created After 30 mins" });
      } catch (error) {
        console.log(error);
      }
    } else if (allnews.length === 0 && req.body.slug == "news") {
      try {
        // setTimeout(async () => {
        await post.save();
        // }, 30 * 60 * 1000)

        const updateUser = await Subdomain.updateOne(
          {
            userHandle: user.userHandle,
          },
          {
            $set: {
              news: [post],
            },
          }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res
          .status(201)
          .send({ message: "Your History Will Be Created After 30 mins" });
      } catch (error) {
        console.log(error);
      }
    }

    // pressrelease
    if (allPressRelease.length !== 0 && req.body.slug == "press-release") {
      try {
        // setTimeout(async () => {
        await post.save();
        // }, 30 * 60 * 1000)

        allPressRelease = await PressRelease.find({
          userHandle: user.userHandle,
        });

        const updateUser = await Subdomain.updateOne(
          {
            userHandle: user.userHandle,
          },
          {
            $set: {
              pressrelease: allPressRelease,
            },
          }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res
          .status(201)
          .send({ message: "Your PressRelease Will Be Created After 30 mins" });
      } catch (error) {
        console.log(error);
      }
    } else if (
      allPressRelease.length === 0 &&
      req.body.slug == "press-release"
    ) {
      try {
        // setTimeout(async () => {
        await post.save();
        // }, 30 * 60 * 1000)

        const updateUser = await Subdomain.updateOne(
          {
            userHandle: user.userHandle,
          },
          {
            $set: {
              pressrelease: [post],
            },
          }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res
          .status(201)
          .send({ message: "Your PressRelease Will Be Created After 30 mins" });
      } catch (error) {
        console.log(error);
      }
    }

    // ourinspiration
    if (allInspiration.length !== 0 && req.body.slug == "our-inspiration") {
      try {
        // setTimeout(async () => {
        await post.save();
        // }, 30 * 60 * 1000)

        allInspiration = await OurInspiration.find({
          userHandle: user.userHandle,
        });

        const updateUser = await Subdomain.updateOne(
          {
            userHandle: user.userHandle,
          },
          {
            $set: {
              ourinspirations: allInspiration,
            },
          }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res.status(201).send({
          message: "Your Our Inspiration Will Be Created After 30 mins",
        });
      } catch (error) {
        console.log(error);
        res.status(409).send({ message: "Title already added" });
      }
    } else if (
      allInspiration.length === 0 &&
      req.body.slug == "our-inspiration"
    ) {
      try {
        // setTimeout(async () => {
        await post.save();
        // }, 30 * 60 * 1000)

        const updateUser = await Subdomain.updateOne(
          {
            userHandle: user.userHandle,
          },
          {
            $set: {
              ourinspirations: [post],
            },
          }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res
          .status(201)
          .send({ message: "Your PressRelease Will Be Created After 30 mins" });
      } catch (error) {
        console.log(error);
      }
    }

    // onlinelibrary
    if (allOnlineLibrary.length !== 0 && req.body.slug == "online-library") {
      try {
        // setTimeout(async () => {
        await post.save();
        // }, 30 * 60 * 1000)

        allOnlineLibrary = await OnlineLibrary.find({
          userHandle: user.userHandle,
        });

        const updateUser = await Subdomain.updateOne(
          {
            userHandle: user.userHandle,
          },
          {
            $set: {
              onlinelibrary: allOnlineLibrary,
            },
          }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res.status(201).send({
          message: "Your Online Library Will Be Created After 30 mins",
        });
      } catch (error) {
        console.log(error);
      }
    } else if (
      allOnlineLibrary.length === 0 &&
      req.body.slug == "online-library"
    ) {
      try {
        // setTimeout(async () => {
        await post.save();
        // }, 30 * 60 * 1000)

        const updateUser = await Subdomain.updateOne(
          {
            userHandle: user.userHandle,
          },
          {
            $set: {
              onlinelibrary: [post],
            },
          }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res.status(201).send({
          message: "Your Online Library Will Be Created After 30 mins",
        });
      } catch (error) {
        console.log(error);
      }
    }

    // documents
    if (allDocument.length !== 0 && req.body.slug == "documents") {
      try {
        await post.save();
        allDocument = await Post.find({ userHandle: user.userHandle });
        const updateUser = await Subdomain.updateOne(
          {
            userHandle: user.userHandle,
          },
          {
            $set: {
              documents: allDocument,
            },
          }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res
          .status(201)
          .send({ message: "Your Document Will Be Created After 30 mins" });
      } catch (error) {
        console.log(error);
      }
    } else if (allDocument.length === 0 && req.body.slug == "documents") {
      try {
        // setTimeout(async () => {
        await post.save();
        // }, 30 * 60 * 1000)

        const updateUser = await Subdomain.updateOne(
          {
            userHandle: user.userHandle,
          },
          {
            $set: {
              documents: [post],
            },
          }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res
          .status(201)
          .send({ message: "Your Document Will Be Created After 30 mins" });
      } catch (error) {
        console.log(error);
      }
    }

    // popposts
    if (allPopPost.length !== 0 && req.body.slug == "popposts") {
      try {
        await post.save();
        allPopPost = await PopPosts.find({ userHandle: user.userHandle });
        const updateUser = await Subdomain.updateOne(
          {
            userHandle: user.userHandle,
          },
          {
            $set: {
              popposts: allPopPost,
            },
          }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res
          .status(201)
          .send({ message: "Your PopPosts Will Be Created After 30 mins" });
      } catch (error) {
        console.log(error);
      }
    } else if (allPopPost.length === 0 && req.body.slug == "popposts") {
      try {
        // setTimeout(async () => {
        await post.save();
        // }, 30 * 60 * 1000)

        const updateUser = await Subdomain.updateOne(
          {
            userHandle: user.userHandle,
          },
          {
            $set: {
              popposts: [post],
            },
          }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res
          .status(201)
          .send({ message: "Your PopPosts Will Be Created After 30 mins" });
      } catch (error) {
        console.log(error);
      }
    }

    // circulardocument
    if (allCircularDocument.length !== 0 && req.body.slug == "circulars") {
      try {
        await post.save();
        allCircularDocument = await CircularDocument.find({
          userHandle: user.userHandle,
        });
        const updateUser = await Subdomain.updateOne(
          {
            userHandle: user.userHandle,
          },
          {
            $set: {
              circulardocuments: allCircularDocument,
            },
          }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res.status(201).send({
          message: "Your Circular Document Will Be Created After 30 mins",
        });
      } catch (error) {
        console.log(error);
      }
    } else if (
      allCircularDocument.length === 0 &&
      req.body.slug == "circulars"
    ) {
      try {
        // setTimeout(async () => {
        await post.save();
        // }, 30 * 60 * 1000)

        const updateUser = await Subdomain.updateOne(
          {
            userHandle: user.userHandle,
          },
          {
            $set: {
              circulardocuments: [post],
            },
          }
        );
        if (!updateUser)
          return res
            .status(500)
            .send({ message: "There was some error please try again" });

        res.status(201).send({
          message: "Your Circular Document Will Be Created After 30 mins",
        });
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    try {
      const save = await post.save();
      if (save) {
        res.status(201).send({ message: "Your Post has been created" });
      }
    } catch (error) {
      console.log(error);
    }
  }
});

router.put("/updateAll", verify, async (req, res) => {
  if (req.body.removedImage.length != 0) {
    req.body.removedImage.forEach((ele) => {
      if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
        fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
      }
    });
  }
  if (req.body.removedVideo.length != 0) {
    req.body.removedVideo.forEach((ele) => {
      if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
        fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
      }
    });
  }
  if (req.body.removedAttachment.length != 0) {
    req.body.removedAttachment.forEach((ele) => {
      if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
        fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
      }
    });
  }

  let post;

  if (req.body.slug != "datehistory") {
    updateData = {
      title: req.body.eng.title,
      eng: req.body.eng,
      nep: req.body.nep,
      images: req.body.images,
      videos: req.body.videos,
      attachment: req.body.attachment,
      externallink: req.body.externallink,
      updateAt: Date.now(),
      sort: req.body.sort != undefined ? req.body.sort : 0,
    };
  } else {
    updateData = {
      title: req.body.eng.title,
      eng: req.body.eng,
      nep: req.body.nep,
      images: req.body.images,
      videos: req.body.videos,
      attachment: req.body.attachment,
      externallink: req.body.externallink,
      dateofhistory: req.body.dateofhistory,
      updateAt: Date.now(),
      sort: req.body.sort != undefined ? req.body.sort : 0,
    };
  }

  if (req.body.slug == "posts") {
    // //Update new posts
    post = await Post.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "Post Didn't not found" });

    await Post.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: post.status,
        },
      }
    );
  } else if (req.body.slug == "events") {
    // //Update new events
    post = await Event.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "Events Didn't not found" });

    await Event.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: post.status,
        },
      }
    );
  } else if (req.body.slug == "calendar-events") {
    // //Update new events
    post = await CalendarEvent.findOne({ _id: req.body.id });

    const eventdateeng = await CalendarEvent.findOne({
      slug: req.body.eng.date,
    });
    if (eventdateeng)
      return res
        .status(412)
        .send({ message: "Please choose another date event already added" });

    const eventdatenep = await CalendarEvent.findOne({
      slug: req.body.nep.date,
    });
    if (eventdatenep)
      return res
        .status(412)
        .send({ message: "Please choose another date event already added" });

    if (!post) res.status(404).send({ message: "Calendar Events not found" });

    await CalendarEvent.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: post.status,
        },
      }
    );
  } else if (req.body.slug == "history") {
    // //Update new history
    post = await History.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "History Didn't not found" });

    await History.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: post.status,
        },
      }
    );
  } else if (req.body.slug == "notice") {
    // //Update new notice
    post = await Notice.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "Notice Didn't not found" });

    await Notice.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: post.status,
        },
      }
    );
  } else if (req.body.slug == "news") {
    // //Update new news
    post = await News.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "News Didn't not found" });

    await News.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: post.status,
        },
      }
    );
  } else if (req.body.slug == "press-release") {
    // //Update new press release
    post = await PressRelease.findOne({ _id: req.body.id });
    if (!post)
      res.status(404).send({ message: "Press Release Didn't not found" });

    await PressRelease.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: post.status,
        },
      }
    );
  } else if (req.body.slug == "rules-and-regulations") {
    // //Update new rules and regulation
    post = await RulesNRegulation.findOne({ _id: req.body.id });
    if (!post)
      res.status(404).send({ message: "Rules N Regulation Didn't not found" });

    await RulesNRegulation.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: post.status,
        },
      }
    );
  } else if (req.body.slug == "our-inspiration") {
    // //Update new our inspiration
    post = await OurInspiration.findOne({ _id: req.body.id });
    if (!post)
      res.status(404).send({ message: "OurInspiration Didn't not found" });

    await OurInspiration.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: post.status,
        },
      }
    );
  } else if (req.body.slug == "party-constitution") {
    // //Update new party constitution
    post = await PartyConstitution.findOne({ _id: req.body.id });
    if (!post)
      res.status(404).send({ message: "PartyConstitution Didn't not found" });

    await PartyConstitution.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: post.status,
        },
      }
    );
  } else if (req.body.slug == "online-library") {
    // //Update new online library
    post = await OnlineLibrary.findOne({ _id: req.body.id });
    if (!post)
      res.status(404).send({ message: "OnlineLibrary Didn't not found" });

    await OnlineLibrary.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: post.status,
        },
      }
    );
  } else if (req.body.slug == "documents") {
    // //Update new notice
    post = await Documents.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "Document Didn't not found" });

    await Documents.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: post.status,
        },
      }
    );
  } else if (req.body.slug == "popposts") {
    // //Update new notice
    post = await PopPosts.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "PopPosts Didn't not found" });

    await PopPosts.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: post.status,
        },
      }
    );
  } else if (req.body.slug == "circulars") {
    // //Update new notice
    post = await CircularDocument.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "Circulars Didn't not found" });

    await CircularDocument.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: post.status,
        },
      }
    );
  } else if (req.body.slug == "president") {
    // //Update new notice
    post = await President.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "President Didn't not found" });

    await President.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: post.status,
        },
      }
    );
  } else if (req.body.slug == "datehistory") {
    // //Update new notice
    post = await DateHistory.findOne({ _id: req.body.id });
    if (!post)
      res.status(404).send({ message: "DateHistory Didn't not found" });

    await DateHistory.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: post.status,
        },
      }
    );
  }

  let allpost = await Post.find({ userHandle: post.userHandle });
  let allevent = await Event.find({ userHandle: post.userHandle });
  let allhistory = await History.find({ userHandle: post.userHandle });
  let allnotice = await Notice.find({ userHandle: post.userHandle });
  let allnews = await News.find({ userHandle: post.userHandle });
  let allPressRelease = await PressRelease.find({
    userHandle: post.userHandle,
  });
  let allInspiration = await OurInspiration.find({
    userHandle: post.userHandle,
  });
  let allPartyConstitution = await PartyConstitution.find({
    userHandle: post.userHandle,
  });
  let allOnlineLibrary = await OnlineLibrary.find({
    userHandle: post.userHandle,
  });
  let alldocument = await Documents.find({ userHandle: post.userHandle });
  let allPopPost = await PopPosts.find({ userHandle: post.userHandle });
  let allCircularDocument = await CircularDocument.find({
    userHandle: post.userHandle,
  });

  // posts
  if (allpost.length !== 0 && req.body.slug == "posts") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)
      allpost = await Post.find({ userHandle: post.userHandle });
      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
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

      res.status(200).send({ message: "Your Post Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  } else if (allpost.length === 0 && req.body.slug == "posts") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            posts: [post],
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your Post Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }
  // events
  if (allevent.length !== 0 && req.body.slug == "events") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)
      allevent = await Event.find({ userHandle: post.userHandle });

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            events: allevent,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your Event Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  } else if (allevent.length === 0 && req.body.slug == "events") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            events: [post],
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your Event Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  // history
  if (allhistory.length !== 0 && req.body.slug == "history") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      allhistory = await History.find({ userHandle: post.userHandle });

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            history: allhistory,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your History Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  } else if (allhistory.length === 0 && req.body.slug == "history") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            history: [post],
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your History Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  // notice
  if (allnotice.length !== 0 && req.body.slug == "notice") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      allnotice = await Notice.find({ userHandle: post.userHandle });

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            notice: allnotice,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your Notice Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  } else if (allnotice.length === 0 && req.body.slug == "notice") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            notice: [post],
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your History Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }
  // documents
  if (alldocument.length !== 0 && req.body.slug == "documents") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      allnotice = await Documents.find({ userHandle: post.userHandle });

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            documents: allnotice,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your Documents Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  } else if (alldocument.length === 0 && req.body.slug == "documents") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            documents: [post],
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your Documents Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  // popposts
  if (allPopPost.length !== 0 && req.body.slug == "popposts") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      allnotice = await Documents.find({ userHandle: post.userHandle });

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            popposts: allPopPost,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your PopPosts Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  } else if (allPopPost.length === 0 && req.body.slug == "popposts") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            popposts: [post],
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your PopPosts Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  // circulardocuments
  if (allCircularDocument.length !== 0 && req.body.slug == "circulars") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      allCircularDocument = await CircularDocument.find({
        userHandle: post.userHandle,
      });

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            circulardocuments: allCircularDocument,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res
        .status(200)
        .send({ message: "Your Circular Document Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  } else if (allCircularDocument.length === 0 && req.body.slug == "circulars") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            circulardocuments: [post],
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res
        .status(200)
        .send({ message: "Your Circular Document Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  // news
  if (allnews.length !== 0 && req.body.slug == "news") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      allnews = await News.find({ userHandle: post.userHandle });

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            news: allnews,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your News Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  } else if (allnews.length === 0 && req.body.slug == "news") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            news: [post],
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your History Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  // pressrelease
  if (allPressRelease.length !== 0 && req.body.slug == "press-release") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      allPressRelease = await PressRelease.find({
        userHandle: post.userHandle,
      });

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            pressrelease: allPressRelease,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your PressRelease Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  } else if (allPressRelease.length === 0 && req.body.slug == "press-release") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            pressrelease: [post],
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your PressRelease Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  // rulesandregulation
  if (req.body.slug == "rules-and-regulations") {
    try {
      await post.save();
      res.status(200).send({ message: "Your PressRelease Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  // president
  if (req.body.slug == "president") {
    try {
      await post.save();
      res
        .status(200)
        .send({ message: "Your President Message Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  // datehistory
  if (req.body.slug == "datehistory") {
    try {
      await post.save();
      res.status(200).send({ message: "Your History Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  // datehistory
  if (req.body.slug == "calendar-events") {
    try {
      await post.save();
      res.status(200).send({ message: "Your History Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  // ourinspiration
  if (allInspiration.length !== 0 && req.body.slug == "our-inspiration") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      allInspiration = await OurInspiration.find({
        userHandle: post.userHandle,
      });

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            ourinspirations: allInspiration,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your PressRelease Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  } else if (
    allInspiration.length === 0 &&
    req.body.slug == "our-inspiration"
  ) {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            ourinspirations: [post],
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your PressRelease Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  // partyconstitution
  if (
    allPartyConstitution.length !== 0 &&
    req.body.slug == "party-constitution"
  ) {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      allPartyConstitution = await PartyConstitution.find({
        userHandle: post.userHandle,
      });

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            partyconstitution: allPartyConstitution,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res
        .status(200)
        .send({ message: "Your Party Constitution Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  } else if (
    allPartyConstitution.length === 0 &&
    req.body.slug == "party-constitution"
  ) {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            partyconstitution: [post],
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res
        .status(200)
        .send({ message: "Your Party Constitution Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  // onlinelibrary
  if (allOnlineLibrary.length !== 0 && req.body.slug == "online-library") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      allOnlineLibrary = await OnlineLibrary.find({
        userHandle: post.userHandle,
      });

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            onlinelibrary: allPartyConstitution,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your Online Library Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  } else if (
    allOnlineLibrary.length === 0 &&
    req.body.slug == "online-library"
  ) {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            onlinelibrary: [post],
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your Online Library Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }
});

router.put("/updateStatus", verify, async (req, res) => {
  var post;

  let updateData = {
    updateAt: Date.now(),
  };

  if (req.body.slug == "posts") {
    // //Update new posts
    post = await Post.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "Post Didn't not found" });

    await Post.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: !post.status,
        },
      }
    );
  } else if (req.body.slug == "events") {
    // //Update new events
    post = await Event.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "Events Didn't not found" });

    await Event.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: !post.status,
        },
      }
    );
  } else if (req.body.slug == "history") {
    // //Update new history
    post = await History.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "History Didn't not found" });

    await History.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: !post.status,
        },
      }
    );
  } else if (req.body.slug == "notice") {
    // //Update new notice
    post = await Notice.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "Notice Didn't not found" });

    await Notice.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: !post.status,
        },
      }
    );
    res.status(200).send({ message: "Your News Has Been Updated" });
  } else if (req.body.slug == "news") {
    // //Update new news
    post = await News.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "News Didn't not found" });

    await News.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: !post.status,
        },
      }
    );
  } else if (req.body.slug == "press-release") {
    // //Update new press release
    post = await PressRelease.findOne({ _id: req.body.id });
    if (!post)
      res.status(404).send({ message: "Press Release Didn't not found" });

    await PressRelease.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: !post.status,
        },
      }
    );
  } else if (req.body.slug == "rules-and-regulations") {
    // //Update new rules and regulation
    post = await RulesNRegulation.findOne({ _id: req.body.id });
    if (!post)
      res.status(404).send({ message: "Rules N Regulation Didn't not found" });

    await RulesNRegulation.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: !post.status,
        },
      }
    );
    res.status(200).send({ message: "Your News Has Been Updated" });
  } else if (req.body.slug == "our-inspiration") {
    // //Update new our inspiration
    post = await OurInspiration.findOne({ _id: req.body.id });
    if (!post)
      res.status(404).send({ message: "OurInspiration Didn't not found" });

    await OurInspiration.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: !post.status,
        },
      }
    );
  } else if (req.body.slug == "party-constitution") {
    // //Update new party constitution
    post = await PartyConstitution.findOne({ _id: req.body.id });
    if (!post)
      res.status(404).send({ message: "PartyConstitution Didn't not found" });

    await PartyConstitution.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: !post.status,
        },
      }
    );
    res.status(200).send({ message: "Your News Has Been Updated" });
  } else if (req.body.slug == "online-library") {
    // //Update new online library
    post = await OnlineLibrary.findOne({ _id: req.body.id });
    if (!post)
      res.status(404).send({ message: "OnlineLibrary Didn't not found" });

    await OnlineLibrary.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: !post.status,
        },
      }
    );
  } else if (req.body.slug == "documents") {
    // //Update new documents
    post = await Documents.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "Documents Didn't not found" });

    await Documents.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: !post.status,
        },
      }
    );
  } else if (req.body.slug == "popposts") {
    // //Update new popposts
    // console.log("hey");
    post = await PopPosts.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "PopPosts Didn't not found" });

    await PopPosts.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: !post.status,
        },
      }
    );
  } else if (req.body.slug == "circulars") {
    // //Update new popposts
    // console.log("hey");
    post = await CircularDocument.findOne({ _id: req.body.id });
    if (!post)
      res.status(404).send({ message: "Circular Document Didn't not found" });

    await CircularDocument.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: !post.status,
        },
      }
    );
  } else if (req.body.slug == "president") {
    // //Update new notice
    post = await President.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "President Didn't not found" });

    await President.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: !post.status,
        },
      }
    );
    res.status(200).send({ message: "Your Calendar Has Been Updated" });
  } else if (req.body.slug == "calendar-events") {
    // //Update new rules and regulation
    post = await CalendarEvent.findOne({ _id: req.body.id });
    if (!post)
      res.status(404).send({ message: "Calendar Events Didn't not found" });
    await CalendarEvent.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: !post.status,
        },
      }
    );
    res.status(200).send({ message: "Calendar Events Has Been Updated" });
  } else if (req.body.slug == "datehistory") {
    // //Update new rules and regulation
    post = await DateHistory.findOne({ _id: req.body.id });
    if (!post)
      res.status(404).send({ message: "Date History Didn't not found" });

    await DateHistory.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...updateData,
          status: !post.status,
        },
      }
    );
    res.status(200).send({ message: "Your History Has Been Updated" });
  }

  let allpost = await Post.find({ userHandle: post.userHandle });
  let allevent = await Event.find({ userHandle: post.userHandle });
  let allhistory = await History.find({ userHandle: post.userHandle });
  let allnews = await News.find({ userHandle: post.userHandle });
  let allPressRelease = await PressRelease.find({
    userHandle: post.userHandle,
  });
  let allInspiration = await OurInspiration.find({
    userHandle: post.userHandle,
  });
  let allOnlineLibrary = await OnlineLibrary.find({
    userHandle: post.userHandle,
  });
  let allDocuments = await Documents.find({ userHandle: post.userHandle });
  let allPopPost = await PopPosts.find({ userHandle: post.userHandle });
  let allCircularDocument = await CircularDocument.find({
    userHandle: post.userHandle,
  });

  // if (req.body.userRole === 'subdomain') {
  // console.log("hey")
  // posts
  if (allpost.length !== 0 && req.body.slug == "posts") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)
      allpost = await Post.find({ userHandle: post.userHandle });

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
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

      res.status(200).send({ message: "Your Post Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  } else if (allpost.length === 0 && req.body.slug == "posts") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            posts: [post],
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your Post Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }
  // events
  if (allevent.length !== 0 && req.body.slug == "events") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)
      allevent = await Event.find({ userHandle: post.userHandle });

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            events: allevent,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your Event Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  } else if (allevent.length === 0 && req.body.slug == "events") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            events: [post],
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your Event Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  // history
  if (allhistory.length !== 0 && req.body.slug == "history") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      allhistory = await History.find({ userHandle: post.userHandle });

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            history: allhistory,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your History Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  } else if (allhistory.length === 0 && req.body.slug == "history") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            history: [post],
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your History Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  // news
  if (allnews.length !== 0 && req.body.slug == "news") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      allnews = await News.find({ userHandle: post.userHandle });

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            news: allnews,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your News Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  } else if (allnews.length === 0 && req.body.slug == "news") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            news: [post],
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your History Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  // pressrelease
  if (allPressRelease.length !== 0 && req.body.slug == "press-release") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      allPressRelease = await PressRelease.find({
        userHandle: post.userHandle,
      });

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            pressrelease: allPressRelease,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your PressRelease Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  } else if (allPressRelease.length === 0 && req.body.slug == "press-release") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            pressrelease: [post],
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your PressRelease Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  // ourinspiration
  if (allInspiration.length !== 0 && req.body.slug == "our-inspiration") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      allInspiration = await OurInspiration.find({
        userHandle: post.userHandle,
      });

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            ourinspirations: allInspiration,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your PressRelease Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  } else if (
    allInspiration.length === 0 &&
    req.body.slug == "our-inspiration"
  ) {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            ourinspirations: [post],
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your PressRelease Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  // onlinelibrary
  if (allOnlineLibrary.length !== 0 && req.body.slug == "online-library") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      allOnlineLibrary = await OnlineLibrary.find({
        userHandle: post.userHandle,
      });

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            onlinelibrary: allOnlineLibrary,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your Online Library Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  } else if (
    allOnlineLibrary.length === 0 &&
    req.body.slug == "online-library"
  ) {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            onlinelibrary: [post],
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your Online Library Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  // documents
  if (allDocuments.length !== 0 && req.body.slug == "documents") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      allDocuments = await Documents.find({ userHandle: post.userHandle });

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            documents: allDocuments,
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your Documents Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  } else if (allDocuments.length === 0 && req.body.slug == "documents") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            documents: [post],
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your Documents Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  // popposts
  if (allPopPost.length !== 0 && req.body.slug == "popposts") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      allPopPost = await PopPosts.find({ userHandle: post.userHandle });

      // console.log(allPopPost);

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            popposts: allPopPost,
          },
        }
      );
      // console.log(updateUser);
      // if (!updateUser) return res.status(500).send({ "message": "There was some error please try again" });

      res.status(200).send({ message: "Your PopPosts Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  } else if (allPopPost.length === 0 && req.body.slug == "popposts") {
    // console.log(allPopPost.length);
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            popposts: [post],
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your PopPosts Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }

  // popposts
  if (allCircularDocument.length !== 0 && req.body.slug == "circulars") {
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      allCircularDocument = await CircularDocument.find({
        userHandle: post.userHandle,
      });

      // console.log(allPopPost);

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            circulardocuments: allCircularDocument,
          },
        }
      );
      // console.log(updateUser);
      // if (!updateUser) return res.status(500).send({ "message": "There was some error please try again" });

      res
        .status(200)
        .send({ message: "Your Circular Document Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  } else if (allCircularDocument.length === 0 && req.body.slug == "circulars") {
    // console.log(allPopPost.length);
    try {
      // setTimeout(async () => {
      await post.save();
      // }, 30 * 60 * 1000)

      const updateUser = await Subdomain.updateOne(
        {
          userHandle: post.userHandle,
        },
        {
          $set: {
            circulardocuments: [post],
          },
        }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res
        .status(200)
        .send({ message: "Your Circular Document Has Been Updated" });
    } catch (error) {
      console.log(error);
    }
  }
  // }
});

module.exports = router;
