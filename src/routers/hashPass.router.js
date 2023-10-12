const express = require("express");
const router = express.Router();
const { crateAccessJWT } = require("../helpers/jwt.helper");
const { UserSchema } = require("../models/user/user.schema");
const { HashPassSchema } = require("../models/hashPass/hashpassSchema.js");

const {
  userAuthorization,
} = require("../middlewares/authorization.middleware");
const { insertHashPass } = require("../models/hashPass/hashModel");

router.post("/addHashPass", async (req, res) => {
  const { hashObject } = req.body;

  try {
    
    // 

    for (let [key, value] of Object.entries(hashObject)) {
      
      const {
        hash,
        name,
        description,
        image,
        attributes,
        creators,
        collection,
        symbol,
        seller_fee_basis_points,
      } = value;
      const newHashObj = {
        hash,
        name,
        description,
        image,
        tokenId: key,
        attributes,
        creators,
        collectionName: collection,
        symbol,
        seller_fee_basis_points,
      };

      const result = await insertHashPass(newHashObj);
      
    }

    res.json({ status: "success", message: "New user created" });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
});

router.post("/getMetaData", async (req, res) => {
  try {
    
    const id = req.userId;
    const { tokenId } = req.body;
    
    const hash = tokenId;
    // const result = await getAllPasses();
    const passDetails = await HashPassSchema.find({ hash: hash });
    

    return res.json({
      status: "success",
      data: passDetails,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
