const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//jju
const UserSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,

  },
  userName: {
    type: String,
    maxlength: 50,

  },
  email: {
    type: String,
    maxlength: 50,

  },
  walletAddress: {
    type: String,
    required: true,
  },
  shortBio: {
    type: String,
    
  },
  websiteUrl: {
    type: String,
    
  },
  twitterUrl: {
    type: String,
   
  },
  isActive : {
    type: Boolean,
    default: false,
  },
  InstagramUrl: {
    type: String,
   
  },
  lastLogin: {
    type: Date,
  
},
});

module.exports = {
  UserSchema: mongoose.model("User", UserSchema),
};