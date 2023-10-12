const { EntityTokenSchema } = require("./entity.token.schema");


const verifyTokenExpiration = async function (expiresAt) {
    try {
      let date = new Date(expiresAt);
      let currentDate = new Date();
  
      return currentDate <= date ? true : false;
    }
    catch (err) {
      
      return { error: true, message: err};
    }
  };
  
  /**
   *
   * @param {*} token
   * @createdBy Lakshay
   */
  const removeEntityToken = async function (token) {
    await EntityTokenSchema.deleteOne({ token: token });
  };

  module.exports={
    verifyTokenExpiration,
    removeEntityToken
  }