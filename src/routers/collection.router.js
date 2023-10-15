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
	const { collectionName,tokenSymbol,collectionInfo,collectionUrl,category,totalSupply,mintPrice, royaltyAddress, royaltyFee } = req.body;
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
            // collectionInfo,
            collectionUrl,
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
		const user=await CollectionSchema.find({ _id:id });
	

	
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
        console.log("csc",id)
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









module.exports = router;