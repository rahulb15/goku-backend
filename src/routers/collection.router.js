const express = require("express");
const router = express.Router();
const { getCollectionByTab } = require("../models/collection/collection.model");
const { CollectionSchema } = require("../models/collection/collection.schema");
const { imageUpload} = require("../helpers/cloudinary.helper");
const {userAuthorization}=require("../middlewares/authorization.middleware")
const {
	insertCollectionDetails

} = require("../models/collection/collection.model");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const mongoose = require("mongoose");
var multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const { NftSchema } = require("../models/nfts/nft.schema");




router.post("/saveCollection",userAuthorization,multipartMiddleware,  async (req, res) => {
	console.log("ssc1")
    const clientId = req.userId;
	const { collectionName,tokenSymbol,collectionInfo,collectionUrl,category,totalSupply,mintPrice, royaltyAddress, royaltyFee,bannerUrl } = req.body;
    console.log("ssc2",req.body)
    //tokenList to array
    const tokenList=req.body.tokenList.split(',')
    console.log("ssc3",tokenList)
    // const {path}=req.file
    let uploadedImage;
    if(req.files.avatar){
        uploadedImage= await imageUpload(req.files.avatar)
    console.log("ssc4",uploadedImage)
    }
    else{
        uploadedImage={url:""}
    }
	try {


		const newCollectionObj = {
            clientId,
			collectionName,
            tokenSymbol,
            collectionInfo,
            collectionUrl,
            bannerUrl,
            category,
            totalSupply,
            mintPrice,
            tokenList,
            imageUrl:uploadedImage.url,
            royaltyAddress,
            royaltyFee,
            createdDate:Date.now()

		
		};

		
		const result = await insertCollectionDetails(newCollectionObj);

		


	
		res.json({ status: "success", message: "New Collection created" });
	} catch (error) {
		
	
		res.json({ status: "error", message:error });
	}
});

router.get('/user-collection',userAuthorization, async (req, res) => {
    try {
        const id = req.userId;
        console.log("csc",id)
        // const result = await getAllPasses();
		const user=await CollectionSchema.find({ clientId:id });
	

	
        console.log("passes67",user)
        
            return res.json({
                status: "success",data:user
                
            });
       
        
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

router.get('/user-collection-by-id',userAuthorization, async (req, res) => {
    console.log("csc1xxxxxxxxxxxxxxxxxxxxxxx")
    console.log("csc2xxxxxxxxxxxxxxxxxxxx",req.query)
    try {
        const id = req.query.id;
        console.log("csc",id)
        // const result = await getAllPasses();
		const user=await CollectionSchema.find({ _id:id }).populate("clientId");
	

	
        console.log("passes67",user)
        
            return res.json({
                status: "success",data:user
                
            });
       
        
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

router.get('/user-collection-by-id2',userAuthorization, async (req, res) => {
    console.log("csc1xxxxxxxxxxxxxxxxxxxxxxx")
    console.log("csc2xxxxxxxxxxxxxxxxxxxx",req.query)
    try {
        const id = req.query.id;

        //find collection by id and based on that find all nft


        const collections = await NftSchema.aggregate([

            // find nft by collection id and calculate total nftPrice float and nftPrice is string so convert to number
            { $match: { collectionId: mongoose.Types.ObjectId(id) } },
            {
                $group: {
                    _id: "$collectionId",
                    totalNftPrice: { $sum: { $toDouble: "$nftPrice" } },
                    totalNft: { $sum: 1 },
                    // totalNftSold: { $sum: { $cond: [{ $eq: ["$isSold", true] }, 1, 0] } },
                    totalNftUser: { $addToSet: "$clientId" },
                    minNftPrice: { $min: { $toDouble: "$nftPrice" } }, // Calculate the minimum price
                    maxNftPrice: { $max: { $toDouble: "$nftPrice" } }, // Calculate the maximum price
                },
            },

            {
                $lookup: {
                    from: "collections", // other table name
                    localField: "_id", // name of users table field
                    foreignField: "_id", // name of userinfo table field
                    as: "collection_info", // alias for userinfo table
                },
            },
            {
                $lookup: {
                    from: "users", // other table name
                    localField: "collection_info.clientId", // name of users table field
                    foreignField: "_id", // name of userinfo table field
                    as: "user_info", // alias for userinfo table
                },
            },
            {
                $project: {
                    _id: 1,
                    totalNftPrice: 1,
                    totalNft: 1,
                    // totalNftSold: 1,
                    totalNftUser: { $size: "$totalNftUser" },
                    collection_info: 1,
                    user_info: 1,
                    minNftPrice: 1,
                    maxNftPrice: 1,
                },
            },
        ]);

        
        
        return res.json({
            status: "success", data: collections
            
        });



        
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

//get all collection isActive true
router.post('/all-users-collection-active', async (req, res) => {
    try {
       
        const search = req.body.search ? req.body.search : "";
        console.log("search",search)
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
  
  
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const sort = { createdAt: -1 };
        const results = {};
  
        if (endIndex < (await CollectionSchema.countDocuments().exec())) {
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
  
        const count = await CollectionSchema.countDocuments({
            isActive: true,
            collectionName: { $regex: search, $options: "i" },
            }).exec();
  
        const allActiveCollection = await CollectionSchema.find({
            isActive: true,
            collectionName: { $regex: search, $options: "i" },
            })
          .sort(sort)
          .limit(limit * 1)
          .skip(startIndex)
          .exec();

          console.log("allActiveCollection",allActiveCollection)

          allActiveCollection.forEach(async (element) => {
            const id = element._id;
            const collections = await NftSchema.aggregate([

                // find nft by collection id and calculate total nftPrice float and nftPrice is string so convert to number
                { $match: { collectionId: mongoose.Types.ObjectId(id) } },
                {
                    $group: {
                        _id: "$collectionId",
                        totalNftPrice: { $sum: { $toDouble: "$nftPrice" } },
                        totalNft: { $sum: 1 },
                        totalNftUser: { $addToSet: "$clientId" },
                        minNftPrice: { $min: { $toDouble: "$nftPrice" } }, // Calculate the minimum price
                        maxNftPrice: { $max: { $toDouble: "$nftPrice" } }, // Calculate the maximum price
                    },
                },
    
                {
                    $lookup: {
                        from: "collections", // other table name
                        localField: "_id", // name of users table field
                        foreignField: "_id", // name of userinfo table field
                        as: "collection_info", // alias for userinfo table
                    },
                },
                {
                    $lookup: {
                        from: "users", // other table name
                        localField: "collection_info.clientId", // name of users table field
                        foreignField: "_id", // name of userinfo table field
                        as: "user_info", // alias for userinfo table
                    },
                },
                {
                    $project: {
                        _id: 1,
                        totalNftPrice: 1,
                        totalNft: 1,
                        totalNftUser: { $size: "$totalNftUser" },
                        collection_info: 1,
                        user_info: 1,
                        minNftPrice: 1,
                        maxNftPrice: 1,
                    },
                },
            ]);
            console.log("collections===========================",collections)
            if (collections.length > 0) {
                // element.totalNftPrice = collections[0].totalNftPrice;
                // element.totalNft = collections[0].totalNft;
                // element.minNftPrice = collections[0].minNftPrice;
                // element.maxNftPrice = collections[0].maxNftPrice;
                //update collection with totalNftPrice,totalNft,minNftPrice,maxNftPrice
                const updateCollection = await CollectionSchema.updateOne(
                    { _id: id },
                    {
                        $set: {
                            totalNftPrice: collections[0].totalNftPrice,
                            totalNft: collections[0].totalNft,
                            totalNftUser: collections[0].totalNftUser,
                            minNftPrice: collections[0].minNftPrice,
                            maxNftPrice: collections[0].maxNftPrice,
                        },
                    },
                    { new: true }
                );

                console.log("updateCollection",updateCollection)
            }
            }
            );

            console.log("allActiveCollection",allActiveCollection)




        
            return res.json({
                status: "success",data:allActiveCollection,count:count
                
            });
       
        
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});



router.get('/user-collection-1',userAuthorization, async (req, res) => {
      
        try {
            const id = req.userId;
            console.log("csc",id)
            const search = req.body.search ? req.body.search : "";
            console.log("search",search)
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
      
      
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const sort = { createdAt: -1 };
            const results = {};
      
            if (endIndex < (await CollectionSchema.countDocuments().exec())) {
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
      
            const count = await CollectionSchema.countDocuments({
                clientId:id,
                collectionName: { $regex: search, $options: "i" },
                }).exec();
      
            const allActiveCollection = await CollectionSchema.find({
                clientId:id,
                collectionName: { $regex: search, $options: "i" },
                })
              .sort(sort)
              .limit(limit * 1)
              .skip(startIndex)
              .exec();
    
              console.log("allActiveCollection",allActiveCollection)
    
              allActiveCollection.forEach(async (element) => {
                const id = element._id;
                const collections = await NftSchema.aggregate([
    
                    // find nft by collection id and calculate total nftPrice float and nftPrice is string so convert to number
                    { $match: { collectionId: mongoose.Types.ObjectId(id) } },
                    {
                        $group: {
                            _id: "$collectionId",
                            totalNftPrice: { $sum: { $toDouble: "$nftPrice" } },
                            totalNft: { $sum: 1 },
                            totalNftUser: { $addToSet: "$clientId" },
                            minNftPrice: { $min: { $toDouble: "$nftPrice" } }, // Calculate the minimum price
                            maxNftPrice: { $max: { $toDouble: "$nftPrice" } }, // Calculate the maximum price
                        },
                    },
        
                    {
                        $lookup: {
                            from: "collections", // other table name
                            localField: "_id", // name of users table field
                            foreignField: "_id", // name of userinfo table field
                            as: "collection_info", // alias for userinfo table
                        },
                    },
                    {
                        $lookup: {
                            from: "users", // other table name
                            localField: "collection_info.clientId", // name of users table field
                            foreignField: "_id", // name of userinfo table field
                            as: "user_info", // alias for userinfo table
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            totalNftPrice: 1,
                            totalNft: 1,
                            totalNftUser: { $size: "$totalNftUser" },
                            collection_info: 1,
                            user_info: 1,
                            minNftPrice: 1,
                            maxNftPrice: 1,
                        },
                    },
                ]);
                console.log("collections===========================",collections)
                if (collections.length > 0) {
                    // element.totalNftPrice = collections[0].totalNftPrice;
                    // element.totalNft = collections[0].totalNft;
                    // element.minNftPrice = collections[0].minNftPrice;
                    // element.maxNftPrice = collections[0].maxNftPrice;
                    //update collection with totalNftPrice,totalNft,minNftPrice,maxNftPrice
                    const updateCollection = await CollectionSchema.updateOne(
                        { _id: id },
                        {
                            $set: {
                                totalNftPrice: collections[0].totalNftPrice,
                                totalNft: collections[0].totalNft,
                                totalNftUser: collections[0].totalNftUser,
                                minNftPrice: collections[0].minNftPrice,
                                maxNftPrice: collections[0].maxNftPrice,
                            },
                        },
                        { new: true }
                    );
    
                    console.log("updateCollection",updateCollection)
                }
                }
                );
    
                console.log("allActiveCollection",allActiveCollection)
    
    
    
    
            
                return res.json({
                    status: "success",data:allActiveCollection,count:count
                    
                });
           
            
        } catch (error) {
            res.json({ status: 'error', message: error.message });
        }
});









router.get('/all-users-collection', async (req, res) => {
    try {
       
        // const result = await getAllPasses();
		const user=await CollectionSchema.find();
	

	
        console.log("passes67",user)
        
            return res.json({
                status: "success",data:user
                
            });
       
        
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

router.post('/user-collection-category', async (req, res) => {
    try {
        const {tab}=req.body
        const id = req.userId;
        // const result = await getAllPasses();
		const user=await getCollectionByTab(tab)
	

	
        console.log("passes67",user)
        
            return res.json({
                status: "success",data:user
                
            });
       
        
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

router.post('/user-collection-category-1', async (req, res) => {
        try {
            const {tab}=req.body
            const search = req.body.search ? req.body.search : "";
            console.log("search",search)
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
      
      
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const sort = { createdAt: -1 };
            const results = {};
      
            if (endIndex < (await CollectionSchema.countDocuments().exec())) {
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
      
            const count = await CollectionSchema.countDocuments({
                category:tab,
                collectionName: { $regex: search, $options: "i" },
                }).exec();
      
            const allActiveCollection = await CollectionSchema.find({
                category:tab,
                collectionName: { $regex: search, $options: "i" },
                })
              .sort(sort)
              .limit(limit * 1)
              .skip(startIndex)
              .exec();
    
              console.log("allActiveCollection",allActiveCollection)
    
              allActiveCollection.forEach(async (element) => {
                const id = element._id;
                const collections = await NftSchema.aggregate([
    
                    // find nft by collection id and calculate total nftPrice float and nftPrice is string so convert to number
                    { $match: { collectionId: mongoose.Types.ObjectId(id) } },
                    {
                        $group: {
                            _id: "$collectionId",
                            totalNftPrice: { $sum: { $toDouble: "$nftPrice" } },
                            totalNft: { $sum: 1 },
                            totalNftUser: { $addToSet: "$clientId" },
                            minNftPrice: { $min: { $toDouble: "$nftPrice" } }, // Calculate the minimum price
                            maxNftPrice: { $max: { $toDouble: "$nftPrice" } }, // Calculate the maximum price
                        },
                    },
        
                    {
                        $lookup: {
                            from: "collections", // other table name
                            localField: "_id", // name of users table field
                            foreignField: "_id", // name of userinfo table field
                            as: "collection_info", // alias for userinfo table
                        },
                    },
                    {
                        $lookup: {
                            from: "users", // other table name
                            localField: "collection_info.clientId", // name of users table field
                            foreignField: "_id", // name of userinfo table field
                            as: "user_info", // alias for userinfo table
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            totalNftPrice: 1,
                            totalNft: 1,
                            totalNftUser: { $size: "$totalNftUser" },
                            collection_info: 1,
                            user_info: 1,
                            minNftPrice: 1,
                            maxNftPrice: 1,
                        },
                    },
                ]);
                console.log("collections===========================",collections)
                if (collections.length > 0) {
                    // element.totalNftPrice = collections[0].totalNftPrice;
                    // element.totalNft = collections[0].totalNft;
                    // element.minNftPrice = collections[0].minNftPrice;
                    // element.maxNftPrice = collections[0].maxNftPrice;
                    //update collection with totalNftPrice,totalNft,minNftPrice,maxNftPrice
                    const updateCollection = await CollectionSchema.updateOne(
                        { _id: id },
                        {
                            $set: {
                                totalNftPrice: collections[0].totalNftPrice,
                                totalNft: collections[0].totalNft,
                                totalNftUser: collections[0].totalNftUser,
                                minNftPrice: collections[0].minNftPrice,
                                maxNftPrice: collections[0].maxNftPrice,
                            },
                        },
                        { new: true }
                    );
    
                    console.log("updateCollection",updateCollection)
                }
                }
                );
    
                console.log("allActiveCollection",allActiveCollection)
    
    
    
    
            
                return res.json({
                    status: "success",data:allActiveCollection,count:count
                    
                });
           
            
        } catch (error) {
            res.json({ status: 'error', message: error.message });
        }
});









module.exports = router;