const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NftLikeSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
  },
  nftLiked: {
    type: Schema.Types.ObjectId,
  },
  type: {
    type: String,
  },
});

module.exports = {
  NftLikeSchema: mongoose.model("nftLikes", NftLikeSchema),
};
