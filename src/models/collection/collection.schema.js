const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  clientId: {
		type: Schema.Types.ObjectId,
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
createdDate: {
  type: Date,
},
 
});

module.exports = {
  CollectionSchema: mongoose.model("Collection", CollectionSchema),
};