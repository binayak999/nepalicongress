const router = require("express").Router();
const AppVersion = require("../model/AppVersion");


router.get("/versionApp", async (req, res) => {
  try {
    const versionCheck = await AppVersion.findOne();
    return res
      .status(200)
      .send({ message: "App version", results: versionCheck });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
});


module.exports = router;
