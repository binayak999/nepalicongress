const express = require("express");
const notify = require("../extra/notification");
const router = express.Router();
const Notification = require("../model/Notification");
const User = require("../model/User");
const Devices = require("../model/Devices");
const verify = require("../extra/verifyToken");
const { query } = require("express");
const NotificationHistory = require("../model/NotificationHistory");
const { deviceValidation } = require("../validation/deviceValidation");

router.post("/register", async (req, res) => {
  // validations applying
  const { error } = deviceValidation(req.body);
  if (error) return res.status(422).send({ message: error.details[0].message });
  let deviceSingle = await Devices.findOne({
    deviceToken: req.body.deviceToken,
  });
  if (!deviceSingle) {
    try {
      let device = new Devices({
        deviceToken: req.body.deviceToken,
        email: req.body.email != undefined ? req.body.email : null,
        phone: req.body.phone != undefined ? req.body.phone : null,
        notificationFor:
          req.body.notificationFor != undefined
            ? req.body.notificationFor
            : "all",
      });

      const saveDev = await device.save();

      if (saveDev) {
        res
          .status(201)
          .send({ message: "Your device has been successfully registered" });
      } else {
        res.status(400).send({ message: "Something went wrong!" });
      }
    } catch (error) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  } else {
    await Devices.updateOne(
      { deviceToken: deviceSingle.deviceToken },
      {
        $set: {
          email: req.body.email,
          phone: req.body.phone,
          notificationFor: req.body.notificationFor,
        },
      }
    );
    await deviceSingle.save();
    return res.status(200).send({ message: "Your device has been updated" });
  }
});

router.post("/create", verify, async (req, res) => {
  let user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(404).semd({ message: "User not found !" });

  let notifcationBody = new Notification({
    eng: req.body.eng,
    nep: req.body.nep,
    slug: req.body.slug,
    id: req.body.id,
    image: req.body.images[0],
    view: false,
    notificationFor: req.body.notificationFor,
    notificationGroup: req.body.notificationGroup,
    notificationLink: req.body.notificationLink,
    userHandle: user.userHandle,
    createdAt: Date.now(),
    updateAt: Date.now(),
  });

  try {
    await notifcationBody.save();
    res.status(201).send({ message: "Notification has been created !" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

function addFullImageUrl(mixArray) {
  mixArray.forEach((ele) => {
    let pageLink = `https://nepalicongress.org/single/${ele.notificationFor}/${ele.slug}/?nohead=true`;
    let main = ele.fileLocation;
    let pre = "https://api.nepalicongress.org";
    let final = pre + main;
    ele.image = final;
    ele.slug = pageLink;
  });
}

function pagination(mixArray, page) {
  const limit = 10;
  const total = parseInt(mixArray.length / 10);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};
  results.total = total;
  if (endIndex < mixArray.length) {
    results.next = page + 1;
  }

  if (startIndex > 0) {
    results.previous = page - 1;
  }

  results.results = mixArray.slice(startIndex, endIndex);

  return results;
}

router.get("/app-notifications", async (req, res) => {
  try {
    const allNotifications = await Devices.find(
      {
        deviceToken: req.query.deviceToken,
      },
      {
        notifications: 1,
        _id: 0,
      }
    );

    if (allNotifications.length == 0)
      return res.status(200).send({ message: "No History of notification" });

    addFullImageUrl(allNotifications[0].notifications);
    let notification = pagination(
      allNotifications[0].notifications,
      parseInt(req.query.page)
    );

    // console.log(notification);
    res.status(200).send(notification);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", verify, async (req, res) => {
  const allNotifications = await Notification.find();
  res.status(200).send({ notifications: allNotifications });
});

router.get("/history", verify, async (req, res) => {
  const allNotifications = await NotificationHistory.find();
  res.status(200).send({ notifications: allNotifications });
});

function addFullImageUrlOne(mixArray) {
  // console.log(mixArray);
  if (mixArray.slug != "") {
    let pageLink = `https://nepalicongress.org/single/${mixArray.notificationFor}/${mixArray.slug}/?nohead=true`;

    mixArray.slug = pageLink;
  }

  let main = mixArray.image.fileUrl;
  let pre = "https://api.nepalicongress.org";
  let final = pre + main;
  mixArray.image.fileUrl = final;

  return mixArray;
}
router.post("/sendnotification", verify, async (req, res) => {
  try {
    var noti = await Notification.findOne(
      {
        _id: req.body.id,
      },
      { userHandle: 0 }
    );
    // console.log(noti);

    if (!noti)
      return res.status(404).send({ message: "Notification Not Found!" });

    let user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(404).semd({ message: "User not found !" });

    var devices;

    if (req.body.notificationFor != "all") {
      devices = await Devices.find(
        {},
        {
          deviceToken: 1,
          _id: 0,
        }
      );
    } else {
      devices = await Devices.find(
        {
          notificationFor: "all",
        },
        {
          deviceToken: 1,
          _id: 0,
        }
      );
    }

    let dev = [];
    devices.forEach(async (ele) => {
      dev.push(ele.deviceToken);

      var allnotification = await Devices.find(
        {
          deviceToken: ele.deviceToken,
        },
        {
          notifications: 1,
          _id: 0,
        }
      );

      allnotification[0].notifications.push(noti);

      await Devices.updateOne(
        {
          deviceToken: ele.deviceToken,
        },
        {
          $set: {
            notifications: allnotification[0].notifications,
          },
        }
      );
    });

    let newnoti;
    if (noti.image != undefined) {
      newnoti = addFullImageUrlOne(noti);
    } else {
      newnoti = noti;
    }

    let notifcationBody = new NotificationHistory({
      eng: noti.eng,
      nep: noti.nep,
      slug: noti.slug != undefined ? noti.slug : "",
      id: noti.id != undefined ? noti.id : "",
      image: noti.image,
      view: false,
      notificationFor: noti.notificationFor,
      notificationGroup: noti.notificationGroup,
      notificationLink: noti.notificationLink,
      userHandle: user.userHandle,
      numberofdevices: devices.length,
      createdAt: Date.now(),
      updateAt: Date.now(),
    });

    notifcationBody.save();
    let firebase = {
      title: noti.eng.title,
      text: noti.eng.content,
    };

    var notification_body = {
      notification: firebase,
      registration_ids: dev,
      data: newnoti,
    };

    await notify(notification_body, res);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});

router.post("/view", verify, async (req, res) => {
  var notificationall = await Devices.findOne(
    {
      deviceToken: req.body.deviceToken,
    },
    { notifications: 1 }
  );

  var deviceNotification = notificationall.notifications;
  var viewedNotification = [];

  deviceNotification.forEach((ele) => {
    if (ele._id == req.body.notification_id) {
      ele.view = true;
    }
    viewedNotification.push(ele);
  });

  var notifications = await Devices.updateOne(
    {
      deviceToken: req.body.deviceToken,
    },
    {
      $set: {
        notifications: deviceNotification,
      },
    }
  );

  try {
    await notificationall.save();
    pagination(deviceNotification, 1);
    res.status(200).send({
      message: "Notification has been seen",
      results: deviceNotification,
    });
  } catch (error) {
    res.status(200).send({ message: "Something went wrong !" });
  }
});

module.exports = router;
