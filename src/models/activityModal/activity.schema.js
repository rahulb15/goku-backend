const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    clientId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    activityType: {
        enum: ["mint", "sale", "bid", "transfer","like","purchase","listing" ],
        type: String,
        required: true,
    },
    activityInfo:{
        type:String
    },
    collectionName:{
        type:String
    },
    collectionId: {
        type: Schema.Types.ObjectId,
    },
    nftId: {
        type: Schema.Types.ObjectId,
    },
    activityStatus:{
        type:String
    },
    activityImageUrl:{
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});

module.exports = {
    ActivitySchema: mongoose.model("Activity", ActivitySchema),
  };