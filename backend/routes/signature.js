const router = require("express").Router();
const mediaUpload = require("../extra/mediaUpload");
const verify = require("../extra/verifyToken");
const Medias = require("../model/Medias");
const Signature = require("../model/Signature");

router.post("/create", verify, async (req, res) => {
  try {
    
    if (req.body._id == undefined) {
      if(req.body.name == undefined || req.body.province == undefined || req.files == undefined || req.files.image == undefined){
        return res.status(400).send({ message: "Please provide all required fields" });
      }
      const signature = new Signature({
        name: req.body.name,
        province: req.body.province,
        district: req.body.district,
        userHandle: req.user.userHandle,
        createdAt: Date.now(),
        updateAt: Date.now(),
      });

      await signature.save();

      if (req.files != undefined) {
        await mediaUpload(req.files.image, "signature", signature._id, "image");
      }

      return res
        .status(201)
        .send({ message: "Signature created successfully" });
    } else {
      const signature = await Signature.findOne({ _id: req.body._id });
      let data = {};

      if (req.body.name != undefined) {
        data.name = req.body.name;
      }

      if (req.body.province != undefined) {
        data.province = req.body.province;
      }

      if (req.body.district != undefined) {
        data.district = req.body.district;
      }
      if (req.body.englishDistrict != undefined) {
        data.englishDistrict = req.body.englishDistrict;
      }

      if (req.files != undefined) {
        await mediaUpload(req.files.image, "signature", signature._id, "image");
      }

      await Signature.updateOne({ _id: req.body._id }, { $set: data });
      return res
        .status(200)
        .send({ message: "Signature updated successfully" });
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/list", async (req, res) => {
  try {
    const signature = await Signature.find();
    for (let i = 0; i < signature.length; i++) {
      const media = await Medias.findOne({ assignedTo: signature[i]._id });
      signature[i].image = `http://${req.headers.host}${media.fileLocation}`;
    }
    return res.status(200).send({ results: signature });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Signature.deleteOne({ _id: req.params.id });
    const signature = await Signature.find();
    for (let i = 0; i < signature.length; i++) {
      const media = await Medias.findOne({ assignedTo: signature[i]._id });
      signature[i].image = `http://${req.headers.host}${media.fileLocation}`;
    }
    return res.status(200).send({ results: signature });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

module.exports = router;
