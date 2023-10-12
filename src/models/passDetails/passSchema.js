const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PassSchema = new Schema({
  passName: {
    type: String,
    required: true,
  },
  roylaities: {
    type: String,
  },
  passRound: {
    type: String,
    required: true,
  },
  passCost: {
    type: Number,
    required: true,
  },
  clientId: {
    type: Schema.Types.ObjectId,
},
  passTokenId: {
    type: String,
  },
  revealed: {
    type: String,
  },
  tokenHash: {
    type: String,
  },
  tokenName: {
    type: String,
  },
  tokenDescription: {
    type: String,
  },
  hash: {
    type: String,
  },
  imageIndex: {
    type: String,
  },
  tokenImage: {
    type: String,
  },
  creator: {
    type: String,
  },
  collectionName: {
    type: String,
  },
  tokenId: {
    type: String,
  },

  symbol: {
    type: String,
  },

  clientId: {
    type: Schema.Types.ObjectId,
  },
  onMarketplace: {
    type: Boolean,
    default: false
  },
  onSale: {
    type: Boolean,
    default: false
  },
  bidInfo: {
    type: Array,
    default: []
},
  onAuction: {
    type: Boolean,
    default: false
  },
  sellingType: {
    type: String,
  },
  duration: {
    type: String,
  },
  nftPrice: {
    type: String,
  },
  imageIndex: {
    type: String,
  },
  creatorName: {
    type: String
},
history: [{
  owner: {
      type: String,
      default: ""
  },
  price: {
      type: String,
      default: "0"
  },
  date: {
      type: Date,
      default: Date.now,
  },
  category: {
      type: String,
      enum: ["mint", "bid", "buy", "transfer","auction","sale","cancelAuction","closeSale","cancelBid"],
      default: "mint"
  },
}
],
views: {
  type: Number,
  default: 0
},
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = {
  PassSchema: mongoose.model("PassDetails", PassSchema),
};
