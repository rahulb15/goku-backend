const express = require("express");
const router = express.Router();
const { PassSchema } = require("../models/passDetails/passSchema");
const { NftSchema } = require("../models/nfts/nft.schema");
const {
  userAuthorization,
} = require("../middlewares/authorization.middleware");
const {
  insertPassDetails,
  getNftPassById,
  getNftPassById2,
  getPassByTab,
  getUserDbcooperMarketplaceTrueAll,
} = require("../models/passDetails/passModel");
const { UserSchema } = require("../models/user/user.schema");
const mongoose = require("mongoose");
const { ActivitySchema } = require("../models/activityModal/activity.schema");
router.post("/savePass", userAuthorization, async (req, res) => {
  
  const {
    passName,
    passRound,
    passCost,
    passTokenId,
    revealed,
    imageIndex,
    onMarketplace,
  } = req.body;
  const clientId = mongoose.Types.ObjectId(req.userId);
  try {
    var ppMintCount = 0;
    var dbMintCount = 0;

    const newPassObj = {
      passName,
      passRound,
      passCost,
      clientId,
      passTokenId,
      revealed,
      tokenId: passTokenId,
      onMarketplace: onMarketplace ? onMarketplace : false,
      imageIndex: imageIndex ? imageIndex : "",
    };

    const result = await insertPassDetails(newPassObj);
    console.log("result", result);

    

    res.json({ status: "success", message: "New Pass created" });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
});

router.get("/", userAuthorization, async (req, res) => {
  try {
    const clientId = req.userId;
    // const result = await getAllPasses();
    const user = await PassSchema.find({ clientId });

    

    return res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

//get All Passes
router.get("/getAllPasses", async (req, res) => {
  try {
    //get all passes
    const result = await PassSchema.find();
    
    return res.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.get("/checkPriorityPass", userAuthorization, async (req, res) => {
  try {
    const clientId = req.userId;
    // const result = await getAllPasses();

    const passes = await PassSchema.find({
      clientId: clientId,
      passName: "priority pass",
    });
    
    if (passes.length) {
      return res.json({
        data: true,
      });
    } else {
      return res.json({
        data: true,
      });
    }
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.patch("/updatePass", userAuthorization, async (req, res) => {
  
  try {
    const {
      _id,
      imageIndex,
      hash,
      revealed,
      tokenHash,
      tokenId,
      tokenName,
      tokenDescription,
      tokenImage,
      creator,
      collectionName,
      symbol,
      onMarketplace,
      onSale,
      history,
      bidder,
      onAuction,
      nftPrice,
      fileImageUrl,
      fileName
    } = req.body;
    const { bidPrice } = req.body;
    const clientId = req.userId;
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

    // const passes = await PassSchema.find({ _id });
    // 
    // passes[0].passName = passes[0].passName;
    // passes[0].passRound = passes[0].passRound;
    // passes[0].passCost = passes[0].passCost;
    // passes[0].passTokenId = passes[0].passTokenId;
    // passes[0].tokenHash = passes[0].tokenHash ? passes[0].tokenHash : tokenHash;
    // passes[0].tokenName = passes[0].tokenName ? passes[0].tokenName : tokenName;
    // passes[0].tokenDescription = passes[0].tokenDescription
    //   ? passes[0].tokenDescription
    //   : tokenDescription;
    // passes[0].tokenImage = passes[0].tokenImage
    //   ? passes[0].tokenImage
    //   : tokenImage;
    // passes[0].creator = creator;
    // passes[0].collectionName = collectionName;
    // passes[0].tokenId = passes[0].passTokenId;
    // passes[0].symbol = symbol;
    // passes[0].hash = hash;
    // passes[0].imageIndex = imageIndex ? imageIndex : "";
    // passes[0].onMarketplace = onMarketplace ? onMarketplace : false;

    // // const { passName,passRound,passCost,passTokenId,revealed } = req.body;
    // // console.log("userp",updatedPassNumber)
    // const result = await insertPassDetails(...passes);

    // const passes2 = await PassSchema.find({ _id });
    // 

    const obj = {
      imageIndex,
      hash,
      revealed,
      tokenHash,
      tokenId,
      tokenName,
      tokenDescription,
      tokenImage,
      creator,
      collectionName,
      symbol,
      onSale: onSale ? onSale : false,
      onAuction: onAuction ? onAuction : false,
      onMarketplace: onMarketplace ? onMarketplace : false,
      nftPrice,
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
      // Update the document
    const updatePass = await PassSchema.findByIdAndUpdate(_id, updateObj, {
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

    if (
      (history &&
        typeof history === "object" &&
        history.category == "cancelAuction") ||
      history.category == "closeSale" 
      // history.category == "cancelBid"
    ) {

      // add query to get last mint entry from history array and update nft price with last mint price
      const lastSaleEntry = await PassSchema.findOne(
        { _id: _id },
        { history: { $slice: -1 } }
      );
      console.log(lastSaleEntry, "lastSaleEntrylastSaleEntrylastSaleEntry",lastSaleEntry.history[0].price);
      if (lastSaleEntry) {
        updateObj.$set.nftPrice = lastSaleEntry.history[0].price;
      }
    }

    if(history.category == "cancelBid"){
      // in mft schema find by id and find bidInfo array and find last auction price and update nft price with last auction price
      const lastBidEntry = await PassSchema.findOne(
        { _id: _id },
        { bidInfo: { $slice: -1 } }
      );
      console.log(lastBidEntry, "lastBidEntrylastBidEntrylastBidEntry",lastBidEntry.bidInfo[0].bidPrice);
      if (lastBidEntry) {
        updateObj.$set.nftPrice = lastBidEntry.bidInfo[0].bidPrice;
      }
    }

    // Update the document
    const updatePass = await PassSchema.findByIdAndUpdate(_id, updateObj, {
      new: true,
    });

    if(
      history?.category == "bid" ||
      history?.category == "transfer" ||
      history?.category == "mint" ||
      history?.category == "sale"
    )
    {
      const newActivityObj = {
        clientId: mongoose.Types.ObjectId(clientId),
        activityType: history?.category ? history?.category === "buy" ? "purchase" : history?.category === "auction" ? "listing" : history?.category : "",
        nftId: updatePass._id,
        activityInfo: "You have "+history?.category+" a NFT",
        collectionName : updatePass.collectionName,
        activityStatus : history?.category ? history?.category === "buy" ? "Purchase" : history?.category === "auction" ? "Listing" : history?.category : "",
        activityImageUrl : updatePass.tokenImage,
      };
      const resultActivity = await ActivitySchema.create(newActivityObj);
    }

    

    res.json({ status: "success", message: "pass updated", data: updatePass });
  } catch (error) {
    // console.log(error)
    res.json({ status: "error", message: error.message });
  }
});

router.patch("/update-nft-pass-gift", userAuthorization, async (req, res) => {
  try {
    // const clientId = req.userId;
    const {
      passTokenId,
      creator,
      sellingType,
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
      const deleteNft = PassSchema.remove({ passTokenId: passTokenId });
      
      return res.json({
        status: "success",
        data: deleteNft,
      });
    }

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
      creator,
      onAuction: onAuction ? onAuction : false,
      // isRevealed:false,
      clientId: mongoose.Types.ObjectId(findUSer._id),
      sellingType: sellingType ? sellingType : "",
      onMarketplace: onMarketplace ? onMarketplace : false,
      duration: duration ? duration : "",
      tokenId: passTokenId,
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
      const findByTokenIdAndUpdate = await PassSchema.findOneAndUpdate(
        { passTokenId: passTokenId }, // Filter object
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

    if (
      (history &&
        typeof history === "object" &&
        history.category == "cancelAuction") ||
      history.category == "closeSale" 
      // history.category == "cancelBid"
    ) {

      // add query to get last mint entry from history array and update nft price with last mint price
      const lastSaleEntry = await PassSchema.findOne(
        { _id: _id },
        { history: { $slice: -1 } }
      );
      console.log(lastSaleEntry, "lastSaleEntrylastSaleEntrylastSaleEntry",lastSaleEntry.history[0].price);
      if (lastSaleEntry) {
        updateObj.$set.nftPrice = lastSaleEntry.history[0].price;
      }
    }

    if(history.category == "cancelBid"){
      // in mft schema find by id and find bidInfo array and find last auction price and update nft price with last auction price
      const lastBidEntry = await PassSchema.findOne(
        { _id: _id },
        { bidInfo: { $slice: -1 } }
      );
      console.log(lastBidEntry, "lastBidEntrylastBidEntrylastBidEntry",lastBidEntry.bidInfo[0].bidPrice);
      if (lastBidEntry) {
        updateObj.$set.nftPrice = lastBidEntry.bidInfo[0].bidPrice;
      }
    }

    const findByTokenIdAndUpdate = await PassSchema.findOneAndUpdate(
      { passTokenId: passTokenId }, // Filter object
      updateObj,
      {
        new: true,
      }
    );

    if(
      history?.category == "bid" ||
      history?.category == "transfer" ||
      history?.category == "mint" ||
      history?.category == "sale"
    )
    {
      const newActivityObj = {
        clientId: mongoose.Types.ObjectId(findUSer._id),
        activityType: history?.category ? history?.category === "buy" ? "purchase" : history?.category === "auction" ? "listing" : history?.category : "",
        nftId: findByTokenIdAndUpdate._id,
        activityInfo: "You have "+history?.category+" a NFT",
        collectionName : findByTokenIdAndUpdate.collectionName,
        activityStatus : history?.category ? history?.category === "buy" ? "Purchase" : history?.category === "auction" ? "Listing" : history?.category : "",
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

router.post("/getNftPassbyId", async (req, res) => {
  try {
    const { _id } = req.body;

    // const result = await getAllPasses();
    const userNft = await getNftPassById(_id);

    

    return res.json({
      status: "success",
      data: userNft,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.post("/getNftPassbyId2", async (req, res) => {
  try {
    const { _id } = req.body;

    // const result = await getAllPasses();
    const userNft = await getNftPassById2(_id);

    

    return res.json({
      status: "success",
      data: userNft,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});


//find and update nft by id
router.patch("/update-nft-pass", userAuthorization, async (req, res) => {
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
      revealed: revealed,
      hash,
      imageIndex,
      onMarketplace: onMarketplace ? onMarketplace : false,
      sellingType,
      nftPrice: nftPrice ? nftPrice : 0,
      duration,
      onSale: onSale ? onSale : false,
      onAuction: onAuction ? onAuction : false,
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
       // Update the document
    const updateNft = await PassSchema.findByIdAndUpdate(_id, updateObj, {
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
    if (
      (history &&
        typeof history === "object" &&
        history.category == "cancelAuction") ||
      history.category == "closeSale" 
      // history.category == "cancelBid"
    ) {

      // add query to get last mint entry from history array and update nft price with last mint price
      const lastSaleEntry = await PassSchema.findOne(
        { _id: _id },
        { history: { $slice: -1 } }
      );
      console.log(lastSaleEntry, "lastSaleEntrylastSaleEntrylastSaleEntry",lastSaleEntry.history[0].price);
      if (lastSaleEntry) {
        updateObj.$set.nftPrice = lastSaleEntry.history[0].price;
      }
    }

    if(history.category == "cancelBid"){
      // in mft schema find by id and find bidInfo array and find last auction price and update nft price with last auction price
      const lastBidEntry = await PassSchema.findOne(
        { _id: _id },
        { bidInfo: { $slice: -1 } }
      );
      console.log(lastBidEntry, "lastBidEntrylastBidEntrylastBidEntry",lastBidEntry.bidInfo[0].bidPrice);
      if (lastBidEntry) {
        updateObj.$set.nftPrice = lastBidEntry.bidInfo[0].bidPrice;
      }
    }

    // Update the document
    const updateNft = await PassSchema.findByIdAndUpdate(_id, updateObj, {
      new: true,
    });
    console.log("updateNftssssssss",updateNft);

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
        nftId: updateNft._id,
        activityInfo: "You have "+history?.category+" a NFT",
        collectionName : updateNft.collectionName,
        activityStatus : history?.category ? history?.category === "buy" ? "Purchase" : history?.category === "auction" ? "Listing" : history?.category : "",
        activityImageUrl : updateNft.tokenImage,
      };
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

router.patch("/bidding", userAuthorization, async (req, res) => {
  try {
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
      revealed: revealed,
      hash,
      imageIndex,
      onMarketplace: onMarketplace ? onMarketplace : false,
      sellingType,
      nftPrice,
      duration,
      onSale: onSale ? onSale : false,
      onAuction: onAuction ? onAuction : false,
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

    if (
      (history &&
        typeof history === "object" &&
        history.category == "cancelAuction") ||
      history.category == "closeSale" 
      // history.category == "cancelBid"
    ) {

      // add query to get last mint entry from history array and update nft price with last mint price
      const lastSaleEntry = await NftSchema.findOne(
        { _id: _id },
        { history: { $slice: -1 } }
      );
      console.log(lastSaleEntry, "lastSaleEntrylastSaleEntrylastSaleEntry",lastSaleEntry.history[0].price);
      if (lastSaleEntry) {
        updateObj.$set.nftPrice = lastSaleEntry.history[0].price;
      }
    }

    if(history.category == "cancelBid"){
      // in mft schema find by id and find bidInfo array and find last auction price and update nft price with last auction price
      const lastBidEntry = await NftSchema.findOne(
        { _id: _id },
        { bidInfo: { $slice: -1 } }
      );
      console.log(lastBidEntry, "lastBidEntrylastBidEntrylastBidEntry",lastBidEntry.bidInfo[0].bidPrice);
      if (lastBidEntry) {
        updateObj.$set.nftPrice = lastBidEntry.bidInfo[0].bidPrice;
      }
    }


    // Update the document
    const updateNft = await NftSchema.findByIdAndUpdate(_id, updateObj, {
      new: true,
    });

    

    return res.json({
      status: "success",
      data: updateNft,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});



router.patch("/bidding-pass", userAuthorization, async (req, res) => {
  try {
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
      revealed: revealed,
      hash,
      imageIndex,
      onMarketplace: onMarketplace ? onMarketplace : false,
      sellingType,
      duration,
      onSale: onSale ? onSale : false,
      onAuction: onAuction ? onAuction : false,
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
      const updateNft1 = await PassSchema.findByIdAndUpdate(_id, updateObj, {
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

    if (
      (history &&
        typeof history === "object" &&
        history.category == "cancelAuction") ||
      history.category == "closeSale" 
      // history.category == "cancelBid"
    ) {

      // add query to get last mint entry from history array and update nft price with last mint price
      const lastSaleEntry = await PassSchema.findOne(
        { _id: _id },
        { history: { $slice: -1 } }
      );
      console.log(lastSaleEntry, "lastSaleEntrylastSaleEntrylastSaleEntry",lastSaleEntry.history[0].price);
      if (lastSaleEntry) {
        updateObj.$set.nftPrice = lastSaleEntry.history[0].price;
      }
    }

    if(history.category == "cancelBid"){
      // in mft schema find by id and find bidInfo array and find last auction price and update nft price with last auction price
      const lastBidEntry = await PassSchema.findOne(
        { _id: _id },
        { bidInfo: { $slice: -1 } }
      );
      console.log(lastBidEntry, "lastBidEntrylastBidEntrylastBidEntry",lastBidEntry.bidInfo[0].bidPrice);
      if (lastBidEntry) {
        updateObj.$set.nftPrice = lastBidEntry.bidInfo[0].bidPrice;
      }
    }


    // Update the document
    const updateNft = await PassSchema.findByIdAndUpdate(_id, updateObj, {
      new: true,
    });

    

    return res.json({
      status: "success",
      data: updateNft,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});



//show all nfts bids only on auction
router.post("/all-nft-bids", userAuthorization, async (req, res) => {
  try {
    const { _id } = req.body;
    
    // Sort in descending order based on bidTime and add the new bid to the beginning of the array
    const updateNft = await NftSchema.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(_id) } },
      {
        $project: {
          _id: 1,
          bidInfo: 1,
          nftPrice: 1,
          tokenId: 1,
          history: 1,
        },
      },
      {
        $unwind: "$bidInfo",
      },
      {
        $group: {
          _id: "$_id",
          bidInfo: { $push: "$bidInfo" },
          nftPrice: { $first: "$nftPrice" },
          tokenId: { $first: "$tokenId" },
          history: { $first: "$history" },
        },
      },
    ]);
    

    return res.json({
      status: "success",
      data: updateNft,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }

});

router.post("/all-nft-bids-pass", userAuthorization, async (req, res) => {
  try {
    const { _id } = req.body;
    
    // Sort in descending order based on bidTime and add the new bid to the beginning of the array
    const updateNft = await PassSchema.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(_id) } },
      {
        $project: {
          _id: 1,
          bidInfo: 1,
          nftPrice: 1,
          tokenId: 1,
          history: 1,
        },
      },
      {
        $unwind: "$bidInfo",
      },
      {
        $group: {
          _id: "$_id",
          bidInfo: { $push: "$bidInfo" },
          nftPrice: { $first: "$nftPrice" },
          tokenId: { $first: "$tokenId" },
          history: { $first: "$history" },
        },
      },
    ]);
    

    return res.json({
      status: "success",
      data: updateNft,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});






router.post("/user-pass-category", userAuthorization, async (req, res) => {
  try {
    const { tab } = req.body;
    const id = req.userId;
    
    // const result = await getAllPasses();
    const user = await getPassByTab(tab);

    

    return res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

//get all nft by onAuction true
router.get("/all-nft-on-auction", userAuthorization, async (req, res) => {
  try {
    const allNftOnAuction = await PassSchema.find({ onAuction: true });
    

    return res.json({
      status: "success",
      data: allNftOnAuction,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

//get all nft by onSale true
router.get("/all-nft-on-sale", userAuthorization, async (req, res) => {
  try {
    const allNftOnSale = await PassSchema.find({ onSale: true });
    

    return res.json({
      status: "success",
      data: allNftOnSale,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

//get all nft by onMarketplace true
router.get("/all-nft-on-marketplace", userAuthorization, async (req, res) => {
  try {
    const allNftOnMarketplace = await PassSchema.find({ onMarketplace: true });
    

    return res.json({
      status: "success",
      data: allNftOnMarketplace,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.get("/all-nft-off-marketplace", userAuthorization, async (req, res) => {
  try {
    
    const clientId = req.userId;
    const search = req.query.search ? req.query.search : "";
    const page = req.query.page;
    const limit = req.query.limit;
    
    
    
    

    // s

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const sort = { createdAt: -1 };
    const results = {};

    if (endIndex < (await PassSchema.countDocuments().exec())) {
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
    const count = await PassSchema.countDocuments({
      onMarketplace: false,
      clientId: clientId,
      imageIndex: { $regex: search, $options: "i" },
    }).exec();

    //find by search and onMarketplace true and ClientId
    const allNftOffMarketplace = await PassSchema.find({
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
});

router.get("/all-nft-on-marketplace-dbcooper", async (req, res) => {
  try {
    
    const clientId = req.userId;
    const search = req.query.search ? req.query.search : "";
    const page = req.query.page;
    const limit = req.query.limit;
    
    
    
    

    // s

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const sort = { createdAt: -1 };
    const results = {};

    if (endIndex < (await PassSchema.countDocuments().exec())) {
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
    const count = await PassSchema.countDocuments({
      onMarketplace: true,
      passName: "DB Cooper",
      imageIndex: { $regex: search, $options: "i" },
    }).exec();

    //find by search and onMarketplace true and ClientId
    const allNftOffMarketplace = await PassSchema.find({
      onMarketplace: true,
      passName: "DB Cooper",
      imageIndex: { $regex: search, $options: "i" },
    })
      .sort(sort)
      .limit(limit * 1)
      .skip(startIndex)
      .exec();

        // Calculate the sum of nftPrice from the found documents
    const nftPriceSum = allNftOffMarketplace.reduce((sum, nft) => {
      // Convert nftPrice to a number and add it to the sum
      return sum + parseFloat(nft.nftPrice);
    }, 0);
        // Use an aggregation pipeline to find the floor price
    const aggregationPipeline = [
      {
        $match: {
          onMarketplace: true,
          passName: "DB Cooper",
          imageIndex: { $regex: search, $options: "i" },
        },
      },
      {
        $group: {
          _id: null,
          floorPrice: { $min: { $toDouble: "$passCost" } },
        },
      },
    ];

    const floorPriceResult = await PassSchema.aggregate(aggregationPipeline);

    // Extract the floorPrice from the result
    const floorPrice = floorPriceResult.length > 0 ? floorPriceResult[0].floorPrice : 0;


    

    return res.json({
      status: "success",
      data: allNftOffMarketplace,
      count: count,
      nftPriceSum: nftPriceSum,
      passCostSum: floorPrice,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

//get user nft by onAuction true
router.get("/user-nft-on-auction", userAuthorization, async (req, res) => {
  try {
    const clientId = req.userId;
    const search = req.query.search ? req.query.search : "";
    const page = req.query.page;
    const sort = { createdAt: -1 };
    const limit = req.query.limit;
    
    
    
    
    

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    if (endIndex < (await PassSchema.countDocuments().exec())) {
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
    const count = await PassSchema.countDocuments({
      onAuction: true,
      clientId: clientId,
      imageIndex: { $regex: search, $options: "i" },
    }).exec();

    //find by search and onMarketplace true and ClientId
    const allNftOffMarketplace = await PassSchema.find({
      onAuction: true,
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
});

//get user nft by onSale true
router.get("/user-nft-on-sale", userAuthorization, async (req, res) => {
  try {
    // const clientId = req.userId;
    // const userNftOnSale = await PassSchema.find({clientId,onSale:true});
    const clientId = req.userId;
    const search = req.query.search ? req.query.search : "";
    const page = req.query.page;
    const limit = req.query.limit;
    
    
    
    
    

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const sort = { createdAt: -1 };
    const results = {};

    if (endIndex < (await PassSchema.countDocuments().exec())) {
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
    const count = await PassSchema.countDocuments({
      onSale: true,
      clientId: clientId,
      imageIndex: { $regex: search, $options: "i" },
    }).exec();

    //find by search and onMarketplace true and ClientId
    const allNftOffMarketplace = await PassSchema.find({
      onSale: true,
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
});

//get user nft by onMarketplace true
router.get("/user-nft-on-marketplace", userAuthorization, async (req, res) => {
  try {
    const id = req.userId;
    const userNftOnMarketplace = await PassSchema.find({
      creator: id,
      onMarketplace: true,
    });
    

    return res.json({
      status: "success",
      data: userNftOnMarketplace,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.post("/user-dbcooper-all", async (req, res) => {
  try {
    // const id = req.userId;
    const { search, minAmount, maxAmount, selected } = req.body;
    const page = req.query.page;
    const limit = req.query.limit;
    // const result = await getAllPasses();
    const userNftCollection = await getUserDbcooperMarketplaceTrueAll(
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
