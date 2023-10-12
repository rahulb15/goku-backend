const { UserSchema } = require("./user.schema");

const insertUser = (userObj) => {
  return new Promise((resolve, reject) => {
    UserSchema(userObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getUserByWallet = (walletAddress) => {
	return new Promise((resolve, reject) => {
		if (!walletAddress) return false;

		try {
			UserSchema.findOne({ walletAddress }, (error, data) => {
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

module.exports = {
    insertUser,
    getUserByWallet,
    getUserById
  };