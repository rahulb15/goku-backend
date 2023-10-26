const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const { crateAccessJWT } = require("../helpers/jwt.helper");
const { UserSchema } = require("../models/user/user.schema");
var cors = require("cors");
const {
  userAuthorization,
} = require("../middlewares/authorization.middleware");
const { insertUser, getUserById } = require("../models/user/user.model");
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
console.log(process.env.AWS_ACCESS_KEY, process.env.AWS_SECRET_ACCESS_KEY);

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });
  const url = await getSignedUrl(s3, command);
  return url;
}
// async function init() {
//   const url = await getObjectURL("ezgif-1-30b7e72dc2.jpg");
//   console.log(url);
// }
// init();

async function putObject(key, body) {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: body,
	metadata: {
		"Content-Type": "image/jpeg",
	},
  });
  const data = await s3.send(command);
  console.log(data);
}

function generateUniqueFileName(originalFileName) {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string
  const fileExtension = originalFileName.split(".").pop();
  return `${timestamp}-${randomString}.${fileExtension}`;
}

// router.post("/upload", upload.single("file"), async (req, res) => {
// 	const file = req.file; // This is the uploaded file

//   if (!file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   const fileName = file.originalname; // Get the file name

//   // Now, you can handle the file. For example, you can use AWS SDK to upload it to S3.
//   try {
// 	await putObject(fileName, file.buffer);
//     res.json({ status: "success", message: "Image uploaded", fileName });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ status: "error", message: error.message });
//   }
// });

var corsOptions = {
  origin: "https://kryptomerch.flexsin.org/",
  // some legacy browsers (IE11, various SmartTVs) choke on 204
};

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
  console.log("ssc1");
  const { walletAddress } = req.body;

  try {
    const newUserObj = {
      walletAddress,
    };
    console.log("hey1", walletAddress);
    const accessJWT = await crateAccessJWT(walletAddress);
    console.log("Ss", accessJWT);
    const walletAddressExist = await UserSchema.findOne({
      walletAddress: walletAddress,
    }).lean();
    console.log("hh");
    console.log("hh245", walletAddressExist);
    if (walletAddressExist) {
      UserSchema.findOneAndUpdate(
        { _id: walletAddressExist._id },
        { lastLogin: Date.now() },
        (err, data) => {
          if (err) console.log(err);
          else console.log("Successfully updated the lastLogin", data);
        }
      );

      return res.json({
        status: "success",
        message: "Wallet Already exsist",
        accessJWT: accessJWT,
      });
    }

    // UserSchema.findOneAndUpdate({_id: walletAddressExist._id}, {lastLogin: Date.now()}, (err, data) => {
    //     if(err) console.log(err);
    //     else console.log("Successfully updated the lastLogin", data);

    //   });

    const result = await insertUser(newUserObj);

    console.log(result);

    res.json({
      status: "success",
      message: "New user created",
      accessJWT: accessJWT,
    });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
});

router.get("/checkServer", async (req, res) => {
  try {
    res.json({ status: "success", message: "server is up" });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
});

router.patch(
  "/updateUser",
  userAuthorization,
  upload.fields([{ name: "coverPhoto" }, { name: "profilePicture" }]),
  async (req, res) => {
    try {
      console.log("hjh");
      const _id = req.userId;
      var {
        name,
        email,
        userName,
        shortBio,
        websiteUrl,
        twitterUrl,
        InstagramUrl,
      } = req.body;
	  console.log("hjh",req.body);
	  console.log("websiteUrl",websiteUrl,req.body.websiteUrl);

      // Check if cover photo and profile picture files were uploaded
      const coverPhoto = req.files["coverPhoto"];
      const profilePicture = req.files["profilePicture"];

      let coverPhotoFileName, profilePictureFileName; // Initialize file name variables

      if (coverPhoto) {
		console.log("coverPhotooooooooooooooooooooooooooo",coverPhoto);
        // Generate a unique file name for the cover photo and upload it to S3
        coverPhotoFileName = generateUniqueFileName(coverPhoto[0].originalname);
        await putObject(coverPhotoFileName, coverPhoto[0].buffer);
      }

      if (profilePicture) {
		console.log("profilePicccccccccccccccccccccccccc",profilePicture);
        // Generate a unique file name for the profile picture and upload it to S3
        profilePictureFileName = generateUniqueFileName(
          profilePicture[0].originalname
        );
        await putObject(profilePictureFileName, profilePicture[0].buffer);
      }
	  console.log(" _id", _id);

      const userProf = await getUserById(_id);
	  console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",userProf);
      userProf.name = name ? name : userProf.name;
      userProf.email = email ? email : userProf.email;
      userProf.userName = userName ? userName : userProf.userName;
      userProf.shortBio = shortBio ? shortBio : userProf.shortBio;
      userProf.websiteUrl = websiteUrl ? websiteUrl : userProf.websiteUrl;
      userProf.twitterUrl = twitterUrl ? twitterUrl : userProf.twitterUrl;
      userProf.InstagramUrl = InstagramUrl
        ? InstagramUrl
        : userProf.InstagramUrl;

      // Update the cover photo and profile picture file names if files were uploaded
      if (coverPhotoFileName) {
        userProf.coverPhoto = coverPhotoFileName;
      }

      if (profilePictureFileName) {
        userProf.profilePicture = profilePictureFileName;
      }

	  console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",userProf);

      const result = await insertUser(userProf);

      res.json({ status: "success", message: "User has been Updated", result });
    } catch (error) {
      console.log(error);
      res.json({ status: "error", message: error.message });
    }
  }
);

router.get("/checkUser", userAuthorization, async (req, res) => {
  try {
    const id = req.userId;
    // const result = await getAllPasses();
    const user = await UserSchema.find({ _id: id });
    console.log("passes69", id);
    console.log("passes69", user);
    if (user[0].name) {
      return res.json({
        status: "success",
        userName: user[0].name,
        userEmail: user[0].email,
      });
    } else {
      return res.json({
        status: "error",
      });
    }
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.get("/userInfo", userAuthorization, async (req, res) => {
  try {
    const id = req.userId;
    // const result = await getAllPasses();
    const user = await UserSchema.find({ _id: id });
	console.log(user,"user");
	if (!user) {
		return res.status(404).json({
		  status: "error",
		  message: "User not found",
		});
	  }
  
	  const coverPhoto = user[0].coverPhoto;
	  const profilePicture = user[0].profilePicture;
	  console.log("coverPhoto",coverPhoto);
	  console.log("profilePicture",profilePicture);
  
	  // Call getObjectURL to get S3 URLs for coverPhoto and profilePicture
	  const coverPhotoURL = await getObjectURL(coverPhoto);
	  const profilePictureURL = await getObjectURL(profilePicture);
	  console.log("coverPhotoURL",coverPhotoURL);
	  console.log("profilePictureURL",profilePictureURL);

	  // Add the URLs to the user object
	  user[0].coverPhoto = coverPhotoURL.toString();
	  user[0].profilePicture = profilePictureURL.toString();


  
	  console.log("new user",user);

    return res.json({
      status: "success",
      userInfo: user,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
