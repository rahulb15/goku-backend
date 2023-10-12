const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PriorityPassSchema = new Schema({
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
  PriorityPassSchema: mongoose.model("PriorityPass", PriorityPassSchema),
};