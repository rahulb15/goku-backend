const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  clientId: {
		type: Schema.Types.ObjectId,
        ref: "User",
	},
  collectionName: {
    type: String,
    required: true,

  },
  tokenSymbol:{
      type:String
  },
  collectionInfo:{
    type:String
},
collectionUrl:{
    type:String
},
category:{
  type:String
},
imageUrl:{
    type:String
},
bannerUrl:{
    type:String
},
totalSupply:{
    type:Number
},
mintPrice:{
    type:Number
},
isActive:{
    type:Boolean,
    default:false
},
tokenList:{
    type:Array
},
royaltyFee :{
    type:Number
},
royaltyAddress:{
    type:String
},
totalNftPrice:{
    type:Number,
    default:0
},
totalNft:{
    type:Number,
    default:0
},
minNftPrice :{
    type:Number,
    default:0
},
maxNftPrice :{
    type:Number,
    default:0
},
totalNftUser:{
    type:Number,
    default:0
},
createdDate: {
  type: Date,
},

 
});

module.exports = {
  CollectionSchema: mongoose.model("Collection", CollectionSchema),
};