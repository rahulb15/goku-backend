const { NftLikeSchema } = require("./like.schema");

const addNftLikes = (userObj) => {
  return new Promise((resolve, reject) => {
    NftLikeSchema(userObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getLikedNftById = (nftLiked) => {
  return new Promise((resolve, reject) => {
    // if (!nftLiked) return false;

    try {
      NftLikeSchema.find({ nftLiked }, (error, data) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getLikedNftByUser = (frmdata) => {
  return new Promise((resolve, reject) => {
    try {
      NftLikeSchema.findOne(
        {
          $and: [
            { clientId: frmdata.clientId },
            { nftLiked: frmdata.nftLiked },
          ],
        },
        (error, data) => {
          if (error) {
            reject(error);
          }
          resolve(data);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

const removeLikedNftByUser = (frmdata) => {
  return new Promise((resolve, reject) => {
    // if (nftLiked) return false;

    try {
      NftLikeSchema.remove(
        {
          $and: [
            { clientId: frmdata.clientId },
            { nftLiked: frmdata.nftLiked },
          ],
        },
        (error, data) => {
          if (error) {
            reject(error);
          }
          resolve(data);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

const getAllLikedNftByUsers = (clientId, type) => {
  return new Promise((resolve, reject) => {
    // if (nftLiked) return false;

    try {
      NftLikeSchema.find(
        { $and: [{ clientId: clientId }, { type: type }] },
        (error, data) => {
          if (error) {
            reject(error);
          }
          resolve(data);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  addNftLikes,
  getLikedNftById,
  getLikedNftByUser,
  removeLikedNftByUser,
  getAllLikedNftByUsers,
};
