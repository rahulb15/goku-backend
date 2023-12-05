const express = require("express");
const router = express.Router();
const { NftSchema } = require("../models/nfts/nft.schema");
const { UserSchema } = require("../models/user/user.schema");
const mongoose = require("mongoose");

const { imageUpload } = require("../helpers/cloudinary.helper");
const {
  userAuthorization,
} = require("../middlewares/authorization.middleware");
const { insertNftDetails } = require("../models/nfts/nft.model");

const { getUserById, getUserByWallet } = require("../models/user/user.model");

const {
  getNftCollectionOfUser,
  getNftCollectionById,
  getNftById,
  getNftById2,
  getNftCollectionByIdMarketPlace,
  getNftCollectionByIdMarketPlaceOff,
  getUserNftMarketplaceTrueAllCollectionOnAuction,
  getUserNftMarketplaceTrueAllCollectionOnSale,
  getUserNftMarketplaceFalse,
  getAllNftOnAuction,
  getUserNftMarketplaceTrueAll,
  getNftByIdForCandleStickChart,
  // getCountNftUniqueOwner,
  // addTotalNftPrice,
  // getBaseNftPrice,
} = require("../models/nfts/nft.model");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

var multipart = require("connect-multiparty");
const nftSchema = require("../models/nfts/nft.schema");
const multipartMiddleware = multipart();
const { ActivitySchema } = require("../models/activityModal/activity.schema");
router.post("/add-nft", userAuthorization, async (req, res) => {
  
  
  const clientId = req.body.clientId;
  const users = await getUserById(clientId);
  
  const creatorName = users.name;

  const {
    onMarketplace,
    sellingType,
    nftPrice,
    imageIndex,
    unlockable,
    digitalCode,
    description,
    externalLink,
    roylaities,
    properties1,
    properties2,
    collectionId,
    tokenId,
  } = req.body;
  //     // const {path}=req.file
  //    // let uploadedImage = await imageUpload(req.files.avatar)

  try {
    const newCollectionObj = {
      clientId,
      onMarketplace,
      sellingType,
      nftPrice,
      unlockable,
      digitalCode,
      collectionId,
      description,
      externalLink,
      roylaities,
      properties1,
      properties2,
      creatorName,
      imageIndex: imageIndex ? imageIndex : "",
      tokenId,
    };

    const result = await insertNftDetails(newCollectionObj);

    

    res.json({ status: "success", message: "New NFT created" });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
});

router.get("/user-nft", userAuthorization, async (req, res) => {
  try {
    const id = req.userId;
    
    // const result = await getAllPasses();
    // const userNft = await NftSchema.find({ clientId: id });

    // findandupdate nft by id and update views by 1
    const userNft = await NftSchema.findOneAndUpdate(
      { clientId: id },
      { $inc: { views: 1 } }
    );

    
    // const uniqueOwner = await getCountNftUniqueOwner(id);
    // const addTotalNftPrice1 = await addTotalNftPrice(id);
    // const base = await getBaseNftPrice(id);
    

    return res.json({
      status: "success",
      data: userNft,
      // uniqueOwner: uniqueOwner.length,
      // totalNftPrice: addTotalNftPrice1[0].total,
      // baseNftPrice: base[0].lowestPrice,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.post("/collection-nft", async (req, res) => {
  try {
    // const id = req.userId;
    const { collectionId, search } = req.body;
    const page = req.query.page;
    const limit = req.query.limit;
    
    // const result = await getAllPasses();
    const userNftCollection = await getNftCollectionById(
      collectionId,
      page,
      limit,
      search
    );

    

    return res.json({
      status: "success",
      data: userNftCollection,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.post("/collection-nft-marketplace", async (req, res) => {
  try {
    // const id = req.userId;
    const { collectionId, search, minAmount, maxAmount, selected } = req.body;
    const page = req.query.page;
    const limit = req.query.limit;
    
    // const result = await getAllPasses();
    const userNftCollection = await getNftCollectionByIdMarketPlace(
      collectionId,
      page,
      limit,
      search,
      minAmount,
      maxAmount,
      selected
    );

    

    return res.json({
      status: "success",
      data: userNftCollection,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.post("/user-own-nft", userAuthorization, async (req, res) => {
  try {
    const id = req.userId;
    const { collectionId } = req.body;
    
    const frmData = {
      collectionId,
      clientId: id,
    };
    // const result = await getAllPasses();
    const userNftCollection = await getNftCollectionOfUser(frmData);

    

    return res.json({
      status: "success",
      data: userNftCollection,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.post("/getNftbyId", async (req, res) => {
  try {
    const { _id } = req.body;

    // const result = await getAllPasses();
    const userNft = await getNftById(_id);

    

    return res.json({
      status: "success",
      data: userNft,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.post("/getNftByIdForCandleStickChart", async (req, res) => {
  try {
    const { _id } = req.body;

    // const result = await getAllPasses();
    const userNft = await getNftByIdForCandleStickChart(_id);


    return res.json({
      status: "success",
      data: userNft,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});




router.post("/getNftbyId2", async (req, res) => {
  try {
    const { _id } = req.body;

    // const result = await getAllPasses();
    const userNft = await getNftById2(_id);

    

    return res.json({
      status: "success",
      data: userNft,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.get("/all-users-nft", async (req, res) => {
  const { page, limit } = req.query;
  
  
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};
  if (endIndex < (await NftSchema.countDocuments().exec())) {
    results.next = {
      count: await NftSchema.countDocuments().exec(),
      page: page,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    results.previous = {
      count: await NftSchema.countDocuments().exec(),
      page: page,
      limit: limit,
    };
  }

  try {
    const userNft = await NftSchema.find()
      .limit(limit * 1)
      .skip(startIndex)
      .exec();
    results.results = userNft;
    res.json({ status: "success", data: results });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.get("/all-users-nft-hot-collections", async (req, res) => {
  const { page, limit } = req.query;
  
  
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};
  if (endIndex < (await NftSchema.countDocuments().exec())) {
    results.next = {
      count: await NftSchema.countDocuments().exec(),
      page: page,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    results.previous = {
      count: await NftSchema.countDocuments().exec(),
      page: page,
      limit: limit,
    };
  }

  try {
    const userNft = await NftSchema.find()
      .populate("clientId")
      .populate("collectionId")
      .limit(limit * 1)
      .skip(startIndex)
      .exec();
    results.results = userNft;
    res.json({ status: "success", data: results });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});


router.get("/all-users-nft-hot-collections-1", async (req, res) => {
  //using aggregate get collection with nfts but collection is unique
  const getCollectionWithNfts = await NftSchema.aggregate([
    {
      $match: {
        onMarketplace: true,
      },
    },
    {
      $group: {
        _id: "$collectionId",
        nft: { $push: "$$ROOT" },
      },
    },

    {
      $lookup: {
        from: "collections",
        localField: "_id",
        foreignField: "_id",
        as: "collection",
      },
    },
    {
      $unwind: "$collection",
    },
    {
      $project: {
        _id: "$collection._id",
        name: "$collection.collectionName",
        minNftPrice: "$collection.minNftPrice",
        totalNftUser: "$collection.totalNftUser",
        totalNftPrice: "$collection.totalNftPrice",
        image: "$collection.imageUrl",
        nft: "$nft",
      },
    },
  ]);
  

  return res.json({
    status: "success",
    data: getCollectionWithNfts,
  });
}
);


router.get("/all-users-nft-views", async (req, res) => {
  //using aggregate get all nfts sorted by views and limit to 10
  const getCollectionWithNfts = await NftSchema.aggregate([
    {
      $match: {
        onMarketplace: true,
      },
    },
    {
      $sort: {
        views: -1,
      },
    },
    {
      $limit: 10,
    },
  ]);

  
   

  return res.json({
    status: "success",
    data: getCollectionWithNfts,
  });
}
);


router.post(
  "/all-users-nft-hot-collections-by-collectionId",
  async (req, res) => {
    const { page, limit, collectionId } = req.body;
    
    
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    if (endIndex < (await NftSchema.countDocuments().exec())) {
      results.next = {
        count: await NftSchema.countDocuments().exec(),
        page: page,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        count: await NftSchema.countDocuments().exec(),
        page: page,
        limit: limit,
      };
    }

    try {
      const userNft = await NftSchema.find({ collectionId: collectionId })
        .limit(limit * 1)
        .skip(startIndex)
        .exec();
      results.results = userNft;
      res.json({ status: "success", data: results });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  }
);

router.patch("/user-nft", userAuthorization, async (req, res) => {
  try {
    const id = req.userId;
    
    // const result = await getAllPasses();
    const userNft = await NftSchema.find({ clientId: id });

    

    return res.json({
      status: "success",
      data: userNft,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

//find and update nft by id
router.patch("/update-nft", userAuthorization, async (req, res) => {
  try {
    const clientId = req.userId;
    const {
      _id,
      bidder,
      collectionName,
      tokenId,
      creator,
      tokenImage,
      revealed,
      hash,
      imageIndex,
      onMarketplace,
      sellingType,
      nftPrice,
      duration,
      onSale,
      onAuction,
      history,
      fileImageUrl,
      fileName
    } = req.body;
    const { bidPrice } = req.body;

    let newHistoryEntry = null;

    if (
      history?.category == "bid" ||
      history?.category == "buy" ||
      history?.category == "sale" ||
      history?.category == "transfer" ||
      history?.category == "auction" ||
      history?.category == "mint" ||
      history?.category == "cancelAuction" ||
      history?.category == "closeSale" ||
      history?.category == "cancelBid"
    ) {
      newHistoryEntry = {
        owner: history.owner,
        price: history.price,
        category: history.category,
        date: new Date(), // Use the provided date or the current date
      };
    }

    let newBidObj = null;
    if (onAuction) {
      newBidObj = {
        bidPrice,
        bidder: bidder,
        bidTime: new Date(),
      };
    }

    const obj = {
      collectionName,
      tokenId,
      creator,
      tokenImage,
      isRevealed: revealed,
      hash,
      imageIndex: imageIndex ? imageIndex : "",
      onMarketplace: onMarketplace ? onMarketplace : false,
      sellingType,
      nftPrice: nftPrice ? nftPrice : 0,
      duration,
      onSale: onSale ? onSale : false,
      onAuction: onAuction ? onAuction : false,
      fileImageUrl,
      fileName
    };
    

    
    const id = req.userId;
    

    //Create an update object based on the presence of newBidObj
    const updateObj = {
      $set: obj, // Add the 'obj' to the update
    };

    // Conditionally add newBidObj to the update
    if (newBidObj) {
      updateObj.$push = {
        bidInfo: {
          $each: [newBidObj],
          $sort: { bidTime: -1 }, // Sort in descending order based on bidTime
        },
      };
      const updateNft1 = await NftSchema.findByIdAndUpdate(_id, updateObj, {
        new: true,
      });
    }
    

    // Conditionally add newHistoryEntry to the update
    if (newHistoryEntry) {
      updateObj.$push = {
        history: {
          $each: [newHistoryEntry],
          $sort: { date: -1 }, // Sort in descending order based on bidTime
        },
      };
    }

    // Update the document
    const updateNft = await NftSchema.findByIdAndUpdate(_id, updateObj, {
      new: true,
    });
    console.log(updateNft, "updateNftxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", clientId);
    console.log(history?.category ? history?.category === "buy" ? "purchase" : history?.category === "auction" ? "listing" : history?.category : "");

    if(
      history?.category == "bid" ||
      history?.category == "transfer" ||
      history?.category == "mint" ||
      history?.category == "sale" ||
      history?.category == "auction"
    )
    {
      const newActivityObj = {
        clientId,
        activityType: history?.category ? history?.category === "buy" ? "purchase" : history?.category === "auction" ? "listing" : history?.category : "",
        nftId: updateNft._id,
        activityInfo: "You have "+history?.category+" a NFT",
        collectionName : updateNft.collectionName,
        activityStatus : history?.category ? history?.category === "buy" ? "Purchase" : history?.category === "auction" ? "Listing" : history?.category : "",
        collectionId : updateNft.collectionId,
        activityImageUrl : updateNft.tokenImage,
      };
      console.log(newActivityObj,"newActivityObjnewActivityObjnewActivityObjnewActivityObjnewActivityObj");
      const resultActivity = await ActivitySchema.create(newActivityObj);
    }
    

    

    return res.json({
      status: "success",
      data: updateNft,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

//find if gift tokenId is already exist or not and update nft by id
router.patch("/update-nft-gift", userAuthorization, async (req, res) => {
  try {
    const clientId = req.userId;
    const {
      tokenId,
      creator,
      sellingType,
      imageIndex,
      onMarketplace,
      duration,
      onSale,
      onAuction,
      bidPrice,
      bidder,
      history,
    } = req.body;

    //find creator in user table
    const findUSer = await UserSchema.findOne({ walletAddress: creator });

    //if user not found then delete nft
    if (!findUSer) {
      //delete nft from nft table in db
      const deleteNft = NftSchema.remove({ tokenId: tokenId });
      
      return res.json({
        status: "success",
        data: deleteNft,
      });
    }

    let newHistoryEntry = null;
    // enum: ["mint", "sale", "bid", "transfer","like","purchase","listing" ],
   


    if (
      history?.category == "bid" ||
      history?.category == "buy" ||
      history?.category == "sale" ||
      history?.category == "transfer" ||
      history?.category == "auction" ||
      history?.category == "mint" ||
      history?.category == "cancelAuction" ||
      history?.category == "closeSale" ||
      history?.category == "cancelBid"
    ) {
      newHistoryEntry = {
        owner: history.owner,
        price: history.price,
        category: history.category,
        date: new Date(), // Use the provided date or the current date
      };
    }

    let newBidObj = null;
    if (onAuction) {
      newBidObj = {
        bidPrice,
        bidder: bidder,
        bidTime: new Date(),
      };
    }

    const obj = {
      creator,
      // imageIndex: imageIndex ? imageIndex : "",
      onAuction: onAuction ? onAuction : false,
      // isRevealed:false,
      clientId: mongoose.Types.ObjectId(findUSer._id),
      sellingType: sellingType ? sellingType : "All",
      onMarketplace: onMarketplace ? onMarketplace : false,
      duration,
      creatorName: findUSer.name,
      onSale: onSale ? onSale : false,
    };

    //Create an update object based on the presence of newBidObj
    const updateObj = {
      $set: obj, // Add the 'obj' to the update
    };

    // Conditionally add newBidObj to the update
    if (newBidObj) {
      updateObj.$push = {
        bidInfo: {
          $each: [newBidObj],
          $sort: { bidTime: -1 }, // Sort in descending order based on bidTime
        },
      };
      const findByTokenIdAndUpdate = await NftSchema.findOneAndUpdate(
        { tokenId: tokenId },
        updateObj,
        {
          new: true,
        }
      );
    }

    // Conditionally add newHistoryEntry to the update
    if (newHistoryEntry) {
      updateObj.$push = {
        history: {
          $each: [newHistoryEntry],
          $sort: { date: -1 }, // Sort in descending order based on bidTime
        },
      };
    }

    const findByTokenIdAndUpdate = await NftSchema.findOneAndUpdate(
      { tokenId: tokenId },
      updateObj,
      {
        new: true,
      }
    );

    console.log(findByTokenIdAndUpdate, "findByTokenIdAndUpdatexxxxxxxxxxxx");

    if(
      history?.category == "bid" ||
      history?.category == "transfer" ||
      history?.category == "mint" ||
      history?.category == "sale"
    )
    {
      const newActivityObj = {
        clientId,
        activityType: history?.category ? history?.category === "buy" ? "purchase" : history?.category === "auction" ? "listing" : history?.category : "",
        nftId: findByTokenIdAndUpdate._id,
        activityInfo: "You have "+history?.category+" a NFT",
        collectionName : findByTokenIdAndUpdate.collectionName,
        activityStatus : history?.category ? history?.category === "buy" ? "Purchase" : history?.category === "auction" ? "Listing" : history?.category : "",
        collectionId : findByTokenIdAndUpdate.collectionId,
        activityImageUrl : findByTokenIdAndUpdate.tokenImage,
      };
      const resultActivity = await ActivitySchema.create(newActivityObj);
    }
    

    return res.json({
      status: "success",
      data: findByTokenIdAndUpdate,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

//get all nft by onAuction true
router.get("/all-nft-on-auction", async (req, res) => {
  try {
    const allNftOnAuction = await NftSchema.find({ onAuction: true });
    

    return res.json({
      status: "success",
      data: allNftOnAuction,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

//get all nft by onSale true
router.get("/all-nft-on-sale", async (req, res) => {
  try {
    const allNftOnSale = await NftSchema.find({ onSale: true });
    

    return res.json({
      status: "success",
      data: allNftOnSale,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.post("/add-nft-marketplace", userAuthorization, async (req, res) => {
  
  
  const walletAddress = req.body.walletAddress;
  const users = await getUserByWallet(walletAddress);
  
  const creatorName = users.name;

  const {
    onMarketplace,
    sellingType,
    nftPrice,
    unlockable,
    digitalCode,
    description,
    externalLink,
    roylaities,
    properties1,
    properties2,
    collectionId,
    imageIndex,
    tokenId,
    history,
  } = req.body;
  //     // const {path}=req.file
  //    // let uploadedImage = await imageUpload(req.files.avatar)

  try {
    const newCollectionObj = {
      clientId: mongoose.Types.ObjectId(users._id),
      onMarketplace,
      sellingType,
      nftPrice,
      unlockable,
      digitalCode,
      collectionId,
      imageIndex: imageIndex ? imageIndex : "",
      description,
      externalLink,
      roylaities,
      properties1,
      properties2,
      creatorName,
      tokenId,
      history,
    };

    const result = await insertNftDetails(newCollectionObj);

    

    res.json({ status: "success", message: "New NFT created" });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
});

//get user nft all marketplace false

router.post("/user-nft-marketplace-false-1",userAuthorization, async (req, res) => {
  try {
    // const id = req.userId;
    const { search, minAmount, maxAmount, selected } = req.body;
    const clientId = req.userId;
    const collectionId = req.body.collectionId;
    const page = req.query.page;
    const limit = req.query.limit;
    
    // const result = await getAllPasses();
    const userNftCollection = await getUserNftMarketplaceFalse(
      collectionId,
      clientId,
      page,
      limit,
      search,
      minAmount,
      maxAmount,
      selected
    );

    

    return res.json({
      status: "success",
      data: userNftCollection,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});
router.get(
  "/user-nft-marketplace-false",
  userAuthorization,
  async (req, res) => {
    try {
      const clientId = req.userId;
      const collectionId = req.query.collectionId;
      const search = req.query.search ? req.query.search : "";
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      
      
      
      

      // s

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const sort = { createdAt: -1 };
      const results = {};

      if (endIndex < (await NftSchema.countDocuments().exec())) {
        results.next = {
          page: parseInt(page) + 1,
          limit: limit,
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: parseInt(page) - 1,
          limit: limit,
        };
      }

      //count total documents if client id is given
      const count = await NftSchema.countDocuments({
        onMarketplace: false,
        clientId: clientId,
        collectionId: mongoose.Types.ObjectId(collectionId),
        imageIndex: { $regex: search, $options: "i" },
      }).exec();

      //find by search and onMarketplace true and ClientId
      const allNftOffMarketplace = await NftSchema.find({
        onMarketplace: false,
        clientId: clientId,
        collectionId: mongoose.Types.ObjectId(collectionId),
        imageIndex: { $regex: search, $options: "i" },
      })
        .sort(sort)
        .limit(limit * 1)
        .skip(startIndex)
        .exec();
      

      return res.json({
        status: "success",
        data: allNftOffMarketplace,
        count: count,
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  }
);


router.post("/user-nft-marketplace-false-all-collection-1",userAuthorization, async (req, res) => {
  try {
    // const id = req.userId;
    const { search, minAmount, maxAmount, selected } = req.body;
    const clientId = req.userId;
    const page = req.query.page;
    const limit = req.query.limit;
    
    // const result = await getAllPasses();
    const userNftCollection = await getNftCollectionByIdMarketPlaceOff(
      clientId,
      page,
      limit,
      search,
      minAmount,
      maxAmount,
      selected
    );

    

    return res.json({
      status: "success",
      data: userNftCollection,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

//user nft all marketplace false for all collection
router.get(
  "/user-nft-marketplace-false-all-collection",
  userAuthorization,
  async (req, res) => {
    try {
      const clientId = req.userId;
      const search = req.query.search ? req.query.search : "";
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      
      
      
      

      // s

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const sort = { createdAt: -1 };
      const results = {};

      if (endIndex < (await NftSchema.countDocuments().exec())) {
        results.next = {
          page: parseInt(page) + 1,
          limit: limit,
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: parseInt(page) - 1,

          limit: limit,
        };
      }

      //count total documents if client id is given
      const count = await NftSchema.countDocuments({
        onMarketplace: false,
        clientId: clientId,
        imageIndex: { $regex: search, $options: "i" },
      }).exec();

      //find by search and onMarketplace true and ClientId
      const allNftOffMarketplace = await NftSchema.find({
        onMarketplace: false,
        clientId: clientId,
        imageIndex: { $regex: search, $options: "i" },
      })
        .sort(sort)
        .limit(limit * 1)
        .skip(startIndex)
        .exec();

      return res.json({
        status: "success",
        data: allNftOffMarketplace,
        count: count,
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  }
);

//get user nft all marketplace true for all collection and onsale true
router.post("/user-nft-marketplace-true-all-collection-on-sale-1",userAuthorization, async (req, res) => {
  try {
    // const id = req.userId;
    const { search, minAmount, maxAmount, selected } = req.body;
    const clientId = req.userId;
    const page = req.query.page;
    const limit = req.query.limit;
    
    // const result = await getAllPasses();
    const userNftCollection = await getUserNftMarketplaceTrueAllCollectionOnSale(
      clientId,
      page,
      limit,
      search,
      minAmount,
      maxAmount,
      selected
    );

    

    return res.json({
      status: "success",
      data: userNftCollection,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});


router.get(
  "/user-nft-marketplace-true-all-collection-on-sale",
  userAuthorization,
  async (req, res) => {
    try {
      const clientId = req.userId;
      const search = req.query.search ? req.query.search : "";
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      
      
      
      

      // s

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const sort = { createdAt: -1 };
      const results = {};

      if (endIndex < (await NftSchema.countDocuments().exec())) {
        results.next = {
          page: parseInt(page) + 1,
          limit: limit,
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: parseInt(page) - 1,

          limit: limit,
        };
      }

      //count total documents if client id is given
      const count = await NftSchema.countDocuments({
        onMarketplace: true,
        clientId: clientId,
        onSale: true,
        imageIndex: { $regex: search, $options: "i" },
      }).exec();

      //find by search and onMarketplace true and ClientId
      const allNftOffMarketplace = await NftSchema.find({
        onMarketplace: true,

        clientId: clientId,
        onSale: true,
        imageIndex: { $regex: search, $options: "i" },
      })
        .sort(sort)
        .limit(limit * 1)
        .skip(startIndex)
        .exec();

      return res.json({
        status: "success",
        data: allNftOffMarketplace,
        count: count,
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  }
);
//get user nft all marketplace true for all collection and onAuction true
router.get(
  "/user-nft-marketplace-true-all-collection-on-auction",
  userAuthorization,
  async (req, res) => {
    try {
      const clientId = req.userId;
      const search = req.query.search ? req.query.search : "";
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      
      
      
      

      // s

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const sort = { createdAt: -1 };
      const results = {};

      if (endIndex < (await NftSchema.countDocuments().exec())) {
        results.next = {
          page: parseInt(page) + 1,
          limit: limit,
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: parseInt(page) - 1,

          limit: limit,
        };
      }

      //count total documents if client id is given
      const count = await NftSchema.countDocuments({
        onMarketplace: true,
        clientId: clientId,
        onAuction: true,
        imageIndex: { $regex: search, $options: "i" },
      }).exec();

      //find by search and onMarketplace true and ClientId
      const allNftOffMarketplace = await NftSchema.find({
        onMarketplace: true,
        clientId: clientId,
        onAuction: true,
        imageIndex: { $regex: search, $options: "i" },
      })
        .sort(sort)
        .limit(limit * 1)
        .skip(startIndex)
        .exec();

      return res.json({
        status: "success",
        data: allNftOffMarketplace,
        count: count,
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  }
);

router.post("/user-nft-marketplace-true-all-collection-on-auction-1",userAuthorization, async (req, res) => {
  try {
    // const id = req.userId;
    const { search, minAmount, maxAmount, selected } = req.body;
    const clientId = req.userId;
    const page = req.query.page;
    const limit = req.query.limit;
    
    // const result = await getAllPasses();
    const userNftCollection = await getUserNftMarketplaceTrueAllCollectionOnAuction(
      clientId,
      page,
      limit,
      search,
      minAmount,
      maxAmount,
      selected
    );

    

    return res.json({
      status: "success",
      data: userNftCollection,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});



router.post("/user-nft-all", async (req, res) => {
  try {
    // const id = req.userId;
    const { search, minAmount, maxAmount, selected } = req.body;
    const page = req.query.page;
    const limit = req.query.limit;
    // const result = await getAllPasses();
    const userNftCollection = await getUserNftMarketplaceTrueAll(
      page,
      limit,
      search,
      minAmount,
      maxAmount,
      selected
    );

    

    return res.json({
      status: "success",
      data: userNftCollection,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
