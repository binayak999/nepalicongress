const router = require("express").Router();

const CryptoJS = require("crypto-js");
const verify = require("../extra/verifyToken");
const User = require("../model/User");
const Medias = require("../model/Medias");
const fs = require("fs");
const path = require("path");
const CsvReadableStream = require("csv-reader");
const AutoDetectDecoderStream = require("autodetect-decoder-stream");
const Voters = require("../model/Voters");
const VotingMultiple = require("../model/VotingMultiple");

//File Upload For Post
/**
 * @swagger
 * /api/v1/fileupload/post:
 *  post:
 *    consumes:
 *      - multipart/form-data
 *    tags:
 *    - Files
 *    description: Use to for user addpost image
 *    parameters:
 *        - in: formData
 *          name: file
 *          schema:
 *              type: file
 *          description: "Upload Post File"
 *    responses:
 *      '201':
 *          description: A successful uploaded
 */
//post image upload endpoint
router.post("/postimage", async (req, res) => {
  if (req.files === null) {
    res.send(400).send({ message: "File Check you file" });
  }
  //file select in formdata
  const file = req.files.file;
  let imagepath;
  //file path in imagepath

  imagepath = path.normalize(
    __dirname + "/../uploads/" + req.body.imageFile + "/" + req.body.fileType
  );

  //split image data
  const imageName = file.name.split(".");
  //get the extension of file
  const ext = imageName[imageName.length - 1];
  const imageSave = `/nc${req.body.imageFile}${Math.floor(
    Math.random() * 9999999999999
  ).toString()}-${Date.now()}.${ext}`;
  const uploadPath = `${imagepath}${imageSave}`;
  // console.log(req.body)

  file.mv(uploadPath, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.status(201).send({
      fileName: file.name,
      filePath: `/uploads/${req.body.imageFile}/${req.body.fileType}${imageSave}`,
    });
    let medias;

    if (req.body.imageFile === "medias") {
      medias = new Medias({
        name: imageSave,
        usedin: req.body.imageFile,
        fileLocation: `/uploads/${req.body.imageFile}/${req.body.fileType}${imageSave}`,
        assignedTo: req.body.assignedTo,
        fileType: req.body.fileType,
        status: false,
      });
    } else {
      medias = new Medias({
        name: imageSave,
        usedin: req.body.imageFile,
        fileLocation: `/uploads/${req.body.imageFile}/${req.body.fileType}${imageSave}`,
        assignedTo: req.body.assignedTo,
        fileType: req.body.fileType,
        status: true,
      });
    }

    await medias.save();
  });
});

//post upload endpoint
router.delete("/file", (req, res) => {
  //file select in formdata
  const file = req.files.file;
  //file path in imagepath
  const imagepath = path.normalize(__dirname + "/../uploads/posts");
  //split image data
  const imageName = file.name.split(".");
  //get the extension of file
  const ext = imageName[imageName.length - 1];
  const uploadPath = `${imagepath}/ncpost${Math.floor(
    Math.random() * 9999999999999
  ).toString()}-${Date.now()}.${ext}`;

  file.mv(uploadPath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
    res.status(201).send({ fileName: file.name, filePath: uploadPath });
  });
});

//File Upload For Profile
/**
 * @swagger
 * /api/v1/fileupload/profile:
 *  post:
 *    tags:
 *    - Files
 *    description: Use to for user addpost image
 *    produces:
 *       - multipart/form-data
 *    parameters:
 *        - in: formData
 *          name: file
 *          schema:
 *              type: file
 *          description: "Upload Profile Image"
 *    responses:
 *      '201':
 *          description: A successful uploaded and updated
 */
//profile upload endpoint
router.post("/profile", verify, async (req, res) => {
  if (req.files === null) {
    res.send(400).send({ message: "File has been uploaded" });
  }

  //file select in formdata
  const file = req.files.file;
  //file path in imagepath
  const imagepath = path.normalize(__dirname + "/../uploads/profiles");
  //split image data
  const imageName = file.name.split(".");
  //get the extension of file
  const ext = imageName[imageName.length - 1];
  const uploadPath = `${imagepath}/ncprofile${Math.floor(
    Math.random() * 9999999999999
  ).toString()}-${Date.now()}.${ext}`;

  const user = await User.findOne({ _id: req.user._id });

  if (user.profile_image) {
    try {
      fs.unlinkSync(user.profile_image);

      file.mv(uploadPath, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        }
      });
      const updateUser = await User.updateOne(
        { _id: req.user._id },
        { $set: { profile_image: uploadPath } }
      );
      if (!updateUser)
        return res
          .status(500)
          .send({ message: "There was some error please try again" });
      await user.save();
      //create and assign the token
      res.status(201).send({ message: "Profile Image Uploaded Successfully" });
    } catch (err) {
      console.error(err);
    }
  }
});

router.get("/images", async (req, res) => {
  const images = await Medias.find({ fileType: "images", usedin: "medias" });
  let data = [];
  let i = 1;

  images.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ images: Object.assign(data) });
});
router.get("/images/mobile", async (req, res) => {
  const images = await Medias.find(
    { fileType: "images", usedin: "medias", status: true },
    { fileLocation: 1, assignedTo: 1 }
  );
  addFullImageUrl(images);
  res.status(200).send({ images: images });
});
router.get("/videos", async (req, res) => {
  const images = await Medias.find({ fileType: "videos", usedin: "medias" });
  let data = [];
  let i = 1;

  images.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ videos: Object.assign(data) });
});
router.get("/videos/mobile", async (req, res) => {
  const images = await Medias.find(
    { fileType: "videos", usedin: "medias", status: true },
    { fileLocation: 1, assignedTo: 1 }
  );
  addFullImageUrl(images);
  res.status(200).send({ videos: images });
});

function addFullImageUrl(mixArray) {
  // console.log(mixArray)
  mixArray.forEach((ele) => {
    let main = ele.fileLocation;
    let pre = "https://api.nepalicongress.org";
    let final = pre + main;
    ele.fileLocation = final;
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

router.get("/app_images", async (req, res) => {
  const images = await Medias.find({ fileType: "images", usedin: "medias" });
  addFullImageUrl(images);
  let result = pagination(images, parseInt(req.query.page));
  res.status(200).send(result);
});
router.get("/app_videos", async (req, res) => {
  const images = await Medias.find({ fileType: "videos", usedin: "medias" });
  addFullImageUrl(images);
  let result = pagination(images, parseInt(req.query.page));
  res.status(200).send(result);
});

router.get("/files", async (req, res) => {
  const videos = await Medias.find({ usedin: "medias" });
  let data = [];
  let i = 1;

  videos.forEach((post) => {
    data.push(Object.assign(post, { __v: i }));
    i++;
  });
  res.status(200).send({ files: Object.assign(data) });
});

router.delete("/files/:id", async (req, res) => {
  try {
    const videos = await Medias.findOne({ _id: req.params.id });
    const imagepath = path.normalize(__dirname + "/.." + videos.fileLocation);
    fs.unlinkSync(imagepath);

    const delone = await Medias.findByIdAndDelete(req.params.id);
    if (!delone) res.status(404).send("Sorry no file found");

    res.status(200).send({ message: "The file was deleted successfully" });
  } catch (error) {
    console.log("no here", error);
  }
});

router.put("/files/:id", async (req, res) => {
  const video = await Medias.findOne({ _id: req.params.id });
  const videos = await Medias.updateOne(
    { _id: req.params.id },
    { $set: { status: req.body.status } }
  );
  video.save();
  res.status(200).send({ message: "The file updated successfully" });
});

//profile upload endpoint
router.post("/uploadVoters", async (req, res) => {
  if (req.files === null) {
    res.send(400).send({ message: "File has been uploaded" });
  }

  //file select in formdata
  const file = req.files.file;

  //file path in imagepath
  const imagepath = path.normalize(__dirname + "/../uploads/votes");
  //split image data
  const imageName = file.name.split(".");
  //get the extension of file
  const ext = imageName[imageName.length - 1];
  let voters;
  let savebox;
  let phoneExit;
  let cond = false;
  if (ext === "csv") {
    const uploadPath = `${imagepath}/${imageName[0]}.${ext}`;

    try {
      if (fs.existsSync(uploadPath)) {
        fs.unlinkSync(uploadPath);
        file.mv(uploadPath, (err) => {
          if (err) {
            console.error(err);
            res.status(500).send(err);
          }
        });
      } else {
        file.mv(uploadPath, (err) => {
          if (err) {
            console.error(err);
            res.status(500).send(err);
          }
        });
      }

      setTimeout(() => {
        let inputStream = fs
          .createReadStream(uploadPath)
          .pipe(new AutoDetectDecoderStream({ defaultEncoding: "1255" }));
        inputStream
          .pipe(
            new CsvReadableStream({
              parseNumbers: true,
              parseBooleans: true,
              trim: true,
              skipHeader: true,
              asObject: true,
            })
          )
          .on("data", async (row) => {
            row = Object.assign(
              row,
              { votingGroup: req.body.votingGroup },
              { createdAt: Date.now() },
              { updateAt: Date.now() }
            );
            phoneExit = await Voters.findOne({
              phone: row.phone,
              first_name: row.first_name,
              last_name: row.last_name,
              voter_id: row.voter_id,
            });
            if (phoneExit) {
              return;
            }
            if (phoneExit == null) {
              cond = true;
            }
            try {
              voters = new Voters(row);
              savebox = await voters.save();
            } catch (error) {
              console.log(error);
            }
          })
          .on("end", function (data) {});
        setTimeout(() => {
          if (cond) {
            res
              .status(201)
              .send({ message: "Voters has been created successfully" });
          } else {
            res.status(409).send({ message: "Phone Number Already Exits" });
          }
        }, 2000);
      }, 1500);
    } catch (err) {
      console.error(err);
    }
  } else {
    res.status(412).send("The File Should be CSV");
  }
});

module.exports = router;
