 // let allInclusiveMain = await Circular.aggregate([
      //   {
      //     $match: {
      //       status: {
      //         $ne: false,
      //       },
      //       membername: {
      //         $ne: " ",
      //       },
      //     },
      //   },
      //   {
      //     $group: {
      //       _id: "$inclusivegroup",
      //       count: {
      //         $sum: 1,
      //       },
      //     },
      //   },
      //   {
      //     $project: {
      //       title: "$_id",
      //       count: "$count",
      //       _id: 0,
      //     },
      //   },
      // ]);
      // let allGenderMain = await Circular.aggregate([
      //   {
      //     $match: {
      //       status: {
      //         $ne: false,
      //       },
      //       membername: {
      //         $ne: " ",
      //       },
      //     },
      //   },
      //   {
      //     $group: {
      //       _id: "$gender",
      //       count: {
      //         $sum: 1,
      //       },
      //     },
      //   },
      //   {
      //     $project: {
      //       title: "$_id",
      //       count: "$count",
      //       _id: 0,
      //     },
      //   },
      // ]);
      // let allAge = await Circular.aggregate([
      //   {
      //     $match: {
      //       status: {
      //         $ne: false,
      //       },
      //       membername: {
      //         $ne: " ",
      //       },
      //     },
      //   },
      //   {
      //     $group: {
      //       _id: "$age",
      //       count: {
      //         $sum: 1,
      //       },
      //     },
      //   },
      //   {
      //     $project: {
      //       title: "$_id",
      //       count: "$count",

      //       _id: 0,
      //     },
      //   },
      // ]);
      // let allMain = await Circular.aggregate([
      //   {
      //     $match: {
      //       status: {
      //         $ne: false,
      //       },
      //       membername: {
      //         $ne: " ",
      //       },
      //     },
      //   },
      //   {
      //     $group: {
      //       _id: "$memberType",
      //       count: {
      //         $sum: 1,
      //       },
      //     },
      //   },
      //   {
      //     $project: {
      //       title: "$_id",
      //       count: "$count",
      //       _id: 0,
      //     },
      //   },
      // ]);

      // let allInclusive = await Circular.aggregate([
      //   {
      //     $match: filterData,
      //   },
      //   {
      //     $group: {
      //       _id: "$inclusivegroup",
      //       count: {
      //         $sum: 1,
      //       },
      //     },
      //   },
      //   {
      //     $project: {
      //       title: "$_id",
      //       count: "$count",
      //       _id: 0,
      //     },
      //   },
      // ]);

      // let allActiveMemberDistrict = await Circular.aggregate([
      //   {
      //     $match: filterData,
      //   },
      //   {
      //     $group: {
      //       _id: "$memberType",
      //       count: {
      //         $sum: 1,
      //       },
      //     },
      //   },
      //   {
      //     $project: {
      //       title: "$_id",
      //       count: "$count",
      //       _id: 0,
      //     },
      //   },
      // ]);

      // let allActiveMemberGenderDistrict = await Circular.aggregate([
      //   {
      //     $match: filterData,
      //   },
      //   {
      //     $group: {
      //       _id: "$gender",
      //       count: {
      //         $sum: 1,
      //       },
      //     },
      //   },
      //   {
      //     $project: {
      //       title: "$_id",
      //       count: "$count",
      //       _id: 0,
      //     },
      //   },
      // ]);

      // let allActiveMemberAgeDistrict = await Circular.aggregate([
      //   {
      //     $match: filterData,
      //   },
      //   {
      //     $group: {
      //       _id: "$age",
      //       count: {
      //         $sum: 1,
      //       },
      //     },
      //   },
      //   {
      //     $project: {
      //       title: "$_id",
      //       count: "$count",
      //       _id: 0,
      //     },
      //   },
      // ]);

      // let allPhoneAdded = await Circular.find({
      //   status: {
      //     $ne: false,
      //   },
      //   membername: {
      //     $ne: " ",
      //   },
      //   phone: {
      //     $ne: "",
      //   },
      // }).countDocuments();

      // let allPhoneNotAdded = await Circular.find({
      //   status: {
      //     $ne: false,
      //   },
      //   membername: {
      //     $ne: " ",
      //   },
      //   phone: "",
      // }).countDocuments();