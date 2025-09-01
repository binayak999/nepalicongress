const router = require("express").Router();
const verify = require("../extra/verifyToken");
const { postVaidation } = require("../validation/contentValidation");
const Post = require("../model/Post");
const Event = require("../model/Event");
const slugify = require("slugify");
const Subdomain = require("../model/Subdomain");
var schedule = require("node-schedule");
const Notice = require("../model/Notice");
const News = require("../model/News");
const History = require("../model/History");
const PressRelease = require("../model/PressRelease");
const RulesNRegulation = require("../model/RulesNRegulation");
const OurInspiration = require("../model/OurInspiration");
const PartyConstitution = require("../model/PartyConstitution");
const OnlineLibrary = require("../model/OnlineLibrary");
const { update } = require("../model/Post");
const fs = require("fs");
const path = require("path");
const User = require("../model/User");
const PopPosts = require("../model/PopPosts");
const Documents = require("../model/Documents");
const CircularDocument = require("../model/CircularDocument");
const President = require("../model/President");
const DateHistory = require("../model/DateHistory");
const CalendarEvent = require("../model/CalendarEvent");

//delete post
router.post("/singlepost", verify, async (req, res) => {
  // //userdata
  let user;
  // //userdata
  if (req.body.userRole === "subdomain") {
    user = await Subdomain.findOne({ _id: req.user._id });
    if (!user) return res.status(404).send({ message: "Username Not Found" });
  } else {
    user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(404).send({ message: "Username Not Found" });
  }
  let post;
  let needpost;

  if (req.body.slug == "posts") {
    // //Update new posts
    post = await Post.findOne({ _id: req.body.id });
    needpost = await Post.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "Post Didn't not found" });

    if (post.images.length != 0) {
      post.images.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.videos.length != 0) {
      post.videos.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.attachment.length != 0) {
      post.attachment.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    await Post.deleteOne({ _id: req.body.id });
  } else if (req.body.slug == "events") {
    // //Update new events
    post = await Event.findOne({ _id: req.body.id });
    needpost = await Event.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "Events Didn't not found" });

    if (post.images.length != 0) {
      post.images.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.attachment.length != 0) {
      post.attachment.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.attachment.length != 0) {
      post.videos.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    await Event.deleteOne({ _id: req.body.id });
  } else if (req.body.slug == "history") {
    // //Update new history
    post = await History.findOne({ _id: req.body.id });
    needpost = await History.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "History Didn't not found" });

    if (post.images.length != 0) {
      post.images.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.videos.length != 0) {
      post.videos.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.attachment.length != 0) {
      post.attachment.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    await History.deleteOne({ _id: req.body.id });
  } else if (req.body.slug == "notice") {
    // //Update new notice
    post = await Notice.findOne({ _id: req.body.id });
    needpost = await Notice.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "Notice Didn't not found" });

    if (req.body.images.length != 0) {
      req.body.images.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (req.body.videos.length != 0) {
      req.body.videos.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (req.body.attachment.length != 0) {
      req.body.attachment.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }
    await Notice.deleteOne({ _id: req.body.id });
    res.status(200).send({ message: "Your Post Has Deleted Successfully" });
  } else if (req.body.slug == "news") {
    // //Update new news
    post = await News.findOne({ _id: req.body.id });
    needpost = await News.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "News Didn't not found" });

    if (post.images.length != 0) {
      post.images.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.videos.length != 0) {
      post.videos.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.attachment.length != 0) {
      post.attachment.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }
    await News.deleteOne({ _id: req.body.id });
  } else if (req.body.slug == "press-release") {
    // //Update new press release
    post = await PressRelease.findOne({ _id: req.body.id });
    needpost = await PressRelease.findOne({ _id: req.body.id });
    if (!post)
      res.status(404).send({ message: "Press Release Didn't not found" });

    if (post.images.length != 0) {
      post.images.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.videos.length != 0) {
      post.videos.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.attachment.length != 0) {
      post.attachment.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    await PressRelease.deleteOne({ _id: req.body.id });
  } else if (req.body.slug == "rules-and-regulations") {
    // //Update new rules and regulation
    post = await RulesNRegulation.findOne({ _id: req.body.id });
    needpost = await RulesNRegulation.findOne({ _id: req.body.id });
    if (!post)
      res.status(404).send({ message: "Rules N Regulation Didn't not found" });

    if (req.body.images.length != 0) {
      req.body.images.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (req.body.videos.length != 0) {
      req.body.videos.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (req.body.attachment.length != 0) {
      req.body.attachment.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }
    await RulesNRegulation.deleteOne({ _id: req.body.id });
    res.status(200).send({ message: "Your Post Has Deleted Successfully" });
  } else if (req.body.slug == "our-inspiration") {
    // //Update new our inspiration
    post = await OurInspiration.findOne({ _id: req.body.id });
    needpost = await OurInspiration.findOne({ _id: req.body.id });
    if (!post)
      res.status(404).send({ message: "OurInspiration Didn't not found" });

    if (post.images.length != 0) {
      post.images.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.videos.length != 0) {
      post.videos.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.attachment.length != 0) {
      post.attachment.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }
    await OurInspiration.deleteOne({ _id: req.body.id });
  } else if (req.body.slug == "party-constitution") {
    // //Update new party constitution
    post = await PartyConstitution.findOne({ _id: req.body.id });
    needpost = await PartyConstitution.findOne({ _id: req.body.id });
    if (!post)
      res.status(404).send({ message: "PartyConstitution Didn't not found" });

    if (post.images.length != 0) {
      post.images.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.videos.length != 0) {
      post.videos.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.attachment.length != 0) {
      post.attachment.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }
    await PartyConstitution.deleteOne({ _id: req.body.id });
    res.status(200).send({ message: "Your Post Has Deleted Successfully" });
  } else if (req.body.slug == "online-library") {
    post = await OnlineLibrary.findOne({ _id: req.body.id });
    needpost = await OnlineLibrary.findOne({ _id: req.body.id });
    if (!post)
      res.status(404).send({ message: "OnlineLibrary Didn't not found" });

    if (post.images.length != 0) {
      post.images.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.videos.length != 0) {
      post.videos.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.attachment.length != 0) {
      post.attachment.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }
    await OnlineLibrary.deleteOne({ _id: req.body.id });
  } else if (req.body.slug == "documents") {
    post = await Documents.findOne({ _id: req.body.id });
    needpost = await Documents.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "Documentss Didn't not found" });

    if (post.images.length != 0) {
      post.images.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.videos.length != 0) {
      post.videos.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.attachment.length != 0) {
      post.attachment.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }
    await Documents.deleteOne({ _id: req.body.id });
  } else if (req.body.slug == "popposts") {
    post = await PopPosts.findOne({ _id: req.body.id });
    needpost = await PopPosts.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "PopPosts Didn't not found" });

    if (post.images.length != 0) {
      post.images.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.videos.length != 0) {
      post.videos.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.attachment.length != 0) {
      post.attachment.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }
    await PopPosts.deleteOne({ _id: req.body.id });
  } else if (req.body.slug == "circulars") {
    post = await CircularDocument.findOne({ _id: req.body.id });
    needpost = await CircularDocument.findOne({ _id: req.body.id });
    if (!post)
      res.status(404).send({ message: "Circular Document Didn't not found" });

    if (post.images.length != 0) {
      post.images.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.videos.length != 0) {
      post.videos.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.attachment.length != 0) {
      post.attachment.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }
    await CircularDocument.deleteOne({ _id: req.body.id });
  } else if (req.body.slug == "president") {
    // //Update new rules and regulation
    post = await President.findOne({ _id: req.body.id });
    needpost = await President.findOne({ _id: req.body.id });
    if (!post) res.status(404).send({ message: "President Didn't not found" });

    if (post.images.length != 0) {
      post.images.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.videos.length != 0) {
      post.videos.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.attachment.length != 0) {
      post.attachment.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }
    await President.deleteOne({ _id: req.body.id });
    res.status(200).send({ message: "Your Post Has Deleted Successfully" });
  } else if (req.body.slug == "datehistory") {
    // //Update new rules and regulation
    post = await DateHistory.findOne({ _id: req.body.id });
    needpost = await DateHistory.findOne({ _id: req.body.id });
    if (!post)
      res.status(404).send({ message: "Rules N Regulation Didn't not found" });

    if (post.images.length != 0) {
      post.images.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.videos.length != 0) {
      post.videos.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.attachment.length != 0) {
      post.attachment.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }
    await DateHistory.deleteOne({ _id: req.body.id });
    res.status(200).send({ message: "Your Post Has Deleted Successfully" });
  } else if (req.body.slug == "calendar-events") {
    // //Update new rules and regulation
    post = await CalendarEvent.findOne({ _id: req.body.id });
    needpost = await CalendarEvent.findOne({ _id: req.body.id });
    if (!post)
      res.status(404).send({ message: "Calendar Event Didn't not found" });

    if (post.images.length != 0) {
      post.images.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.videos.length != 0) {
      post.videos.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }

    if (post.attachment.length != 0) {
      post.attachment.forEach((ele) => {
        if (fs.existsSync(path.normalize(__dirname + "/.." + ele.fileUrl))) {
          fs.unlinkSync(path.normalize(__dirname + "/.." + ele.fileUrl));
        }
      });
    }
    await CalendarEvent.deleteOne({ _id: req.body.id });
    res
      .status(200)
      .send({ message: "Your Calendar Post Deleted Successfully" });
  }

  let allpost = await Post.find({ userHandle: needpost.userHandle });
  let allevent = await Event.find({ userHandle: needpost.userHandle });
  let allhistory = await History.find({ userHandle: needpost.userHandle });
  let allnews = await News.find({ userHandle: needpost.userHandle });
  let allPressRelease = await PressRelease.find({
    userHandle: needpost.userHandle,
  });
  let allInspiration = await OurInspiration.find({
    userHandle: needpost.userHandle,
  });
  let allOnlineLibrary = await OnlineLibrary.find({
    userHandle: needpost.userHandle,
  });
  let allDocuments = await Documents.find({ userHandle: needpost.userHandle });
  let allPoppost = await PopPosts.find({ userHandle: needpost.userHandle });
  let allCircularDocument = await CircularDocument.find({
    userHandle: needpost.userHandle,
  });

  //posts
  if (allpost.length > 0 && req.body.slug == "posts") {
    try {
      allpost = await Post.find({ userHandle: needpost.userHandle });
      const updateUser = await Subdomain.updateOne(
        { userHandle: needpost.userHandle },
        { $set: { posts: allpost } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your Post Has Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  } else if (allpost.length === 0 && req.body.slug == "posts") {
    try {
      const updateUser = await Subdomain.updateOne(
        { userHandle: needpost.userHandle },
        { $set: { posts: [] } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your Post Has Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  }
  //events
  if (allevent.length > 0 && req.body.slug == "events") {
    try {
      allevent = await Event.find({ userHandle: needpost.userHandle });

      const updateUser = await Subdomain.updateOne(
        { userHandle: needpost.userHandle },
        { $set: { events: allevent } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });
      res.status(200).send({ message: "Your Event Has Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  } else if (allevent.length === 0 && req.body.slug == "events") {
    try {
      const updateUser = await Subdomain.updateOne(
        { userHandle: needpost.userHandle },
        { $set: { events: [] } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your Event Has Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  //documents
  if (allDocuments.length > 0 && req.body.slug == "documents") {
    try {
      allevent = await Documents.find({ userHandle: needpost.userHandle });

      const updateUser = await Subdomain.updateOne(
        { userHandle: needpost.userHandle },
        { $set: { documents: allevent } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });
      res
        .status(200)
        .send({ message: "Your Documentss Has Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  } else if (allevent.length === 0 && req.body.slug == "documents") {
    try {
      const updateUser = await Subdomain.updateOne(
        { userHandle: needpost.userHandle },
        { $set: { documents: [] } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res
        .status(200)
        .send({ message: "Your Documentss Has Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  //popposts
  if (allPoppost.length > 0 && req.body.slug == "popposts") {
    try {
      allevent = await PopPosts.find({ userHandle: needpost.userHandle });
      const updateUser = await Subdomain.updateOne(
        { userHandle: needpost.userHandle },
        { $set: { popposts: allevent } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });
      res
        .status(200)
        .send({ message: "Your Popposts Has Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  } else if (allPoppost.length === 0 && req.body.slug == "popposts") {
    try {
      const updateUser = await Subdomain.updateOne(
        { userHandle: needpost.userHandle },
        { $set: { popposts: [] } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res
        .status(200)
        .send({ message: "Your Popposts Has Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  }
  //circular documents
  if (allCircularDocument.length > 0 && req.body.slug == "circulars") {
    try {
      allCircularDocument = await CircularDocument.find({
        userHandle: needpost.userHandle,
      });

      const updateUser = await Subdomain.updateOne(
        { userHandle: needpost.userHandle },
        { $set: { circulardocuments: allCircularDocument } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });
      res
        .status(200)
        .send({ message: "Your Popposts Has Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  } else if (allCircularDocument.length === 0 && req.body.slug == "circulars") {
    try {
      const updateUser = await Subdomain.updateOne(
        { userHandle: needpost.userHandle },
        { $set: { circulardocuments: [] } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res
        .status(200)
        .send({ message: "Your Popposts Has Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  //history
  if (allhistory.length > 0 && req.body.slug == "history") {
    try {
      allhistory = await History.find({ userHandle: needpost.userHandle });

      const updateUser = await Subdomain.updateOne(
        { userHandle: needpost.userHandle },
        { $set: { history: allhistory } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res
        .status(200)
        .send({ message: "Your History Has Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  } else if (allhistory.length === 0 && req.body.slug == "history") {
    try {
      const updateUser = await Subdomain.updateOne(
        { userHandle: needpost.userHandle },
        { $set: { history: [] } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res
        .status(200)
        .send({ message: "Your History Has Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  //news
  if (allnews.length > 0 && req.body.slug == "news") {
    try {
      allnews = await News.find({ userHandle: needpost.userHandle });

      const updateUser = await Subdomain.updateOne(
        { userHandle: needpost.userHandle },
        { $set: { news: allnews } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res.status(200).send({ message: "Your News Has Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  } else if (allnews.length === 0 && req.body.slug == "news") {
    try {
      const updateUser = await Subdomain.updateOne(
        { userHandle: needpost.userHandle },
        { $set: { news: [] } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res
        .status(200)
        .send({ message: "Your History Has Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  //pressrelease
  if (allPressRelease.length > 0 && req.body.slug == "press-release") {
    try {
      allPressRelease = await PressRelease.find({
        userHandle: needpost.userHandle,
      });

      const updateUser = await Subdomain.updateOne(
        { userHandle: needpost.userHandle },
        { $set: { pressrelease: allPressRelease } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res
        .status(200)
        .send({ message: "Your PressRelease Has Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  } else if (allPressRelease.length === 0 && req.body.slug == "press-release") {
    try {
      const updateUser = await Subdomain.updateOne(
        { userHandle: needpost.userHandle },
        { $set: { pressrelease: [] } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res
        .status(200)
        .send({ message: "Your PressRelease Has Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  //ourinspiration
  if (allInspiration.length > 0 && req.body.slug == "our-inspiration") {
    try {
      allInspiration = await OurInspiration.find({
        userHandle: needpost.userHandle,
      });

      const updateUser = await Subdomain.updateOne(
        { userHandle: needpost.userHandle },
        { $set: { ourinspirations: allInspiration } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res
        .status(200)
        .send({ message: "Your PressRelease Has Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  } else if (
    allInspiration.length === 0 &&
    req.body.slug == "our-inspiration"
  ) {
    try {
      const updateUser = await Subdomain.updateOne(
        { userHandle: needpost.userHandle },
        { $set: { ourinspirations: [] } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res
        .status(200)
        .send({ message: "Your PressRelease Has Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  //onlinelibrary
  if (allOnlineLibrary.length > 0 && req.body.slug == "online-library") {
    try {
      allOnlineLibrary = await OnlineLibrary.find({
        userHandle: needpost.userHandle,
      });

      const updateUser = await Subdomain.updateOne(
        { userHandle: needpost.userHandle },
        { $set: { onlinelibrary: allOnlineLibrary } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res
        .status(200)
        .send({ message: "Your Online Library Has Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  } else if (
    allOnlineLibrary.length === 0 &&
    req.body.slug == "online-library"
  ) {
    // console.log("no")
    try {
      const updateUser = await Subdomain.updateOne(
        { userHandle: needpost.userHandle },
        { $set: { onlinelibrary: [] } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });

      res
        .status(200)
        .send({ message: "Your Online Library Has Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;
