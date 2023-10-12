const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DbCooperSchema = new Schema({
  passNumber: {
    type: String,
    required: true,

  },
  id:{
      type:Number
  },
  totalMintNumber:{
    type:Number
},
totalPass:{
  type:Number
}
 
});

module.exports = {
  DbCooperSchema: mongoose.model("DbCooper", DbCooperSchema),
};