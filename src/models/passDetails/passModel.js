const { PassSchema } = require("./passSchema");
const mongoose = require("mongoose");


const insertPassDetails = (userObj) => {
	console.log("userObsssssssssssssj",userObj)
  return new Promise((resolve, reject) => {
    PassSchema(userObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getNftPassById = (_id) => {
	return new Promise((resolve,reject) => {
		

		try {
			PassSchema.find({ _id}, (error, data) => {
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

const getNftPassById2 = (_id) => {
	return new Promise((resolve, reject) => {
		//aggregate query for get nft by id with collectionId and clientId
		try {
			PassSchema.aggregate([
			{
			  $match: {
				$and: [{ _id: mongoose.Types.ObjectId(_id) }],
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
			  PassSchema.updateOne({ _id: mongoose.Types.ObjectId(_id) }, { $inc: { views: 1 } }, (updateError) => {
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

const getPassByTab = (tab) => {
	return new Promise((resolve, reject) => {
		

		try {
			PassSchema.find(
                {'passName':tab} 
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

const getUserDbcooperMarketplaceTrueAll = (
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
		PassSchema.aggregate([
		  {
			$match: {
			  $and: [
				{ onMarketplace: true },
				{
				  $or: [
					{ passName: { $regex: search, $options: "i" } },
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
  




module.exports = {
    insertPassDetails,
    getNftPassById,
	getNftPassById2,
	getPassByTab,
	getUserDbcooperMarketplaceTrueAll
  };