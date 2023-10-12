
const { default: mongoose } = require("mongoose");
const { NftSchema } = require("../nfts/nft.schema");

const getAllNft = (pageno, limitno,search) => {
  console.log("pageno", pageno)
  console.log("limitno", limitno)
  console.log("search", search)
  const limit = parseInt(limitno)

    return new Promise((resolve, reject) => {
  
      try {
  
        // const skipNo = (pageno - 1) * (limitno)
  
        const collectionInfo = NftSchema.aggregate([
 
  
       
         
          {
            $lookup: {
              from: "users",       // other table name
              localField: "clientId",   // name of users table field
              foreignField: "_id", // name of userinfo table field
              as: "user_info"         // alias for userinfo table
            }
          },
          {
            $facet: {
              paginatedResults: [
                { $skip: (pageno - 1) * limitno },
                { $limit: limit },
                {$match: { $or: [ { "creatorName": { $regex: search, $options: "i" } }, { "description": { $regex: search, $options: "i" } } ] }}
              ],
              totalCount: [
                { $count: "count" }
              ]
            }
          },
          {
            $project: {
              paginatedResults: 1,
              totalCount: { $arrayElemAt: ["$totalCount.count", 0] }
            }
          }

  
  
  
        ]);
  
  
  
        resolve(collectionInfo)
      } catch (error) {
        reject(error);
      }
    });
  
  }

  const getNftByClientId = (clientId, page, limit, search) => {
    
    
    
    


    //find all nft by client id by pagination and search
    const findAllNftByClientId = NftSchema.aggregate([
      {
        $match: { clientId: mongoose.Types.ObjectId(clientId) }
      },
      {
        $lookup : {
          from: "users",       // other table name
          localField: "clientId",   // name of users table field
          foreignField: "_id", // name of userinfo table field
          as: "user_info"         // alias for userinfo table
        }
      },
      {
        $facet: {
          paginatedResults: [
            { $skip: (page - 1) * limit },
            { $limit: parseInt(limit) },
            {$match: { $or: [ { "creatorName": { $regex: search, $options: "i" } }, { "description": { $regex: search, $options: "i" } } ] }}
          ],
          totalCount: [
            { $count: "count" }
          ]
        }
      },
      {
        $project: {
          paginatedResults: 1,
          totalCount: { $arrayElemAt: ["$totalCount.count", 0] }
        }
      }
    ]);

    


    return new Promise((resolve, reject) => {
      try {
        resolve(findAllNftByClientId);
      } catch (error) {
        reject(error);
      }
    });
  };




  




   




 

  module.exports = {
    getAllNft,
    getNftByClientId
  
  };