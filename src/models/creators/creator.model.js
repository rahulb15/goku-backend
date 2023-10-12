const { UserSchema } = require("../user/user.schema");

const insertCollectionDetails = (userObj) => {
  return new Promise((resolve, reject) => {
    CollectionSchema(userObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getCollectionByTab = (tab) => {
  return new Promise((resolve, reject) => {


    try {
      CollectionSchema.find(
        { 'category': tab }
        , (error, data) => {
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

const getCreators = (page, limitNo, search) => {
  console.log("pageno", page)
  console.log("limitno", limitNo)
  console.log("search", search)
  const limit = parseInt(limitNo)

  return new Promise((resolve, reject) => {
    try {
      const usersNfts = UserSchema.aggregate([
        {
                    $lookup: {
                      from: "nfts",       // other table name
                      localField: "_id",   // name of users table field
                      foreignField: "clientId", // name of userinfo table field
                      as: "nft_info"         // alias for userinfo table
                    }
                  },
                  {
                    $lookup: {
                      from: "collections",       // other table name
                      localField: "_id",   // name of users table field
                      foreignField: "clientId", // name of userinfo table field
                      as: "collection_info"         // alias for userinfo table
                    }
                  },
        {
          $facet: {
            paginatedResults: [
              { $skip: (page - 1) * limit },
              { $limit: limit },
              {$match: { $or: [ { "name": { $regex: search, $options: "i" } }, { "description": { $regex: search, $options: "i" } } ] }}
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
      resolve(usersNfts)
    } catch (error) {
      reject(error);
    }
  });
}


     


//   return new Promise((resolve, reject) => {


//     try {

//       const skipNo = (pageno - 1) * (limitno)

//       const usersNfts = UserSchema.aggregate([


//         { $skip: (skipNo) },
//         { $limit: (limitno) },
//         // Join with user_info table
//         {
//           $lookup: {
//             from: "nfts",       // other table name
//             localField: "_id",   // name of users table field
//             foreignField: "clientId", // name of userinfo table field
//             as: "nft_info"         // alias for userinfo table
//           }
//         },
//         {
//           $lookup: {
//             from: "collections",       // other table name
//             localField: "_id",   // name of users table field
//             foreignField: "clientId", // name of userinfo table field
//             as: "collection_info"         // alias for userinfo table
//           }
//         },



//       ]);



//       resolve(usersNfts)
//     } catch (error) {
//       reject(error);
//     }
//   });

// }




const getFilteredCreators = (pageno, limitno, filterString) => {


  return new Promise((resolve, reject) => {


    try {

      const skipNo = (pageno - 1) * (limitno)

      const usersNfts = UserSchema.aggregate([


        { $match: { name: { $regex: `${filterString}`, '$options': 'i' } } },

        { $skip: (skipNo) },
        { $limit: (limitno) },
        // Join with user_info table
        {
          $lookup: {
            from: "nfts",       // other table name
            localField: "_id",   // name of users table field
            foreignField: "clientId", // name of userinfo table field
            as: "nft_info"         // alias for userinfo table
          }
        },
        {
          $lookup: {
            from: "collections",       // other table name
            localField: "_id",   // name of users table field
            foreignField: "clientId", // name of userinfo table field
            as: "collection_info"         // alias for userinfo table
          }
        },


      ]);



      resolve(usersNfts)
    } catch (error) {
      reject(error);
    }
  });

}


const getAllCreators = (filterString) => {


  return new Promise((resolve, reject) => {


    try {


      const usersNfts = UserSchema.aggregate([


        { $match: { name: { $regex: `${filterString}`, '$options': 'i' } } },


        // Join with user_info table
        {
          $lookup: {
            from: "nfts",       // other table name
            localField: "_id",   // name of users table field
            foreignField: "clientId", // name of userinfo table field
            as: "nft_info"         // alias for userinfo table
          }
        },
        {
          $lookup: {
            from: "collections",       // other table name
            localField: "_id",   // name of users table field
            foreignField: "clientId", // name of userinfo table field
            as: "collection_info"         // alias for userinfo table
          }
        },


      ]);



      resolve(usersNfts)
    } catch (error) {
      reject(error);
    }
  });

}


const getCreatrorById = (_id) => {
	return new Promise((resolve, reject) => {
		if (!_id) return false;

		try {
			UserSchema.findOne({ _id }, (error, data) => {
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

const deleteCreatorById = (_id) => {
	return new Promise((resolve, reject) => {
		if (!_id) return false;

		try {
			UserSchema.findOneAndDelete({ _id }, (error, data) => {
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





module.exports = {
  insertCollectionDetails,
  getCollectionByTab,
  getCreators,
  getAllCreators,
  getFilteredCreators,
  getCreatrorById,
  deleteCreatorById

};