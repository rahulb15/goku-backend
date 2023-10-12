const { NftSchema } = require("./nft.schema");
const { PassSchema } = require("../passDetails/passSchema");

const mongoose = require("mongoose");

const insertNftDetails = (userObj) => {
  return new Promise((resolve, reject) => {
    NftSchema(userObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};


const getNftCollectionById = (collectionId) => {
  return new Promise((resolve, reject) => {
    try {
      NftSchema.find({ collectionId }, (error, data) => {
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

const getNftCollectionByIdMarketPlace = (
  collectionId,
  page,
  limit,
  search,
  minAmount,
  maxAmount,
  selected
) => {
  const limitno = parseInt(limit);
  const pageno = parseInt(page);
  const minAmountno = parseInt(minAmount);
  const maxAmountno = parseInt(maxAmount);
  //selected ["Buy now","On Auction","New"]
  const selectedFilter = [];
  if (selected.length > 0) {
    selected.forEach((element) => {
      if (element == "Buy now") {
        selectedFilter.push("Fixed Price");
      }
      if (element == "On Auction") {
        selectedFilter.push("Timed Auction");
      } else{
        selectedFilter.push("All");
      }
    });
  }
  else{
    selectedFilter.push("All","Fixed Price","Timed Auction");
  }


  return new Promise((resolve, reject) => {
    try {
      NftSchema.aggregate([
        {
          $match: {
            $and: [
              { collectionId: mongoose.Types.ObjectId(collectionId) },
              {
                $or: [
                  { collectionName: { $regex: search, $options: "i" } },
                  { imageIndex: { $regex: search, $options: "i" } },
                ],
              },
              { onMarketplace: true },
              {
                $or: [
                  { sellingType: { $in: selectedFilter } },
                  { sellingType: { $exists: false } }, // Include all when nothing is selected
                ],
              },
              {
                $or: [
                  {
                    $expr: {
                      $and: [
                        { $regexMatch: { input: "$nftPrice", regex: /^\d+(\.\d+)?$/ } },
                        { $gte: [{ $toDouble: "$nftPrice" }, minAmountno] },
                        { $lte: [{ $toDouble: "$nftPrice" }, maxAmountno] },
                      ],
                    },
                  },
                  { nftPrice: { $exists: false } }, // Include all when no price filter is provided
                ],
              },
            ],
          },
        },
        {
          $lookup: {
            from: "users", // other table name
            localField: "clientId", // name of users table field
            foreignField: "_id", // name of userinfo table field
            as: "user_info", // alias for userinfo table
          },
          $lookup: {
            from: "collections", // other table name
            localField: "collectionId", // name of users table field
            foreignField: "_id", // name of userinfo table field
            as: "collection_info", // alias for userinfo table
          },
        },
        {
          $facet: {
            paginatedResults: [
              { $skip: (pageno - 1) * limitno },
              { $limit: limitno },
              { $sort: { createdAt: -1 } },
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
      ]).exec((error, data) => {
        if (error) {
          
          reject(error);
        }
        if (data[0] == null) {
          resolve([]);
        }
        resolve(data[0]);
        // resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getUserNftMarketplaceFalse = (
  collectionId,
  clientId,
  page,
  limit,
  search,
  minAmount,
  maxAmount,
  selected
) => {
  const limitno = parseInt(limit);
  const pageno = parseInt(page);
  const minAmountno = parseInt(minAmount);
  const maxAmountno = parseInt(maxAmount);
  //selected ["Buy now","On Auction","New"]
  const selectedFilter = [];
  if (selected.length > 0) {
    selected.forEach((element) => {
      if (element == "Buy now") {
        selectedFilter.push("Fixed Price");
      }
      if (element == "On Auction") {
        selectedFilter.push("Timed Auction");
      } else{
        selectedFilter.push("All");
      }
    });
  }
  else{
    selectedFilter.push("All","Fixed Price","Timed Auction");
  }


  return new Promise((resolve, reject) => {
    try {
      NftSchema.aggregate([
        {
          $match: {
            $and: [
              { clientId: clientId, collectionId: mongoose.Types.ObjectId(collectionId) },
              {
                $or: [
                  { collectionName: { $regex: search, $options: "i" } },
                  { imageIndex: { $regex: search, $options: "i" } },
                ],
              },
              { onMarketplace: false },
              {
                $or: [
                  { sellingType: { $in: selectedFilter } },
                  { sellingType: { $exists: false } }, // Include all when nothing is selected
                ],
              },
              {
                $or: [
                  {
                    $expr: {
                      $and: [
                        { $regexMatch: { input: "$nftPrice", regex: /^\d+(\.\d+)?$/ } },
                        { $gte: [{ $toDouble: "$nftPrice" }, minAmountno] },
                        { $lte: [{ $toDouble: "$nftPrice" }, maxAmountno] },
                      ],
                    },
                  },
                  { nftPrice: { $exists: false } }, // Include all when no price filter is provided
                ],
              },
            ],
          },
        },
        {
          $lookup: {
            from: "users", // other table name
            localField: "clientId", // name of users table field
            foreignField: "_id", // name of userinfo table field
            as: "user_info", // alias for userinfo table
          },
          $lookup: {
            from: "collections", // other table name
            localField: "collectionId", // name of users table field
            foreignField: "_id", // name of userinfo table field
            as: "collection_info", // alias for userinfo table
          },
        },
        {
          $facet: {
            paginatedResults: [
              { $skip: (pageno - 1) * limitno },
              { $limit: limitno },
              { $sort: { createdAt: -1 } },
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
      ]).exec((error, data) => {
        if (error) {
          
          reject(error);
        }
        if (data[0] == null) {
          resolve([]);
        }
        resolve(data[0]);
        // resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getNftCollectionByIdMarketPlaceOff = (
  clientId,
  page,
  limit,
  search,
  minAmount,
  maxAmount,
  selected
) => {
  const limitno = parseInt(limit);
  const pageno = parseInt(page);
  const minAmountno = parseInt(minAmount);
  const maxAmountno = parseInt(maxAmount);
  //selected ["Buy now","On Auction","New"]
  const selectedFilter = [];
  if (selected.length > 0) {
    selected.forEach((element) => {
      if (element == "Buy now") {
        selectedFilter.push("Fixed Price");
      }
      if (element == "On Auction") {
        selectedFilter.push("Timed Auction");
      } else{
        selectedFilter.push("All");
      }
    });
  }
  else{
    selectedFilter.push("All","Fixed Price","Timed Auction");
  }


  return new Promise((resolve, reject) => {
    try {
      NftSchema.aggregate([
        {
          $match: {
            $and: [
              { clientId: mongoose.Types.ObjectId(clientId) },
              {
                $or: [
                  { collectionName: { $regex: search, $options: "i" } },
                  { imageIndex: { $regex: search, $options: "i" } },
                ],
              },
              { onMarketplace: false },
              {
                $or: [
                  { sellingType: { $in: selectedFilter } },
                  { sellingType: { $exists: false } }, // Include all when nothing is selected
                ],
              },
              {
                $or: [
                  {
                    $expr: {
                      $and: [
                        { $regexMatch: { input: "$nftPrice", regex: /^\d+(\.\d+)?$/ } },
                        { $gte: [{ $toDouble: "$nftPrice" }, minAmountno] },
                        { $lte: [{ $toDouble: "$nftPrice" }, maxAmountno] },
                      ],
                    },
                  },
                  { nftPrice: { $exists: false } }, // Include all when no price filter is provided
                ],
              },
            ],
          },
        },
        {
          $lookup: {
            from: "users", // other table name
            localField: "clientId", // name of users table field
            foreignField: "_id", // name of userinfo table field
            as: "user_info", // alias for userinfo table
          },
          $lookup: {
            from: "collections", // other table name
            localField: "collectionId", // name of users table field
            foreignField: "_id", // name of userinfo table field
            as: "collection_info", // alias for userinfo table
          },
        },
        {
          $facet: {
            paginatedResults: [
              { $skip: (pageno - 1) * limitno },
              { $limit: limitno },
              { $sort: { createdAt: -1 } },
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
      ]).exec((error, data) => {
        if (error) {
          
          reject(error);
        }
        if (data[0] == null) {
          resolve([]);
        }
        resolve(data[0]);
        // resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getUserNftMarketplaceTrueAllCollectionOnAuction = (
  clientId,
  page,
  limit,
  search,
  minAmount,
  maxAmount,
  selected
) => {
  const limitno = parseInt(limit);
  const pageno = parseInt(page);
  const minAmountno = parseInt(minAmount);
  const maxAmountno = parseInt(maxAmount);
  //selected ["Buy now","On Auction","New"]
  const selectedFilter = [];
  if (selected.length > 0) {
    selected.forEach((element) => {
      if (element == "Buy now") {
        selectedFilter.push("Fixed Price");
      }
      if (element == "On Auction") {
        selectedFilter.push("Timed Auction");
      } else{
        selectedFilter.push("All");
      }
    });
  }
  else{
    selectedFilter.push("All","Fixed Price","Timed Auction");
  }


  return new Promise((resolve, reject) => {
    try {
      NftSchema.aggregate([
        {
          $match: {
            $and: [
              { clientId: mongoose.Types.ObjectId(clientId) },
              {
                $or: [
                  { collectionName: { $regex: search, $options: "i" } },
                  { imageIndex: { $regex: search, $options: "i" } },
                ],
              },
              { onMarketplace: true , onAuction: true},
              {
                $or: [
                  { sellingType: { $in: selectedFilter } },
                  { sellingType: { $exists: false } }, // Include all when nothing is selected
                ],
              },
              {
                $or: [
                  {
                    $expr: {
                      $and: [
                        { $regexMatch: { input: "$nftPrice", regex: /^\d+(\.\d+)?$/ } },
                        { $gte: [{ $toDouble: "$nftPrice" }, minAmountno] },
                        { $lte: [{ $toDouble: "$nftPrice" }, maxAmountno] },
                      ],
                    },
                  },
                  { nftPrice: { $exists: false } }, // Include all when no price filter is provided
                ],
              },
            ],
          },
        },
        {
          $lookup: {
            from: "users", // other table name
            localField: "clientId", // name of users table field
            foreignField: "_id", // name of userinfo table field
            as: "user_info", // alias for userinfo table
          },
          $lookup: {
            from: "collections", // other table name
            localField: "collectionId", // name of users table field
            foreignField: "_id", // name of userinfo table field
            as: "collection_info", // alias for userinfo table
          },
        },
        {
          $facet: {
            paginatedResults: [
              { $skip: (pageno - 1) * limitno },
              { $limit: limitno },
              { $sort: { createdAt: -1 } },
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
      ]).exec((error, data) => {
        if (error) {
          
          reject(error);
        }
        if (data[0] == null) {
          resolve([]);
        }
        resolve(data[0]);
        // resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getUserNftMarketplaceTrueAllCollectionOnSale= (
  clientId,
  page,
  limit,
  search,
  minAmount,
  maxAmount,
  selected
) => {
  const limitno = parseInt(limit);
  const pageno = parseInt(page);
  const minAmountno = parseInt(minAmount);
  const maxAmountno = parseInt(maxAmount);
  //selected ["Buy now","On Auction","New"]
  const selectedFilter = [];
  if (selected.length > 0) {
    selected.forEach((element) => {
      if (element == "Buy now") {
        selectedFilter.push("Fixed Price");
      }
      if (element == "On Auction") {
        selectedFilter.push("Timed Auction");
      } else{
        selectedFilter.push("All");
      }
    });
  }
  else{
    selectedFilter.push("All","Fixed Price","Timed Auction");
  }


  return new Promise((resolve, reject) => {
    try {
      NftSchema.aggregate([
        {
          $match: {
            $and: [
              { clientId: mongoose.Types.ObjectId(clientId) },
              {
                $or: [
                  { collectionName: { $regex: search, $options: "i" } },
                  { imageIndex: { $regex: search, $options: "i" } },
                ],
              },
              { onMarketplace: true , onSale: true},
              {
                $or: [
                  { sellingType: { $in: selectedFilter } },
                  { sellingType: { $exists: false } }, // Include all when nothing is selected
                ],
              },
              {
                $or: [
                  {
                    $expr: {
                      $and: [
                        { $regexMatch: { input: "$nftPrice", regex: /^\d+(\.\d+)?$/ } },
                        { $gte: [{ $toDouble: "$nftPrice" }, minAmountno] },
                        { $lte: [{ $toDouble: "$nftPrice" }, maxAmountno] },
                      ],
                    },
                  },
                  { nftPrice: { $exists: false } }, // Include all when no price filter is provided
                ],
              },
            ],
          },
        },
        {
          $lookup: {
            from: "users", // other table name
            localField: "clientId", // name of users table field
            foreignField: "_id", // name of userinfo table field
            as: "user_info", // alias for userinfo table
          },
          $lookup: {
            from: "collections", // other table name
            localField: "collectionId", // name of users table field
            foreignField: "_id", // name of userinfo table field
            as: "collection_info", // alias for userinfo table
          },
        },
        {
          $facet: {
            paginatedResults: [
              { $skip: (pageno - 1) * limitno },
              { $limit: limitno },
              { $sort: { createdAt: -1 } },
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
      ]).exec((error, data) => {
        if (error) {
          
          reject(error);
        }
        if (data[0] == null) {
          resolve([]);
        }
        resolve(data[0]);
        // resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};


const getUserNftMarketplaceTrueAll = (
  page,
  limit,
  search,
  minAmount,
  maxAmount,
  selected
) => {
  const limitno = parseInt(limit);
  const pageno = parseInt(page);
  const minAmountno = parseInt(minAmount);
  const maxAmountno = parseInt(maxAmount);
  //selected ["Buy now","On Auction","New"]
  const selectedFilter = [];
  if (selected.length > 0) {
    selected.forEach((element) => {
      if (element == "Buy now") {
        selectedFilter.push("Fixed Price");
      }
      if (element == "On Auction") {
        selectedFilter.push("Timed Auction");
      } else{
        selectedFilter.push("All");
      }
    });
  }
  else{
    selectedFilter.push("All","Fixed Price","Timed Auction");
  }


  return new Promise((resolve, reject) => {
    try {
      NftSchema.aggregate([
        {
          $match: {
            $and: [
              { onMarketplace: true },
              {
                $or: [
                  { collectionName: { $regex: search, $options: "i" } },
                  { imageIndex: { $regex: search, $options: "i" } },
                ],
              },
              {
                $or: [
                  { sellingType: { $in: selectedFilter } },
                  { sellingType: { $exists: false } }, // Include all when nothing is selected
                ],
              },
              {
                $or: [
                  {
                    $expr: {
                      $and: [
                        { $regexMatch: { input: "$nftPrice", regex: /^\d+(\.\d+)?$/ } },
                        { $gte: [{ $toDouble: "$nftPrice" }, minAmountno] },
                        { $lte: [{ $toDouble: "$nftPrice" }, maxAmountno] },
                      ],
                    },
                  },
                  { nftPrice: { $exists: false } }, // Include all when no price filter is provided
                ],
              },
            ],
          },
        },
        {
          $lookup: {
            from: "users", // other table name
            localField: "clientId", // name of users table field
            foreignField: "_id", // name of userinfo table field
            as: "user_info", // alias for userinfo table
          },
          $lookup: {
            from: "collections", // other table name
            localField: "collectionId", // name of users table field
            foreignField: "_id", // name of userinfo table field
            as: "collection_info", // alias for userinfo table
          },
        },
        {
          $facet: {
            paginatedResults: [
              { $skip: (pageno - 1) * limitno },
              { $limit: limitno },
              { $sort: { createdAt: -1 } },
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
      ]).exec((error, data) => {
        if (error) {
          
          reject(error);
        }
        if (data[0] == null) {
          resolve([]);
        }
        resolve(data[0]);
        // resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};




const getNftCollectionOfUser = (frmdata) => {
  return new Promise((resolve, reject) => {
    try {
      NftSchema.find(
        {
          $and: [
            { clientId: frmdata.clientId },
            { collectionId: frmdata.collectionId },
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

const getNftById = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      NftSchema.find({ _id }, (error, data) => {
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

const getNftByIdPass = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      PassSchema.find({ _id }, (error, data) => {
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
const getNftById2 = (_id) => {
  return new Promise((resolve, reject) => {
    //aggregate query for get nft by id with collectionId and clientId
    try {
      NftSchema.aggregate([
        {
          $match: {
            $and: [{ _id: mongoose.Types.ObjectId(_id) }],
          },
        },
        {
          $lookup: {
            from: "collections", // other table name
            localField: "collectionId", // name of users table field
            foreignField: "_id", // name of userinfo table field
            as: "collection_info", // alias for userinfo table
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
      ]).exec((error, data) => {
        if (error) {
          
          reject(error);
        }
        if (data[0] == null) {
          resolve([]);
        }
        else {
          // Increment the 'views' field for the found document
          NftSchema.updateOne({ _id: mongoose.Types.ObjectId(_id) }, { $inc: { views: 1 } }, (updateError) => {
            if (updateError) {
              
              reject(updateError);
            } else {
              resolve(data[0]);
            }
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

//get all nft if onAuction is true
const getAllNftOnAuction = () => {
  return new Promise((resolve, reject) => {
    try {
      NftSchema.find({ onAuction: true }, (error, data) => {
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

// //get count all nft unique owner by client id
// const getCountNftUniqueOwner = (clientId) => {
// 	  return new Promise((resolve, reject) => {
// 		try {
// 		  NftSchema.aggregate([
// 			{
// 			  $match: {
// 				$and: [
// 				  { clientId: mongoose.Types.ObjectId(clientId) },
// 				],
// 			  },
// 			},
// 			{
// 			  $group: {
// 				_id: "$_id",
// 				count: { $sum: 1 },
// 			  },
// 			},
// 		  ]).exec((error, data) => {
// 			if (error) {
// 			  
// 			  reject(error);
// 			}
// 			if (data[0] == null) {
// 			  resolve([]);
// 			}
// 			resolve(data);
// 		  });
// 		}
// 		catch (error) {
// 			reject(error);
// 		}
// 	  });
// 	};

// //sum of all nft price by client id
// const addTotalNftPrice = (clientId, nftPrice) => {
//   return new Promise((resolve, reject) => {
// 	try {
// 	  NftSchema.aggregate([
// 		{
// 		  $match: {
// 			$and: [
// 			  { clientId: mongoose.Types.ObjectId(clientId) },
// 			],
// 		  },
// 		},
// 		{
// 			$project: {
// 			  numericValue: { $toDouble: "$nftPrice" },
// 			}
// 		  },
// 		{
// 		  $group: {
// 			_id: "$nftPrice",
// 			total: { $sum: "$numericValue" },
// 		  },

// 		},
// 	  ]).exec((error, data) => {
// 		if (error) {
// 		  
// 		  reject(error);
// 		}
// 		if (data[0] == null) {
// 		  resolve([]);
// 		}
// 		resolve(data);
// 	  });
// 	}
// 	catch (error) {
// 		reject(error);
// 	}
//   });
// };

// //get base nftPrice by client id
// const getBaseNftPrice = (clientId) => {
// return new Promise((resolve, reject) => {
// 	try {
// 	NftSchema.aggregate([
// 		{
// 		$match: {
// 			$and: [
// 			{ clientId: mongoose.Types.ObjectId(clientId) },
// 			],
// 		},
// 		},
// 		{
// 			$project: {
// 			  numericValue: { $toDouble: "$nftPrice" },
// 			}
// 		  },
// 		{
// 		$group: {
// 			_id: null,
// 			lowestPrice: { $min: "$numericValue" },
// 		},

// 		},
// 	]).exec((error, data) => {
// 		if (error) {
// 		
// 		reject(error);
// 		}
// 		if (data[0] == null) {
// 		resolve([]);
// 		}
// 		resolve(data);
// 	});
// 	}
// 	catch (error) {
// 		reject(error);
// 	}
// });
// };

module.exports = {
  insertNftDetails,
  getNftCollectionById,
  getNftCollectionOfUser,
  getNftById,
  getNftById2,
  getAllNftOnAuction,
  getNftCollectionByIdMarketPlace,
  getNftCollectionByIdMarketPlaceOff,
  getUserNftMarketplaceTrueAllCollectionOnAuction,
  getUserNftMarketplaceTrueAllCollectionOnSale,
  getUserNftMarketplaceFalse,
  getUserNftMarketplaceTrueAll,
  getNftByIdPass
  // getCountNftUniqueOwner,
  // addTotalNftPrice,
  // getBaseNftPrice
};
