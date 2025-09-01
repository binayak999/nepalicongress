const router = require("express").Router();
const verify = require("../extra/verifyToken");
const { radioValidataion } = require("../validation/contentValidation");
const Radio = require("../model/Radio");
const slugify = require("slugify");
const User = require("../model/User");

function addFullImageUrl(mixArray) {
  mixArray.forEach((ele) => {
    let main = ele.image;
    let pre = "https://api.nepalicongress.org";
    let final = pre + main;
    ele.image = final;
  });
}

router.get("/", async (req, res) => {
  const allcategory = await Radio.find(
    {},
    { __v: 0, userHandle: 0, createdAt: 0, updateAt: 0, _id: 0 }
  );
  // addFullImageUrl(allcategory);
  res.status(200).send({ radios: allcategory });
});

router.get("/wishlisted", verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  const allcategory = await Radio.find(
    { wishlist: true, userHandle: user.userHandle },
    { __v: 0, userHandle: 0, createdAt: 0, updateAt: 0, _id: 0 }
  );
  // addFullImageUrl(allcategory);
  res.status(200).send({ radios: allcategory });
});

router.post("/create", verify, async (req, res) => {
  //validations applying
  const { error } = radioValidataion(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  //checking if the user is already in the database
  const engtitle = await Radio.findOne({ engtitle: req.body.engtitle });
  if (engtitle)
    return res
      .status(409)
      .send({ message: "English Radio Name Already Exits" });

  //checking if the user is already in the database
  const neptitle = await Radio.findOne({ neptitle: req.body.neptitle });
  if (neptitle)
    return res.status(409).send({ message: "Nepali Radio Name Already Exits" });

  //userdata
  const user = await User.findOne({ _id: req.user._id });

  //Create new user
  const radio = new Radio({
    engtitle: req.body.engtitle,
    neptitle: req.body.neptitle,
    link: req.body.link,
    stationId: req.body.stationId,
    wishlist: req.body.wishlist,
    image: req.body.image,
    userHandle: user.userHandle,
  });
  try {
    await radio.save();
    res.status(201).send({ message: "New Radio Was Created Successfully" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.put("/update/:id", verify, async (req, res) => {
  //userdata
  const user = await User.findOne({ _id: req.user._id });
  const radio = await Radio.findOne({ _id: req.params.id });
  const rad = {
    engtitle: req.body.engtitle,
    neptitle: req.body.neptitle,
    stationId: req.body.stationId,
    image: req.body.image,
  };

  const updateCategory = await Radio.updateOne(
    { _id: radio._id },
    { $set: rad }
  );
  if (!updateCategory) {
    return res
      .status(500)
      .send({ message: "There was some error please try again" });
  } else {
    await radio.save();
    return res.status(200).send({ message: "Radio has been updated" });
  }
});

router.put("/wishlist/:id", verify, async (req, res) => {
  //userdata
  const user = await User.findOne({ _id: req.user._id });
  const radio = await Radio.findOne({ _id: req.params.id });

  const rad = {
    wishlist: !radio.wishlist,
  };

  const updateCategory = await Radio.updateOne(
    { _id: radio._id },
    { $set: rad }
  );
  if (!updateCategory) {
    return res
      .status(500)
      .send({ message: "There was some error please try again" });
  } else {
    await radio.save();

    if (!radio.wishlist) {
      return res.status(200).send({ message: "Radio wishlist added" });
    } else {
      return res.status(200).send({ message: "Radio wishlist removed" });
    }
  }
});

router.delete("/delete/:id", verify, async (req, res) => {
  //userdata
  const radio = await Radio.findOne({ _id: req.params.id });

  const deleteCategory = await Category.deleteOne({ _id: category._id });
  if (!deleteCategory) {
    return res
      .status(500)
      .send({ message: "There was some error please try again" });
  } else {
    await radio.save();
    if (rst) {
      res.status(200).send({ message: "Radio Was Deleted Successfully" });
    }
  }
});

module.exports = router;
