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


        const collections = await CollectionSchema.aggregate([
            {
                $match: {
                    $and: [{ _id: mongoose.Types.ObjectId(id) }],
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