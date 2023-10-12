const express = require("express");
const router = express.Router();
const { crateAccessJWT } = require('../helpers/jwt.helper');
const { UserSchema } = require("../models/user/user.schema");
var cors = require('cors')
const {userAuthorization}=require("../middlewares/authorization.middleware")
const {
	insertUser,
getUserById
} = require("../models/user/user.model");

var corsOptions = {
	origin: 'https://kryptomerch.flexsin.org/',
	// some legacy browsers (IE11, various SmartTVs) choke on 204
  }


// router.post("/",  async (req, res) => {
// 	const { name, email,walletAddress } = req.body;

// 	try {
//         const emailExist = await UserSchema.findOne({ email: email }).lean();
//         if (emailExist) {
//           throw "Email already exists."
//         }

// 		const newUserObj = {
// 			name,
// 			walletAddress,
// 			email,
// 		};
// 		const result = await insertUser(newUserObj);
// 		console.log(result);

	
// 		res.json({ status: "success", message: "New user created", result });
// 	} catch (error) {
		
	
// 		res.json({ status: "error", message:error });
// 	}
// });

router.post("/register", async (req, res) => {
	console.log("ssc1")
	const { walletAddress } = req.body;

	try {

		const newUserObj = {
			
			walletAddress
		};
console.log("hey1",walletAddress)
		const accessJWT = await crateAccessJWT(walletAddress)
console.log("Ss",accessJWT)
        const walletAddressExist = await UserSchema.findOne({ walletAddress: walletAddress }).lean();
       console.log("hh")
	   console.log("hh245",walletAddressExist)
		if (walletAddressExist) {

			UserSchema.findOneAndUpdate({_id: walletAddressExist._id}, {lastLogin: Date.now()}, (err, data) => {
				if(err) console.log(err);
				else console.log("Successfully updated the lastLogin", data);
			
			   
			  });

			return res.json({ status: "success", message: "Wallet Already exsist", accessJWT:accessJWT });
        }


// UserSchema.findOneAndUpdate({_id: walletAddressExist._id}, {lastLogin: Date.now()}, (err, data) => {
//     if(err) console.log(err);
//     else console.log("Successfully updated the lastLogin", data);

   
//   });
		
		const result = await insertUser(newUserObj);

		console.log(result);


	
		res.json({ status: "success", message: "New user created", accessJWT:accessJWT });
	} catch (error) {
		
	
		res.json({ status: "error", message:error });
	}
});

router.get("/checkServer",async(req,res)=>{
	try {

		res.json({status:"success",message:"server is up"})
	} catch (error) {
		
	
		res.json({ status: "error", message:error });
	}
})


router.patch('/updateUser', userAuthorization, async (req, res) => {
	try {
		console.log("hjh")
		const _id = req.userId;
		var {
			name,
			email,
			userName,
			shortBio,
			websiteUrl,
			twitterUrl,
			InstagramUrl

			
		} = req.body;

		const userProf = await getUserById(_id);
		userProf.name = name ? name : userProf.name;
		userProf.email = email ? email : userProf.email;
		userProf.userName = userName ? userName : userProf.userName;
		userProf.shortBio = shortBio ? shortBio : userProf.shortBio;
		userProf.websiteUrl = websiteUrl ? websiteUrl : userProf.websiteUrl;
		userProf.twitterUrl = twitterUrl ? twitterUrl : userProf.twitterUrl;
		userProf.InstagramUrl = InstagramUrl ? InstagramUrl : userProf.InstagramUrl;


		const result = await insertUser(userProf);

		res.json({ status: 'success', message: 'User has been Updated', result });
	} catch (error) {
		console.log(error);
		res.json({ status: 'error', message: error.message });
	}
});

router.get('/checkUser',userAuthorization, async (req, res) => {
    try {
        const id = req.userId;
        // const result = await getAllPasses();
		const user=await UserSchema.find({ _id:id });
		console.log("passes69",id)
		console.log("passes69",user)
if(user[0].name){
	return res.json({
		status: "success",
		userName:user[0].name,
		userEmail:user[0].email
		
	})
}else{
	return res.json({
		status: "error",
		
	})
}
	
       
       
        
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});


router.get('/userInfo',userAuthorization, async (req, res) => {
    try {
        const id = req.userId;
        // const result = await getAllPasses();
		const user=await UserSchema.find({ _id:id });
		
	return res.json({
		status: "success",
		userInfo:user,
	
		
	})

       
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});



module.exports = router;