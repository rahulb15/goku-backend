const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NftSchema = new Schema({
    clientId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    collectionId: {
        type: Schema.Types.ObjectId,
        ref: "Collection",
    },
    onMarketplace: {
        type: Boolean
    },
    onSale: {
        type: Boolean
    },
    bidInfo: {
        type: Array
    },
    onAuction: {
        type: Boolean
    },
    sellingType: {
        type: String,
        default: "All"
    }, 
    creatorName: {
        type: String
    },
    duration: {
        type: String
    },
    nftPrice: {
        type: String
    },
    unlockable: {
        type: Boolean
    },
    tokenId: {
        type: String
    },
    isRevealed : {
        type: Boolean,
        default: false
    },
    digitalCode: {
        type: String
    },
     description: {
        type: String
    },
    externalLink: {
        type: String
    },
    roylaities: {
        type: String
    },
    properties1: {
        type: String
    },

    properties2: {
        type: String
    },
    likes: {
        type: String
    },
    collectionName: {
        type: String
    },
    creator : {
        type: String
    },
    tokenImage: {
        type: String
    },
    hash: {
        type: String
    },
    imageIndex: {
        type: String
    },
    history: [{
        owner: {
            type: String
        },
        price: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now,
        },
        category: {
            type: String,
            enum: ["mint", "bid", "buy", "transfer","auction","sale","cancelAuction","closeSale","cancelBid"]
        }
    }],
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
    NftSchema: mongoose.model("Nft", NftSchema),
};