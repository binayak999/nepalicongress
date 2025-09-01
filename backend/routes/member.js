const router = require("express").Router();
const OnlineMember = require("./../model/OnlineMember");
const mediaUpload = require("../extra/mediaUpload");
const { default: axios } = require("axios");
const request = require("request");
const globalpagination = require("../extra/globalpagination");
const Medias = require("../model/Medias");
const QRCode = require("qrcode");
const numbermuni = require("../municipality.json");
const mail = require("../extra/mail");
const Khalti = require("../model/Khalti");
const Enquiry = require("../model/Enquiry");

router.post("/create", async (req, res) => {
  try {
    if (req.body._id == undefined) {
      // Check if a member with matching identifiers exists
      const existingMember = await OnlineMember.findOne({
        $or: [
          { phone: req.body.phone },
          { citizenshipno: req.body.citizenshipno },
          { nationalId: req.body.nationalId },
        ],
      });

      // If a member exists and has paymentStatus = true, return error
      if (existingMember && existingMember.paymentStatus === true) {
        let errorMessage = "Online member already exists";

        // Add more specific error message if we can determine which field caused the match
        if (existingMember.phone === req.body.phone) {
          errorMessage = "Please check phone number, we already have this one!";
        } else if (existingMember.citizenshipno === req.body.citizenshipno) {
          errorMessage =
            "Please check Citizenship number, we already have this one!";
        }

        return res.status(400).send({ message: errorMessage });
      }

      // If a member exists but paymentStatus is false, delete the record
      if (existingMember && !existingMember.paymentStatus) {
        await OnlineMember.deleteOne({ _id: existingMember._id });
      }

      // Generate form number
      let baseNumber = 0;
      let checkLength = await OnlineMember.countDocuments({
        numberMix: req.body.workingformnumber,
      });
      baseNumber = checkLength + 1;

      if (baseNumber < 10) {
        baseNumber = "0000" + baseNumber;
      } else if (baseNumber < 100) {
        baseNumber = "000" + baseNumber;
      } else if (baseNumber < 1000) {
        baseNumber = "00" + baseNumber;
      } else if (baseNumber < 10000) {
        baseNumber = "0" + baseNumber;
      }

      let checkNumber = await OnlineMember.findOne({
        workingformnumber: req.body.workingformnumber + baseNumber + 80,
      });

      while (checkNumber) {
        baseNumber += 1;
        checkNumber = await OnlineMember.findOne({
          workingformnumber: req.body.workingformnumber + baseNumber + 80,
        });
      }

      // Create new member
      const onlineMember = new OnlineMember({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        nationalId: req.body.nationalId,
        workingformnumber: req.body.workingformnumber + baseNumber + 80,
        numberMix: req.body.workingformnumber,
        dob: req.body.dob,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        bloodgroup: req.body.bloodgroup,
        casteType: req.body.casteType,
        language: req.body.language,
        occupation: req.body.occupation,
        country: req.body.country,
        province: req.body.province,
        district: req.body.district,
        houseOfRepresentative: req.body.houseOfRepresentative,
        provinceAssembly: req.body.provinceAssembly,
        municipality: req.body.municipality,
        citizenshipno: req.body.citizenshipno,
        connectedTo: req.body.connectedTo,
        ward: req.body.ward,
        tole: req.body.tole,
        paymentStatus: false, // Initialize with payment status as false
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      await onlineMember.save();

      // Handle file uploads
      if (req.files != undefined) {
        if (req.files.passportphoto != undefined) {
          await mediaUpload(
            req.files.passportphoto,
            "onlinemember",
            onlineMember._id,
            "image"
          );
        }
        if (req.files.nationalIdFront != undefined) {
          await mediaUpload(
            req.files.nationalIdFront,
            "onlinemembernationalidfront",
            onlineMember._id,
            "image"
          );
        }
        if (req.files.nationalIdBack != undefined) {
          await mediaUpload(
            req.files.nationalIdBack,
            "onlinemembernationalidback",
            onlineMember._id,
            "image"
          );
        }
      }

      // Process payment
      const khaltiApi = await axios.post(
        "https://khalti.com/api/v2/epayment/initiate/",
        {
          return_url: "https://nepalicongress.org/payment",
          website_url: "https://nepalicongress.org/",
          amount: 2000,
          purchase_order_id: onlineMember._id,
          purchase_order_name: onlineMember.phone,
          customer_info: {
            name: onlineMember.firstName + " " + onlineMember.lastName,
            email: onlineMember.email ? onlineMember.email : "",
            phone: onlineMember.phone,
          },
          amount_breakdown: [
            {
              label: "Membership Fee",
              amount: 2000,
            },
          ],
          product_details: [
            {
              identity: onlineMember._id,
              name: "Nepali Congress Online Membership",
              total_price: 2000,
              quantity: 1,
              unit_price: 2000,
            },
          ],
        },
        {
          headers: {
            Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          },
        }
      );

      if (khaltiApi.status == 200) {
        await OnlineMember.updateOne(
          { _id: onlineMember._id },
          { $set: { khaltiToken: khaltiApi.data.pidx } }
        );

        return res.status(201).send({
          message: "Online Member initiated successfully",
          results: {
            khaltiToken: khaltiApi.data.pidx,
            paymentUrl: khaltiApi.data.payment_url,
          },
        });
      }
    } else {
      // Update existing member
      const onlinemembership = await OnlineMember.find({ _id: req.body._id });
      let data = {};
      if (req.body.firstName != undefined) {
        data.firstName = req.body.firstName;
      }
      if (req.body.middleName != undefined) {
        data.middleName = req.body.middleName;
      }
      if (req.body.lastName != undefined) {
        data.lastName = req.body.lastName;
      }
      if (req.body.nationalId != undefined) {
        data.nationalId = req.body.nationalId;
      }

      if (req.body.dob != undefined) {
        data.dob = req.body.dob;
      }
      if (req.body.email != undefined) {
        data.email = req.body.email;
      }
      if (req.body.phone != undefined) {
        data.phone = req.body.phone;
      }
      if (req.body.address != undefined) {
        data.address = req.body.address;
      }
      if (req.body.bloodgroup != undefined) {
        data.bloodgroup = req.body.bloodgroup;
      }
      if (req.body.casteType != undefined) {
        data.casteType = req.body.casteType;
      }
      if (req.body.language != undefined) {
        data.language = req.body.language;
      }
      if (req.body.occupation != undefined) {
        data.occupation = req.body.occupation;
      }
      if (req.body.country != undefined) {
        data.country = req.body.country;
      }
      if (req.body.province != undefined) {
        data.province = req.body.province;
      }
      if (req.body.district != undefined) {
        data.district = req.body.district;
      }
      if (req.body.houseOfRepresentative != undefined) {
        data.houseOfRepresentative = req.body.houseOfRepresentative;
      }
      if (req.body.provinceAssembly != undefined) {
        data.provinceAssembly = req.body.provinceAssembly;
      }
      if (req.body.municipality != undefined) {
        data.municipality = req.body.municipality;
      }
      if (req.body.citizenshipno != undefined) {
        data.citizenshipno = req.body.citizenshipno;
      }
      if (req.body.connectedTo != undefined) {
        data.connectedTo = req.body.connectedTo;
      }
      if (req.body.ward != undefined) {
        data.ward = req.body.ward;
      }
      if (req.body.tole != undefined) {
        data.tole = req.body.tole;
      }

      // Handle file uploads
      if (req.files != undefined) {
        if (req.files.passportphoto != undefined) {
          await mediaUpload(
            req.files.passportphoto,
            "onlinemember",
            onlinemembership._id,
            "image"
          );
        }
        if (req.files.nationalIdFront != undefined) {
          await mediaUpload(
            req.files.nationalIdFront,
            "onlinemembernationalidfront",
            onlinemembership._id,
            "image"
          );
        }
        if (req.files.nationalIdBack != undefined) {
          await mediaUpload(
            req.files.nationalIdBack,
            "onlinemembernationalidback",
            onlinemembership._id,
            "image"
          );
        }
      }

      await OnlineMember.updateOne({ _id: req.body._id }, { $set: data });

      const onlineMember = await OnlineMember.findOne({
        _id: req.body._id,
      });

      let pp = await Medias.findOne({
        assignedTo: onlineMember._id,
        usedin: "onlinemember",
      }).sort({ createdAt: -1 });
      let ccf = await Medias.findOne({
        assignedTo: onlineMember._id,
        usedin: "onlinemembernationalidfront",
      }).sort({ createdAt: -1 });
      let ccb = await Medias.findOne({
        assignedTo: onlineMember._id,
        usedin: "onlinemembernationalidback",
      }).sort({ createdAt: -1 });

      onlineMember.ppimage = "http://api.nepalicongress.org" + pp.fileLocation;
      onlineMember.ctfimage =
        "http://api.nepalicongress.org" + ccf.fileLocation;
      onlineMember.ctbimage =
        "http://api.nepalicongress.org" + ccb.fileLocation;

      return res.status(200).send({
        message: "User updated successfully",
        results: onlineMember,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});
router.post("/onlineMemberVerify", async (req, res) => {
  try {
    const khaltiApi = await axios.post(
      "https://khalti.com/api/v2/epayment/lookup/",
      {
        pidx: req.body.pidx,
      },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        },
      }
    );
    if (khaltiApi.status == 200) {
      if (khaltiApi.data.status == "Completed") {
        const onlineMember = await OnlineMember.findOne({
          khaltiToken: req.body.pidx,
        });

        if (!onlineMember)
          return res.status(400).send({ message: "User not found!" });

        await OnlineMember.updateOne(
          { khaltiToken: req.body.pidx },
          { $set: { paymentStatus: true } }
        );

        const user = await OnlineMember.findOne({
          khaltiToken: req.body.pidx,
        });
        // try {
        //   request.post(
        //     "https://sms.aakashsms.com/sms/v3/send",
        //     {
        //       json: {
        //         auth_token:
        //           "29ed0ec58213e4d87765d7f47f347c69cda83701b84229d3dd8a0717ac0701b5",
        //         to: `${user.phone}`,
        //         text: `Jay Nepal ${user.firstName} ji,

        //         You have successfully applied for Nepali Congress Membership.

        //         You will get your card in your email id after approval.

        //         Nepali Congress Central Office`,
        //       },
        //     },
        //     function (error, response, body) {
        //       if (!error && response.status == 200) {
        //         // console.log(body);
        //       }
        //     }
        //   );
        // } catch (error) {
        //   console.log(error);
        // }
        return res.status(200).send({
          message: "Payment verified your online membership is completed",
        });
      } else {
        await OnlineMember.deleteOne({ khaltiToken: req.body.pidx });
        return res.status(400).send({
          message:
            "Payment not verified your online membership is not completed yet please try again! By re-registering",
        });
      }
    }
  } catch (error) {
    console.log(error.response.data || error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

router.post("/onlineMembers", async (req, res) => {
  try {
    let filter = {};
    let advFilter = {};
    if (req.body.search != "") {
      filter = {
        $or: [
          {
            firstName: { $regex: req.body.search, $options: "i" },
          },
          {
            lastName: { $regex: req.body.search, $options: "i" },
          },
          {
            middleName: { $regex: req.body.search, $options: "i" },
          },
          {
            phone: { $regex: req.body.search, $options: "i" },
          },
          {
            email: { $regex: req.body.search, $options: "i" },
          },
          {
            address: { $regex: req.body.search, $options: "i" },
          },
          {
            district: { $regex: req.body.search, $options: "i" },
          },
          {
            municipality: { $regex: req.body.search, $options: "i" },
          },
          {
            ward: { $regex: req.body.search, $options: "i" },
          },
          {
            workingformnumber: { $regex: req.body.search, $options: "i" },
          },
        ],
      };
    }

    if (req.body.paymentStatus != undefined) {
      advFilter.paymentStatus = req.body.paymentStatus
        ? true
        : { $exists: false };
    }

    if (req.body.approve != undefined) {
      advFilter.approve = req.body.approve ? true : { $exists: false };
    }

    const onlineMembers = await OnlineMember.find({
      ...filter,
      ...advFilter,
    })
      .sort({ createdAt: -1 })
      .skip(
        (req.body.page - 1) *
          (req.body.limit != undefined ? req.body.limit : 20)
      )
      .limit(req.body.limit != undefined ? req.body.limit : 20);

    const totalOM = await OnlineMember.countDocuments({
      ...filter,
      ...advFilter,
    });

    const pagination = globalpagination(totalOM, req.body.page, req.body.limit);

    return res
      .status(200)
      .send({ results: onlineMembers, pagination: pagination });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

router.get("/onlineMember/:id", async (req, res) => {
  try {
    const onlineMember = await OnlineMember.findOne({
      _id: req.params.id,
    });

    let pp = await Medias.findOne({
      assignedTo: onlineMember._id,
      usedin: "onlinemember",
    }).sort({ createdAt: -1 });
    let ccf = await Medias.findOne({
      assignedTo: onlineMember._id,
      usedin: "onlinemembernationalidfront",
    }).sort({ createdAt: -1 });
    let ccb = await Medias.findOne({
      assignedTo: onlineMember._id,
      usedin: "onlinemembernationalidback",
    }).sort({ createdAt: -1 });

    onlineMember.ppimage = "http://api.nepalicongress.org" + pp.fileLocation;
    onlineMember.ctfimage = "http://api.nepalicongress.org" + ccf.fileLocation;
    onlineMember.ctbimage = "http://api.nepalicongress.org" + ccb.fileLocation;

    return res.status(200).send({ results: onlineMember });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

router.get("/getMembershipNumber/:id", async (req, res) => {
  try {
    const onlineMembers = await OnlineMember.find({
      // _id: req.params.id,
      // paymentStatus: true,
    });

    for (let onlineMember of onlineMembers) {
      let codemuni = 0;

      const getMuni = numbermuni.municipality.filter((ele) => {
        return ele.name == onlineMember.municipality;
      });

      let numberMix =
        onlineMember.province +
        onlineMember.houseOfRepresentative +
        (parseInt(onlineMember.houseOfRepresentative) < 10
          ? "0" + onlineMember.houseOfRepresentative
          : onlineMember.houseOfRepresentative) +
        onlineMember.provinceAssembly +
        getMuni[0].code +
        (parseInt(onlineMember.ward) < 10
          ? "0" + onlineMember.ward
          : onlineMember.ward);

      let baseNumber = 0;
      let checkLength = await OnlineMember.find({
        numberMix: numberMix,
      });
      baseNumber = checkLength.length + 1;

      if (baseNumber < 10) {
        baseNumber = "0000" + baseNumber;
      } else if (baseNumber < 100) {
        baseNumber = "000" + baseNumber;
      } else if (baseNumber < 1000) {
        baseNumber = "00" + baseNumber;
      } else if (baseNumber < 10000) {
        baseNumber = "0" + baseNumber;
      } else {
        baseNumber;
      }

      console.log({
        workingformnumber: numberMix + baseNumber + 80,
        numberMix: numberMix,
      });

      await OnlineMember.updateOne(
        {
          _id: onlineMember._id,
        },
        {
          $set: {
            workingformnumber: numberMix + baseNumber + 80,
            numberMix: numberMix,
          },
        }
      );
    }

    // let pp = await Medias.findOne({
    //   assignedTo: onlineMember._id,
    //   usedin: "onlinemember",
    // }).sort({ createdAt: -1 });
    // let ccf = await Medias.findOne({
    //   assignedTo: onlineMember._id,
    //   usedin: "onlinemembernationalidfront",
    // }).sort({ createdAt: -1 });
    // let ccb = await Medias.findOne({
    //   assignedTo: onlineMember._id,
    //   usedin: "onlinemembernationalidback",
    // }).sort({ createdAt: -1 });

    // onlineMember.ppimage = "http://api.nepalicongress.org" + pp.fileLocation;
    // onlineMember.ctfimage = "http://api.nepalicongress.org" + ccf.fileLocation;
    // onlineMember.ctbimage = "http://api.nepalicongress.org" + ccb.fileLocation;

    return res.status(200).send({ results: onlineMember });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});
router.get("/approveOnlineMember/:id", async (req, res) => {
  try {
    await OnlineMember.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: { approve: true, issuedDate: Date.now() },
      }
    );

    const onlineMember = await OnlineMember.findOne({
      _id: req.params.id,
    });

    let pp = await Medias.findOne({
      assignedTo: onlineMember._id,
      usedin: "onlinemember",
    }).sort({ createdAt: -1 });
    let ccf = await Medias.findOne({
      assignedTo: onlineMember._id,
      usedin: "onlinemembernationalidfront",
    }).sort({ createdAt: -1 });
    let ccb = await Medias.findOne({
      assignedTo: onlineMember._id,
      usedin: "onlinemembernationalidback",
    }).sort({ createdAt: -1 });

    onlineMember.ppimage = "http://api.nepalicongress.org" + pp.fileLocation;
    onlineMember.ctfimage = "http://api.nepalicongress.org" + ccf.fileLocation;
    onlineMember.ctbimage = "http://api.nepalicongress.org" + ccb.fileLocation;

    // try {
    //   request.post(
    //     "https://sms.aakashsms.com/sms/v3/send",
    //     {
    //       json: {
    //         auth_token:
    //           "29ed0ec58213e4d87765d7f47f347c69cda83701b84229d3dd8a0717ac0701b5",
    //         to: `${onlineMember.phone}`,
    //         text: `Dear ${onlineMember.firstName} ji,

    //         You application for Membership of Nepali Congress has been approved.
    //         Please download your card from this Link.

    //         https://nepalicongress.org/online-membership-card/${onlineMember._id} `,
    //       },
    //     },
    //     function (error, response, body) {
    //       if (!error && response.status == 200) {
    //         // console.log(body);
    //       }
    //     }
    //   );
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      let mailOptions = {
        from: `${process.env.MAIL_FROM} <${process.env.MAIL_ADDRESS}>`,
        to: onlineMember.email,
        subject: "Online Membership Card",
        text: `Dear ${onlineMember.firstName} ji,

        Congratulations for being Member of Nepali Congress.
        Please download your card from this Link.
        
        https://nepalicongress.org/online-membership-card/${onlineMember._id}`,
        html: `Dear ${onlineMember.firstName} ji,

        You application for Membership of Nepali Congress has been approved.
        Please download your card from this Link.
        
        https://nepalicongress.org/online-membership-card/${onlineMember._id}`,
      };
      mail(mailOptions);
    } catch (error) {
      console.log(error);
    }

    return res.status(200).send({ results: onlineMember });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

router.get("/onlineMemberUser/:id", async (req, res) => {
  try {
    const onlineMember = await OnlineMember.findOne({
      _id: req.params.id,
    });

    let pp = await Medias.findOne({
      assignedTo: onlineMember._id,
      usedin: "onlinemember",
    }).sort({ createdAt: -1 });
    let ccf = await Medias.findOne({
      assignedTo: onlineMember._id,
      usedin: "onlinemembernationalidfront",
    }).sort({ createdAt: -1 });
    let ccb = await Medias.findOne({
      assignedTo: onlineMember._id,
      usedin: "onlinemembernationalidback",
    }).sort({ createdAt: -1 });

    onlineMember.ppimage = "http://api.nepalicongress.org" + pp.fileLocation;
    onlineMember.ctfimage = "http://api.nepalicongress.org" + ccf.fileLocation;
    onlineMember.ctbimage = "http://api.nepalicongress.org" + ccb.fileLocation;

    let qr = undefined;
    QRCode.toString(
      `https://nepalicongress.org/online-membership-card/${onlineMember._id}`,
      {
        errorCorrectionLevel: "H",
        type: "svg",
        quality: 0.92,
        width: 30,
        margin: 1,
        color: {
          dark: "#008000",
          light: "#FFF",
        },
      },
      function (err, QRcode) {
        if (err) return console.log("error occurred");
        qr = QRcode;

        // Printing the generated code
        return QRcode;
      }
    );

    onlineMember.qr = qr;

    return res.status(200).send({ results: onlineMember });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

router.get("/onlineMemberUserSMS/:id", async (req, res) => {
  try {
    const onlineMember = await OnlineMember.findOne({
      _id: req.params.id,
    });

    try {
      const khaltiApi = await axios.post(
        "https://khalti.com/api/v2/epayment/initiate/",
        {
          return_url: "https://nepalicongress.org/payment",
          website_url: "https://nepalicongress.org/",
          amount: 2000,
          purchase_order_id: onlineMember._id,
          purchase_order_name: onlineMember.phone,
          customer_info: {
            name: onlineMember.firstName + " " + onlineMember.lastName,
            email: onlineMember.email,
            phone: onlineMember.phone,
          },
          amount_breakdown: [
            {
              label: "Membership Fee",
              amount: 2000,
            },
          ],
          product_details: [
            {
              identity: onlineMember._id,
              name: "Nepali Congress Online Membership",
              total_price: 2000,
              quantity: 1,
              unit_price: 2000,
            },
          ],
        },
        {
          headers: {
            Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          },
        }
      );

      if (khaltiApi.status == 200) {
        await OnlineMember.updateOne(
          { _id: onlineMember._id },
          { $set: { khaltiToken: khaltiApi.data.pidx } }
        );

        let mailOptions = {
          from: `${process.env.MAIL_FROM} <${process.env.MAIL_ADDRESS}>`,
          to: onlineMember.email,
          subject: "Online Member Ship Card",
          text: `Respected ${onlineMember.firstName} ji,
It appears that your attempt to apply for membership with the Nepali Congress was unsuccessful due to payment issues.
Kindly make the payment using the provided link.
          ${khaltiApi.data.payment_url}
          NC Central Office.`,
        };
        mail(mailOptions);

        //         try {
        //           request.post(
        //             "https://sms.aakashsms.com/sms/v3/send",
        //             {
        //               json: {
        //                 auth_token:
        //                   "29ed0ec58213e4d87765d7f47f347c69cda83701b84229d3dd8a0717ac0701b5",
        //                 to: onlineMember.phone,
        //                 text: `Respected ${onlineMember.firstName} ji,
        // It appears that your attempt to apply for membership with the Nepali Congress was unsuccessful due to payment issues.
        // Kindly make the payment using the provided link.
        //           ${khaltiApi.data.payment_url}
        //           NC Central Office.`,
        //               },
        //             },
        //             function (error, response, body) {
        //               if (!error && response.status == 200) {
        //                 console.log(body);
        //               }
        //             }
        //           );
        //         } catch (error) {
        //           console.log(error);
        //         }
      }

      return res.status(201).send({
        message: "Online Member intiated successfully",
        results: {
          khaltiToken: khaltiApi.data.pidx,
          paymentUrl: khaltiApi.data.payment_url,
        },
      });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/paymentCheck", async (req, res) => {
  try {
    const onlineMembers = await OnlineMember.find(
      { paymentStatus: { $exists: false }, khaltiTokenNew: { $exists: true } },
      {
        _id: 1,
        email: 1,
        khaltiToken: 1,
        khaltiTokenNew: 1,
        phone: 1,
        firstName: 1,
        lastName: 1,
      }
    );
    let i = 1;
    for (let ele of onlineMembers) {
      try {
        const khaltiApi = await axios.post(
          "https://khalti.com/api/v2/epayment/lookup/",
          {
            pidx: ele.khaltiTokenNew,
          },
          {
            headers: {
              Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
            },
          }
        );
        console.log(onlineMembers.length, onlineMembers.length - i);

        console.log(khaltiApi.data.status);
        if (khaltiApi.status == 200) {
          if (khaltiApi.data.status == "Completed") {
            // const onlineMember = await OnlineMember.findOne({
            //   khaltiTokenNew: ele.khaltiTokenNew,
            // });

            // console.log(onlineMember.email);
            // let khalti = await Khalti.findOne({
            //   phone: ele.phone,
            // });
            // if (khalti) {
            //   console.log(khalti, ele.email, ele.khaltiToken);
            //   await OnlineMember.updateOne(
            //     { phone: ele.phone },
            //     { $set: { khaltiTokenNew: khalti.khaltiToken } }
            //   );
            // } else {
            //   console.log("Not Found");
            // }

            await OnlineMember.updateOne(
              { phone: ele.phone },
              { $set: { paymentStatus: true } }
            );

            // try {
            //   request.post(
            //     "https://sms.aakashsms.com/sms/v3/send",
            //     {
            //       json: {
            //         auth_token:
            //           "29ed0ec58213e4d87765d7f47f347c69cda83701b84229d3dd8a0717ac0701b5",
            //         to: `${ele.phone}`,
            //         text: `Jay Nepal ${ele.firstName} ji,

            //             You have successfully applied for Nepali Congress Membership.

            //             You will get your card in your email id after approval.

            //             Nepali Congress Central Office`,
            //       },
            //     },
            //     function (error, response, body) {
            //       if (!error && response.status == 200) {
            //         // console.log(body);
            //       }
            //     }
            //   );
            // } catch (error) {
            //   console.log(error);
            // }
          }
        }
      } catch (error) {
        console.log(error);
      }
      i++;
    }
    return res.status(200).send({
      message: "Checked",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

router.post("/paidNotAMember", async (req, res) => {
  try {
    const onlineMember = await OnlineMember.findOne({
      phone: req.body.phone,
      citizenshipno: req.body.citizenshipno,
    });
    if (!onlineMember) {
      return res.status(400).send({ message: "User not found!" });
    }
    if (onlineMember.paymentStatus) {
      return res.status(200).send({
        message: "You are already a member!",
        results: {
          paymentUrl: "https://nepalicongress.org",
        },
      });
    }

    const enquiry = new Enquiry({
      phone: req.body.phone,
      citizenshipno: req.body.citizenshipno,
      createdAt: Date.now(),
      updateAt: Date.now(),
    });
    await enquiry.save();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

router.post("/reIntiatePayment", async (req, res) => {
  try {
    const onlineMember = await OnlineMember.findOne({
      phone: req.body.phone,
      citizenshipno: req.body.citizenshipno,
    });
    if (!onlineMember) {
      return res.status(400).send({ message: "User not found!" });
    }

    if (onlineMember.paymentStatus) {
      return res.status(200).send({
        message: "You are already a member!",
        results: {
          paymentUrl: "https://nepalicongress.org",
        },
      });
    }

    const khaltiApi = await axios.post(
      "https://khalti.com/api/v2/epayment/initiate/",
      {
        return_url: "https://nepalicongress.org/payment",
        website_url: "https://nepalicongress.org/",
        amount: 2000,
        purchase_order_id: onlineMember._id,
        purchase_order_name: onlineMember.phone,
        customer_info: {
          name: onlineMember.firstName + " " + onlineMember.lastName,
          email: onlineMember.email ? onlineMember.email : "",
          phone: onlineMember.phone,
        },
        amount_breakdown: [
          {
            label: "Membership Fee",
            amount: 2000,
          },
        ],
        product_details: [
          {
            identity: onlineMember._id,
            name: "Nepali Congress Online Membership",
            total_price: 2000,
            quantity: 1,
            unit_price: 2000,
          },
        ],
      },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        },
      }
    );

    if (khaltiApi.status == 200) {
      await OnlineMember.updateOne(
        { _id: onlineMember._id },
        { $set: { khaltiToken: khaltiApi.data.pidx } }
      );

      return res.status(201).send({
        message: "Online Member intiated successfully",
        results: {
          khaltiToken: khaltiApi.data.pidx,
          paymentUrl: khaltiApi.data.payment_url,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!" });
  }
});

module.exports = router;
