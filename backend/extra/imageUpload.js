// import path from "path";
// import imagemin from "imagemin";
// import imageminJpegtran from "imagemin-jpegtran";
// import mozjpeg from "imagemin-mozjpeg";
// import fs from "fs";

const path = require("path");
const imageUploader = async (req, saveFor) => {

  try {
    return await delayedLog(req, saveFor);
  } catch (error) {
    console.log(error);
  }
};

async function delayedLog(req, saveFor) {

  let imageUrls = [];
  const files = req;
  let i = 0;
  if (files.length != undefined) {
    for await (const element of files) {
      i++;

      imageUrls.push(await compressImages(element, saveFor));
    }

    return imageUrls;
  } else {
    imageUrls.push(await compressImages(files, saveFor));

    return imageUrls;
  }
}

const compressImages = async (files, saveFor) => {
  let imagepath = path.normalize(
    __dirname + "/../uploads/" + saveFor + "/" + "pdf"
  );

  let imageName = files.name.split(".");
  let ext = imageName[imageName.length - 1];
  let imageSave = `/nc${saveFor}${Math.floor(
    Math.random() * 23
  ).toString()}-${Date.now()}.${ext}`;
  let uploadPath = `${imagepath}${imageSave}`;

  await files.mv(uploadPath, async (err) => {
    err;
  });

  let fileData = {
    imageName: files.name,
    fileType: "pdf",
    imageSave: imageSave,
    fileLocation: `/uploads/${saveFor}/pdf${imageSave}`,
  };

  return fileData;
};

module.exports = imageUploader;
