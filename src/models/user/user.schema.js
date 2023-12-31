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
    default: "",

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
    default: "",
    
  },
  websiteUrl: {
    type: String,
    default: "",
    
  },
  twitterUrl: {
    type: String,
    default: "",
   
  },
  isActive : {
    type: Boolean,
    default: false,
  },
  InstagramUrl: {
    type: String,
    default: "",
   
  },
  coverPhoto: {
    type: String,
   
  },
  profilePicture: {
    type: String,
   
  },
  lastLogin: {
    type: Date,
  
},
});

module.exports = {
  UserSchema: mongoose.model("User", UserSchema),
};