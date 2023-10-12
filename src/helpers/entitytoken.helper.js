

const { EntityTokenSchema } = require("../models/entityToken/entity.token.schema");

/**
 * GENERATE TOKEN
 * @param {*} body
 * @createdBy :- Lakshay
 */
 const createEntityToken = async function (body) {
    try {
    
    var  token = body.userId;
      let lifeSpan = new Date().setMinutes(new Date().getMinutes() + 84600);
  
      /**
       * tOKEN OBJ**********************************************************************
       */
      const tokenObj = {
        token: token,
        expiresAt: lifeSpan,
        userId: body.userId,
        email: body.email,
        createdAt: new Date(),
      };
      /**********************************************************************************/
      await EntityTokenSchema.updateOne(
        { userId: body.userId },
        { $set: tokenObj },
        {
          upsert: true,
        }
      );
      return token;
    } 
    catch (error) {
      
      return false;
    }
  };

  async function getSubDomainUrl(pathSuffix = "") {
    try {
      return `http://${process.env.USER_HOST}/${pathSuffix}`;
    } 
    catch (error) {
      
      return false;
    }
  }

  module.exports = {
	createEntityToken,
    getSubDomainUrl
};