const router = require("express").Router();
const verify = require("../extra/verifyToken");
const Meeting = require("../model/Meeting");
const globalpagination = require("../extra/globalpagination");

router.post("/create", verify, async (req, res) => {
  try {
    const meeting = new Meeting({
      province: req.body.province,
      district: req.body.district,
      houseofrepresentative: req.body.houseofrepresentative,
      pradeshassemblyconstituency: req.body.pradeshassemblyconstituency,
      municipality: req.body.municipality,
      ward: req.body.ward,
      tole: req.body.tole,
      comminuty: req.body.comminuty,
      meetingDate: req.body.meetingDate,
      meetingTime: req.body.meetingTime,
      meetingPlace: req.body.meetingPlace,
      meetingAgenda: req.body.meetingAgenda,
      meetingComment: req.body.meetingComment,
      meetingMinute: req.body.meetingMinute,
      userHandle: req.user.userHandle,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    await meeting.save();
    return res.status(201).send({ message: "Meeting has been created" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

router.post("/list", verify, async (req, res) => {
  try {
    let filter = {};
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
    if (req.body.houseofrepresentative != undefined) {
      filter.houseofrepresentative = req.body.houseofrepresentative;
    }
    if (req.body.pradeshassemblyconstituency != undefined) {
      filter.pradeshassemblyconstituency = req.body.pradeshassemblyconstituency;
    }
    if (req.body.comminuty != undefined) {
      filter.comminuty = req.body.comminuty;
    }
    if (req.body.meetingDate != undefined) {
      filter.meetingDate = req.body.meetingDate;
    }
    const meeting = await Meeting.find(filter);
    const meetingCounts = await Meeting.countDocuments(filter);
    const pg = globalpagination(meetingCounts, req.body.page, req.body.limit);
    return res
      .status(200)
      .send({ message: "Meeting list", results: meeting, pagination: pg });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

module.exports = router;
