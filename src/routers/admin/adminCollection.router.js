const express = require("express");
const router = express.Router();
var mongoose = require('mongoose');

const { CollectionSchema } = require("../../models/collection/collection.schema");

const { userAuthorization ,adminUserAuthorization} = require("../../middlewares/authorization.middleware")

const {
	getCollection,getCollectionbyId,getCollectionByClientID

} = require("../../models/adminCollection/adminCollection.model");

const {approveCollection,denyCollection } = require("../../models/adminUser/admin.user.model");




router.get('/all-users-collection',adminUserAuthorization, async (req, res) => {
    try {
    const page = req.query.page;
    const limit = req.query.limit;
    const search = req.query.search;
    console.log("page",page)
    console.log("limit",limit)
    console.log("search",search)
       
        // const result = await getAllPasses();
		const user=await getCollection(page,limit,search)
	

	
        console.log("passes67",user)
        
            return res.json({
                status: "success",data:user
                
            });
       
        
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});



router.post('/getCollectionById',adminUserAuthorization, async (req, res) => {
    try {
       

        const {_id}=req.body
        console.log("heman",_id)
        var objectId = mongoose.Types.ObjectId(_id);
        // const result = await getAllPasses();
		const user=await getCollectionbyId(objectId)

        console.log("userc",user)
	

	
        
        
            return res.json({
                status: "success",data:user
                
            });
       
        
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});


router.post('/getCollectionByClientID',adminUserAuthorization, async (req, res) => {
    try {

        const {clientID}=req.body
        const page = req.query.page;
        const limit = req.query.limit;  
        const search = req.query.search;
        console.log("ClientID",clientID)
        console.log("page",page)
        console.log("limit",limit)
        console.log("search",search)
        // const result = await getAllPasses();
        var objectId = mongoose.Types.ObjectId(clientID);
        const user=await getCollectionByClientID(objectId,page,limit,search)

        console.log("userc",user)

        return res.json({ status: "success", user });

    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

router.post("/approveCollection", adminUserAuthorization, async (req, res) => {
    const { _id, status } = req.body;
    
    
    try {
      const user = await approveCollection(_id, status);
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

  router.post("/denyCollection", adminUserAuthorization, async (req, res) => {
    const { _id } = req.body;
    
    try {
      const user = await denyCollection(_id);
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





      







module.exports = router;