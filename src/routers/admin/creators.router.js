const express = require("express");
const router = express.Router();
const { crateAccessJWT, crateAdminAccessJWT } = require('../../helpers/jwt.helper');
const { hashPassword, comparePassword } = require('../../helpers/bcrypt.helper');
const { createEntityToken, getSubDomainUrl } = require('../../helpers/entitytoken.helper');
const { EmailerHelper } = require('../../helpers/email.helper');
const { UserSchema } = require("../../models/user/user.schema");
const { EntityTokenSchema } = require("../../models/entityToken/entity.token.schema");
const { AdminUserSchema } = require("../../models/adminUser/admin.user.schema");
const { verifyTokenExpiration, removeEntityToken } = require("../../models/entityToken/entity.model");
const { userAuthorization ,adminUserAuthorization} = require("../../middlewares/authorization.middleware")
const {
	getCreators,getAllCreators,getFilteredCreators,getCreatrorById,deleteCreatorById
} = require("../../models/creators/creator.model");











// Get admin creators
router.get('/', async (req, res) => {
	
	const page = req.query.page;
	const limit = req.query.limit;
	const search = req.query.search;
	
	
	

	try {
		const adminUser = await getCreators(page, limit, search);
		res.json({ status: "success", adminUser });
	} catch (err) {
		return res.json({ status: "error", message: err });
	}
});


	// try{

	// 	const {pageno}=req.body
	// 	const limitno=4



	// const userProf = await getCreators(pageno,limitno);
	// console.log("safa",userProf)
	// const totalUsers=await UserSchema.find()
	// const totalPages=Math.ceil((totalUsers.length)/(limitno))
	// var pageNoArray=[]
	
	// for(var i=1;i<=totalPages;i++){
	// 	pageNoArray.push(i)
	//   }

	// res.json({ status:"succes",adminUser: userProf,totalPages:pageNoArray,pageNo:pageno });
	
	// else{
	// 	const userProf = await getCreators(pageno,limitno,filterString);
	// 	const userProf2= await getAllCreators(filterString)
	// 	console.log("safa",userProf)
		
	// 	const totalPages=Math.ceil((userProf2.length)/(limitno))
	// 	var pageNoArray=[]
		
	// 	for(var i=1;i<=totalPages;i++){
	// 		pageNoArray.push(i)
	// 	  }
	
	// 	res.json({ status:"succes",adminUser: userProf,totalPages:pageNoArray,pageNo:pageno });
	// }
// 	}catch (err) {
	
// 		return res.json({ status:"error", message: err });
// 	}

	
// });


router.post('/filterCreators',adminUserAuthorization, async (req, res) => {
	//this data coming form database

	try{

		const {pageno,filterString}=req.body
		const limitno=4



		const userProf = await getFilteredCreators(pageno,limitno,filterString);
		const userProf2= await getAllCreators(filterString)
		
		const totalPages=Math.ceil((userProf2.length)/(limitno))
		var pageNoArray=[]
		
		for(var i=1;i<=totalPages;i++){
			pageNoArray.push(i)
		  }
	
		res.json({ status:"succes",adminUser: userProf,totalPages:pageNoArray,pageNo:pageno });
	
	// else{
	// 	const userProf = await getCreators(pageno,limitno,filterString);
	// 	const userProf2= await getAllCreators(filterString)
	// 	console.log("safa",userProf)
		
	// 	const totalPages=Math.ceil((userProf2.length)/(limitno))
	// 	var pageNoArray=[]
		
	// 	for(var i=1;i<=totalPages;i++){
	// 		pageNoArray.push(i)
	// 	  }
	
	// 	res.json({ status:"succes",adminUser: userProf,totalPages:pageNoArray,pageNo:pageno });
	// }
	}catch (err) {
	
		return res.json({ status:"error", message: err });
	}

	
});


router.post('/getCreator',adminUserAuthorization, async (req, res) => {
	//this data coming form database

	try{

		const {_id}=req.body
		



		const userProf = await getCreatrorById(_id);
		
	
		res.json({ status:"success",creator: userProf });
	
	
	}catch (err) {
	
		return res.json({ status:"error", message: err });
	}

	
});


router.post('/deleteCreator',adminUserAuthorization, async (req, res) => {
	//this data coming form database

	try{

		const {_id}=req.body
		



		const userProf = await deleteCreatorById(_id);
		
	
		res.json({ status:"success",message: "user has been deleted" });
	
	
	}catch (err) {
	
		return res.json({ status:"error", message: err });
	}

	
});




module.exports = router;