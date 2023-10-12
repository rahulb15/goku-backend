const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HashPassSchema = new Schema({
    hash: {
    type: String,
    required: true,

  },
  name: {
    type: String,
    required: true,

  },
  description: {
    type: String,
    required: true,

  },
  tokenId:{
      type:String
  },
  image:{
    type:String
},
attributes:[
  {
    trait_type:String
    ,
    value:String
    
  }
],
creators:[

],
collectionName:{
  name:String,
  family:String
},
symbol:{
  type:String
},
seller_fee_basis_points:{
  type:String
}


 
 
});

module.exports = {
  HashPassSchema: mongoose.model("HashPass", HashPassSchema),
};