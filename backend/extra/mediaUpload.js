const Medias = require("../model/Medias");
const fs = require("fs");
const path = require("path");

const mediaUpload = async (image, postType, assignedTo, fileType) => {
    try {
      //file select in formdata
      const file = image;
      let imagepath;
      //file path in imagepath
  
      imagepath = path.normalize(__dirname + "/../medias/" + postType);
  
      //split image data
      const imageName = file.name.split(".");
      //get the extension of file
      const ext = imageName[imageName.length - 1];
      const imageSave = `/nc${postType}${Math.floor(
        Math.random() * 9999999999999
      ).toString()}-${Date.now()}.${ext}`;
      const uploadPath = `${imagepath}${imageSave}`;
      // console.log(req.body)
  
      file.mv(uploadPath, async (err) => {
        if (err) {
          console.error(err);
        }
        let media = new Medias({
          name: imageSave,
          usedin: postType,
          fileLocation: `/medias/${postType}${imageSave}`,
          assignedTo: assignedTo,
          fileType: fileType,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
  
        await media.save();
        return media._id;
      });

    } catch (error) {
      console.log(error);
    }
  };


  module.exports = mediaUpload;