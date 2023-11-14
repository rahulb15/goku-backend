const express = require("express");
const router = express.Router();
const { NftLikeSchema } = require("../models/likeNft/like.schema");
const { NftSchema } = require("../models/nfts/nft.schema");
const { getNftById, getNftByIdPass } = require("../models/nfts/nft.model");
const { ActivitySchema } = require("../models/activityModal/activity.schema");
const {
  addNftLikes,
  getLikedNftById,
  getLikedNftByUser,
  removeLikedNftByUser,
  getAllLikedNftByUsers,
} = require("../models/likeNft/like.model");

const {
  userAuthorization,
} = require("../middlewares/authorization.middleware");

router.post("/addLikedNft", userAuthorization, async (req, res) => {
  console.log("ssc1");
  const clientId = req.userId;
  const { nftLiked, type } = req.body;

  try {
    const newNFTObj = {
      clientId,
      nftLiked,
      type,
    };

    const result = await addNftLikes(newNFTObj);
    console.log("result", result);
    const nft = await getNftById(nftLiked);
    console.log("nft", nft);
    if (result !== null && nft !== null) {
      const newActivityObj = {
        clientId,
        activityType: "like",
        nftId: nftLiked,
        activityInfo: "You have liked a NFT",
        collectionName : nft[0].collectionName,
        activityStatus : "Like",
        collectionId : nft[0].collectionId,
        activityImageUrl : nft[0].tokenImage,
      };
      const resultActivity = await ActivitySchema.create(newActivityObj);
    }


    res.json({ status: "success", message: "You have liked a NFT" });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
});

router.post("/removeLikeNft", userAuthorization, async (req, res) => {
  console.log("ssc1");
  const clientId = req.userId;
  const { nftLiked, type } = req.body;

  try {
    const newNFTObj = {
      clientId,
      nftLiked,
	  type,
    };

    const result = await removeLikedNftByUser(newNFTObj);

    res.json({ status: "success", message: "You have disliked a NFT" });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
});

router.post("/getLikedNft", async (req, res) => {
  console.log("ssc1");

  const { nftLiked } = req.body;

  try {
    console.log("nftlikedss", nftLiked);

    const result = await getLikedNftById(nftLiked);

    console.log("resultlike", result);

    res.json({ status: "success", data: result.length });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
});

router.post("/user-liked-nft", userAuthorization, async (req, res) => {
  console.log("ssc123");

  const { nftLiked } = req.body;
  const clientId = req.userId;

  try {
    const newNFTObj = {
      clientId,
      nftLiked,
    };

    const result = await getLikedNftByUser(newNFTObj);

    if (result !== null) {
      var likedNft = true;
    } else {
      var likedNft = false;
    }

    res.json({ status: "success", data: likedNft });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
});

router.get("/get-favorited-nft", userAuthorization, async (req, res) => {
  console.log("ssc123");

  const clientId = req.userId;
  const type = req.query.type;

  try {
    const result = await getAllLikedNftByUsers(clientId, type);
    console.log("resulta", result);
    const totalFavoritedNft = [];

    for (i = 0; i < result.length; i++) {
      let nftMade = result[i];
      let likedNft = await getNftById(nftMade.nftLiked);
      totalFavoritedNft.push(likedNft[0]);
    }
    //  result.forEach(async (element) => {
    // 	console.log("heyaaig",element.nftLiked)
    // 	let likedNft = await getNftById(element.nftLiked )
    // 	console.log("heyaai", likedNft)
    // 	likedNft ? totalFavoritedNft.push(likedNft[0]) : null
    // });


    res.json({ status: "success", data: totalFavoritedNft });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
});

router.get("/get-favorited-nft-pass", userAuthorization, async (req, res) => {
  
	const clientId = req.userId;
	const type = req.query.type;
  
	try {
	  const result = await getAllLikedNftByUsers(clientId, type);
	  const totalFavoritedNft = [];
  
	  for (i = 0; i < result.length; i++) {
		let nftMade = result[i];
		let likedNft = await getNftByIdPass(nftMade.nftLiked);
		totalFavoritedNft.push(likedNft[0]);
	  }
	  //  result.forEach(async (element) => {
	  // 	console.log("heyaaig",element.nftLiked)
	  // 	let likedNft = await getNftById(element.nftLiked )
	  // 	console.log("heyaai", likedNft)
	  // 	likedNft ? totalFavoritedNft.push(likedNft[0]) : null
	  // });
  
  
	  res.json({ status: "success", data: totalFavoritedNft });
	} catch (error) {
	  res.json({ status: "error", message: error });
	}
  });

module.exports = router;
