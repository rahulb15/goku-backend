const { HashPassSchema } = require("./hashpassSchema");

const insertHashPass = (userObj) => {
  return new Promise((resolve, reject) => {
    HashPassSchema(userObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getUserByWallet = (walletAddress) => {
	return new Promise((resolve, reject) => {
		if (!walletAddress) return false;

		try {
			HashPassSchema.findOne({ walletAddress }, (error, data) => {
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


const getUserById = (_id) => {
	return new Promise((resolve, reject) => {
		if (!_id) return false;

		try {
			HashPassSchema.findOne({ _id }, (error, data) => {
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
    insertHashPass,
    getUserByWallet,
    getUserById
  };