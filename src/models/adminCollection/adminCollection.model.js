const { CollectionSchema } = require("../collection/collection.schema");

const getCollection = (pageno, limitno, search) => {
  
  
  
  const limit = parseInt(limitno);

  return new Promise((resolve, reject) => {
    try {
      // const skipNo = (pageno - 1) * (limitno)

      const collectionInfo = CollectionSchema.aggregate([
        // Join with user_info table
        {
          $lookup: {
            from: "nfts", // other table name
            localField: "_id", // name of users table field
            foreignField: "collectionId", // name of userinfo table field
            as: "nft_info", // alias for userinfo table
          },
        },
        {
          $lookup: {
            from: "users", // other table name
            localField: "clientId", // name of users table field
            foreignField: "_id", // name of userinfo table field
            as: "user_info", // alias for userinfo table
          },
        },

        {
          $facet: {
            paginatedResults: [
              { $sort: { createdDate: -1 } },
              { $skip: (pageno - 1) * limitno },
              { $limit: limit },
              {
                $match: {
                  $or: [{ collectionName: { $regex: search, $options: "i" } }],
                },
              },
            ],
            totalCount: [{ $count: "count" }],
          },
        },
        {
          $project: {
            paginatedResults: 1,
            totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
          },
        },
      ]);

      resolve(collectionInfo);
    } catch (error) {
      reject(error);
    }
  });
};

const getCollectionbyId = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      // const skipNo = (pageno - 1) * (limitno)

      const collectionInfo = CollectionSchema.aggregate([
        { $match: { _id: _id } },

        // Join with user_info table
        {
          $lookup: {
            from: "nfts", // other table name
            localField: "_id", // name of users table field
            foreignField: "collectionId", // name of userinfo table field
            as: "nft_info", // alias for userinfo table
          },
        },
        {
          $lookup: {
            from: "users", // other table name
            localField: "clientId", // name of users table field
            foreignField: "_id", // name of userinfo table field
            as: "user_info", // alias for userinfo table
          },
        },
      ]);

      resolve(collectionInfo);
    } catch (error) {
      reject(error);
    }
  });
};



const getCollectionByClientID = (clientID,page,limitNo,search) => {
	console.log("pageno", page)
	console.log("limitno", limitNo)
	console.log("search", search)
	const limit = parseInt(limitNo)
	
	try {
		const getCollections = CollectionSchema.aggregate([
			{
				$match: {
					'clientId': clientID
				}
			},
      {
        $lookup: {
          from: "nfts", // other table name
          localField: "_id", // name of users table field
          foreignField: "collectionId", // name of userinfo table field
          as: "nft_info", // alias for userinfo table
        },
      
      },
      {
        $lookup: {
          from: "users", // other table name
          localField: "clientId", // name of users table field
          foreignField: "_id", // name of userinfo table field
          as: "user_info", // alias for userinfo table
        },
      
      },
			{
				$facet: {
					paginatedResults: [
						{ $skip: (page - 1) * limit },
						{ $limit: limit },
					],
					totalCount: [
						{ $count: "count" }
					]
				}
			}
		])
		return getCollections;
	} catch (error) {
		reject(error);
	}
};



module.exports = {
  getCollection,
  getCollectionbyId,
  getCollectionByClientID
};
