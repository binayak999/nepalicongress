const router = require("express").Router();
const verify = require("../extra/verifyToken");
const { categoryVaidation } = require("../validation/contentValidation");
const Category = require("../model/Category");
const slugify = require("slugify");
const User = require("../model/User");

router.get("/", async (req, res) => {
  const allcategory = await Category.find(
    {},
    { __v: 0, userHandle: 0, createdAt: 0, updateAt: 0 }
  );
  let data = [];
  let i = 1;

  allcategory.forEach((category) => {
    data.push(Object.assign(category, { __v: i }));
    i++;
  });
  res.status(200).send({ categories: Object.assign(data) });
});
router.post("/create", verify, async (req, res) => {
  //validations applying
  const { error } = categoryVaidation(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });

  //checking if the user is already in the database
  const engcategoryname = await Category.findOne({
    eng: { title: req.body.eng.title },
  });
  if (engcategoryname)
    return res.status(409).send({ message: "English Category Already Exits" });

  //checking if the user is already in the database
  const nepcategoryname = await Category.findOne({
    nep: { title: req.body.nep.title },
  });
  if (nepcategoryname)
    return res.status(409).send({ message: "Nepali Category Already Exits" });

  //userdata
  const user = await User.findOne({ _id: req.user._id });

  //Create new user
  const category = new Category({
    eng: req.body.eng,
    nep: req.body.nep,
    slug: slugify(req.body.eng.title, {
      replacement: "-",
      remove: undefined,
      lower: true,
      strict: false,
      locale: "vi",
    }),
    userHandle: user.userHandle,
  });

  let allcategory = await Category.find({ userHandle: user.userHandle });

  if (allcategory.length !== 0) {
    await category.save();

    allcategory = await Category.find({ userHandle: user.userHandle });
    const updateUser = await User.updateOne(
      { _id: req.user._id },
      { $set: { categories: allcategory } }
    );
    if (!updateUser)
      return res
        .status(500)
        .send({ message: "There was some error please try again" });
    res.status(201).send({ message: "New Category Was Created Successfully" });
  } else {
    await category.save();
    const updateUser = await User.updateOne(
      { _id: req.user._id },
      { $set: { categories: [category] } }
    );
    if (!updateUser)
      return res
        .status(500)
        .send({ message: "There was some error please try again" });
    res.status(201).send({ message: "New Category Was Created Successfully" });
  }
});

router.put("/update/:id", verify, async (req, res) => {
  //userdata
  const user = await User.findOne({ _id: req.user._id });
  const category = await Category.findOne({ _id: req.params.id });
  const cat = {
    eng: req.body.eng,
    nep: req.body.nep,
    slug: slugify(req.body.eng.title, {
      replacement: "-",
      remove: undefined,
      lower: true,
      strict: false,
      locale: "vi",
    }),
    userHandle: user.userHandle,
  };

  let allcategory = await Category.find({ userHandle: user.userHandle });
  if (allcategory.length !== 0) {
    const updateCategory = await Category.updateOne(
      { _id: category._id },
      { $set: cat }
    );
    if (!updateCategory)
      return res
        .status(500)
        .send({ message: "There was some error please try again" });
    const result = await category.save();
    if (result) {
      allcategory = await Category.find({ userHandle: user.userHandle });
      const updateUser = await User.updateOne(
        { _id: req.user._id },
        { $set: { categories: allcategory } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });
      const rst = await user.save();
      if (rst) {
        res.status(200).send({ message: "Category Was Updated Successfully" });
      }
    }
  } else {
    const updateCategory = await Category.updateOne(
      { _id: category._id },
      { $set: cat }
    );
    if (!updateCategory)
      return res
        .status(500)
        .send({ message: "There was some error please try again" });

    const result = await category.save();
    if (result) {
      const updateUser = await User.updateOne(
        { _id: req.user._id },
        { $set: { categories: [category] } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });
      const rst = await user.save();
      if (rst) {
        res.status(200).send({ message: "Category Was Updated Successfully" });
      }
    }
  }
});

router.delete("/delete/:id", verify, async (req, res) => {
  //userdata
  const user = await User.findOne({ _id: req.user._id });
  const category = await Category.findOne({ _id: req.params.id });

  let allcategory = await Category.find({ userHandle: user.userHandle });
  if (allcategory.length !== 0) {
    const deleteCategory = await Category.deleteOne({ _id: category._id });
    if (!deleteCategory)
      return res
        .status(500)
        .send({ message: "There was some error please try again" });
    const result = await category.save();
    if (result) {
      allcategory = await Category.find({ userHandle: user.userHandle });
      const updateUser = await User.updateOne(
        { _id: req.user._id },
        { $set: { categories: allcategory } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });
      const rst = await user.save();
      if (rst) {
        res.status(200).send({ message: "Category Was Updated Successfully" });
      }
    }
  } else {
    const deleteCategory = await Category.deleteOne({ _id: category._id });
    if (!deleteCategory)
      return res
        .status(500)
        .send({ message: "There was some error please try again" });

    const result = await category.save();
    if (result) {
      const updateUser = await User.updateOne(
        { _id: req.user._id },
        { $set: { categories: [category] } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });
      const rst = await user.save();
      if (rst) {
        res.status(200).send({ message: "Category Was Updated Successfully" });
      }
    }
  }
});

module.exports = router;
