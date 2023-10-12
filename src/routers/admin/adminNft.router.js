const express = require("express");
const router = express.Router();
var mongoose = require("mongoose");

const {
  CollectionSchema,
} = require("../../models/collection/collection.schema");

const {
  userAuthorization,
  adminUserAuthorization,
} = require("../../middlewares/authorization.middleware");

const { getAllNft, getNftByClientId } = require("../../models/adminNft/adminnft.model");
const { activeDeactiveUser,suspendCollection } = require("../../models/adminUser/admin.user.model");


router.get("/all-users-nft", adminUserAuthorization, async (req, res) => {
  
  const page = req.query.page;
  const limit = req.query.limit;
  const search = req.query.search;
  
  
  

  try {
    // const result = await getAllPasses();
    const user = await getAllNft(page, limit, search);

    

    return res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.post("/getCollectionById", adminUserAuthorization, async (req, res) => {
  try {
    const { _id } = req.body;
    
    var objectId = mongoose.Types.ObjectId(_id);
    // const result = await getAllPasses();
    const user = await getCollectionbyId(objectId);

    

    return res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.post("/deleteCollection", adminUserAuthorization, async (req, res) => {
  try {
    const { _id } = req.body;

    // const result = await getAllPasses();
    const user = await getCollectionbyId(_id);

    

    return res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router;

// const { NftSchema } = require("../nfts/nft.schema");

// const getAllNft = (pageno, limitno) => {

//     return new Promise((resolve, reject) => {

//       try {

//         // const skipNo = (pageno - 1) * (limitno)

//         const collectionInfo = NftSchema.aggregate([

//           {
//             $lookup: {
//               from: "users",       // other table name
//               localField: "clientId",   // name of users table field
//               foreignField: "_id", // name of userinfo table field
//               as: "user_info"         // alias for userinfo table
//             }
//           },

//         ]);

//         resolve(collectionInfo)
//       } catch (error) {
//         reject(error);
//       }
//     });

//   }

//   module.exports = {
//     getAllNft

//   };

//get nft by client id
router.post("/get-nft-by-client-id", async (req, res) => {
    
    
    const page = req.query.page;
    const limit = req.query.limit;
    const search = req.query.search;
    
    
    

    try {
        const clientId  = req.body.id;
        
        const nft = await getNftByClientId(clientId, page, limit, search);
        return res.json({
        status: "success",
        data: nft,
        });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
    }
);

//active deactive user
router.post("/active-deactive-user", async (req, res) => {
    
    
    const { _id, status } = req.body;
    
    
    try {
        const user = await activeDeactiveUser(_id, status);
        return res.json({
        status: "success",
        data: user,
        });
    }
    catch (error) {
        res.json({ status: "error", message: error.message });
    }
    }
);


