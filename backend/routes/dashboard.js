const verifyToken = require("../extra/verifyToken");
const Circular = require("../model/Circular");
const Event = require("../model/Event");
const History = require("../model/History");
const News = require("../model/News");
const Notice = require("../model/Notice");
const OnlineLibrary = require("../model/OnlineLibrary");
const OurInspiration = require("../model/OurInspiration");
const Post = require("../model/Post");
const PressRelease = require("../model/PressRelease");
const RulesNRegulation = require("../model/RulesNRegulation");
const Subdomain = require("../model/Subdomain");
const User = require("../model/User");
const router = require("express").Router();

let conditionCheck = {
  status: { $nin: [false] },
  municipality: { $nin: [null] },
  region: {
    $nin: ["", null],
  },
};

router.get("/", verifyToken, async (req, res) => {
  try {
    let data = {};
    const subdomain = await Subdomain.findOne(
      { _id: req.user._id },
      { userHandle: 1 }
    );
    if (subdomain) {
      data.userHandle = subdomain.userHandle;
    }
    const getCounts = async () => {
      try {
        const [
          postCounts,
          newsCounts,
          historyCounts,
          eventCounts,
          mainfestCounts,
          pressReleaseCounts,
          rulesCounts,
          ourInspirationCounts,
          libraryCounts,
          circularOldCounts,
          circularNewCounts,
        ] = await Promise.all([
          Post.countDocuments(data),
          News.countDocuments(data),
          History.countDocuments(data),
          Event.countDocuments(data),
          Notice.countDocuments(data),
          PressRelease.countDocuments(data),
          RulesNRegulation.countDocuments(data),
          OurInspiration.countDocuments(data),
          OnlineLibrary.countDocuments(data),
          Circular.countDocuments({
            ...conditionCheck,
            memberType: "Old",
            ...data,
          }),
          Circular.countDocuments({
            ...conditionCheck,
            memberType: "New",
            ...data,
          }),
        ]);

        return [
          {
            name: "Posts",
            count: postCounts,
          },
          {
            name: "News",
            count: newsCounts,
          },
          {
            name: "History",
            count: historyCounts,
          },
          {
            name: "Events",
            count: eventCounts,
          },
          {
            name: "Mainfest",
            count: mainfestCounts,
          },
          {
            name: "Press Releases",
            count: pressReleaseCounts,
          },
          {
            name: "Rules & Regulations",
            count: rulesCounts,
          },
          {
            name: "Our Inspiration",
            count: ourInspirationCounts,
          },
          {
            name: "Online Library",
            count: libraryCounts,
          },
          {
            name: "Old Active Members",
            count: circularOldCounts,
          },
          {
            name: "New Members",
            count: circularNewCounts,
          },
          {
            name: "Total Members",
            count: circularOldCounts + circularNewCounts,
          },
        ];
      } catch (error) {
        console.error("Error fetching counts:", error);
        throw error;
      }
    };

    const counts = await getCounts();
    return res.status(200).send({
      message: "Dashboard data fetched successfully",
      results: counts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});
module.exports = router;
