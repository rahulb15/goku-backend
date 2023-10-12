const { CollectionSchema } = require("./collection.schema");

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
                {'category':tab} 
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




module.exports = {
    insertCollectionDetails,
    getCollectionByTab,
 
  };