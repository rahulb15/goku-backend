require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const port = process.env.PORT || 4059;
//MongoDB Connection Setup
const mongoose = require("mongoose");

//API security
app.use(helmet());

//handle CORS error
app.use(cors());

// app.use(function (req, res, next) {

//  console.log("psotman",req.headers.origin)
//  if(req.headers.origin==process.env.REACT_URL){
//   next()
//  }else{
//   res.json({status:"error"})
 
//  }
 
 
// });
app.use("./uploads",express.static("uploads"))


 app.use("/public/images",express.static("public/images"))

if(process.env.HOST == 'localhost'){
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true,
     useUnifiedTopology: true,})
     .then(() => console.log("Database connected"))
     .catch((err) => console.log(err));
   }
   else{
     // const DB_URL = `mongodb+srv://kryptoMerch:${process.env.DB_PWD}@cluster0.oscauqv.mongodb.net/?retryWrites=true&w=majority`
     mongoose.connect(`mongodb://kryptomerch_user:09jEchs37s1sh389exdE92yhRF@127.0.0.1:27017/kryptomerch_db`, {
       useNewUrlParser: true,
       useUnifiedTopology: true
   }).then(() => console.log("Database connected"))
   .catch((err) =>  console.log(err));
   //ccs
     // mongoose
     // .connect(DB_URL, { useNewUrlParser: true,
     //     useUnifiedTopology: true,})
     // .then(() => console.log("Database connected"))
     // .catch((err) => 
   }

 

  //Logger
  app.use(morgan("tiny"));


// Set body bodyParser
app.use(express.json({limit: '100mb'}));

// app.use(bodyParser.json({limit: "50mb"}));
// app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


//Load routers
const userRouter = require("./src/routers/user.router");
const passRouter=require("./src/routers/priorityPass.router")
const dbPassRouter=require("./src/routers/dbCooper.router")
const passDetailsRouter=require("./src/routers/passDetails.router")
const hashPassRouter=require("./src/routers/hashPass.router")
const adminRouter=require("./src/routers/admin/admin.user.router")
const collectionRouter=require("./src/routers/collection.router")
const nftRouter=require("./src/routers/nft.router")
const likeNftRouter=require("./src/routers/like.router")

const creatorRouter=require("./src/routers/admin/creators.router")
const adminCollectionRouter=require("./src/routers/admin/adminCollection.router")
const adminNftRouter=require("./src/routers/admin/adminNft.router")
const activityRouter=require("./src/routers/activity.router")
const propertyRouter=require("./src/routers/properties.router")


//Use Routers
app.use("/user", userRouter);
app.use("/priorityPass", passRouter);
app.use("/dbCooperPass", dbPassRouter);
app.use("/passDetails",passDetailsRouter)
app.use("/hashPass",hashPassRouter)
app.use("/collection",collectionRouter)
app.use("/nft",nftRouter)
app.use("/liked-nft",likeNftRouter)
app.use("/activity",activityRouter)
app.use("/properties",propertyRouter)


 //Admin routers

 app.use("/admin",adminRouter)
 app.use("/creator",creatorRouter)
 app.use("/adminCollection",adminCollectionRouter)
 app.use("/adminNft",adminNftRouter)



//Error handler


app.use((req, res, next) => {
  const error = new Error("Resources not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
   
        res.status(error.status || 500);
        res.json({
          message: error.message,
        });
      
      
   
});

app.listen(port, () => {
  
});