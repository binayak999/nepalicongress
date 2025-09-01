const router = require("express").Router();
const HitCount = require("../model/HitCount");

router.post("/add", async (req, res) => {
  try {
    const hit = new HitCount({
      count: 1065885,
      counter: "counter",
      createdAt: Date.now(),
      updateAt: Date.now(),
    });
    hit.save();
    res.status(200).send("Done");
  } catch (error) {
    console.log(error);
  }
});

router.put("/", async (req, res) => {
  try {
    const hit = await HitCount.findOne({ counter: "counter" });
    const updateUser = await HitCount.updateOne(
      { counter: "counter" },
      { $set: { count: hit.count == null ? 1 : hit.count + 1 } }
    );
    hit.save();
    res.status(200).send(hit);
  } catch (error) {
    console.log(error);
  }
});

router.get("/hit", async (req, res) => {
  try {
    const hit = await HitCount.findOne({ counter: "counter" });
    res.status(200).send(hit);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
