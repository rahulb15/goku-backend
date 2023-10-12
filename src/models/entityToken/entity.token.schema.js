const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EntityTokenSchema = new Schema({

    token: { type: String, required: true, index: true },
    expiresAt: { type: Date },
    userId: { type: Schema.Types.ObjectId },
    email: { type: String, lowercase: true },
    createdAt: { type: Date },

 
 
});

module.exports = {
  EntityTokenSchema: mongoose.model("EntityToken", EntityTokenSchema),
};