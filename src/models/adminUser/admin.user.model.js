const { AdminUserSchema } = require("./admin.user.schema");
const { UserSchema } = require("../user/user.schema");
const { CollectionSchema } = require("../collection/collection.schema");



const insertAdminUser = (userObj) => {
	return new Promise((resolve, reject) => {
		AdminUserSchema(userObj)
		.save()
		.then((data) => resolve(data))
		.catch((error) => reject(error));
	});
  };

const getUserByEmail = (email) => {
	return new Promise((resolve, reject) => {
		if (!email) return false;

		try {
			AdminUserSchema.findOne({ email }, (error, data) => {
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

const getAdminUserById = (_id) => {
	return new Promise((resolve, reject) => {
		if (!_id) return false;

		try {
			AdminUserSchema.findOne({ _id }, (error, data) => {
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

//active deactive user
const activeDeactiveUser = (_id, status) => {
	return new Promise((resolve, reject) => {
		if (!_id) return false;

		try {
			const getUserData = UserSchema.findByIdAndUpdate(
				_id,
				{
					$set: {
						isActive: status,
					},
				},
				{ new: true }
			);
			resolve(getUserData);
		} catch (error) {

			reject(error);
		}
	});
};

const approveCollection = (_id, status) => {
	return new Promise((resolve, reject) => {
		if (!_id) return false;
		
		try {
			const getCollectionData = CollectionSchema.findByIdAndUpdate(
				_id,
				{
					$set: {
						isActive: status,
					},
				},
				{ new: true }
			);
			resolve(getCollectionData);
		} catch (error) {
			reject(error);
		}
	});
};

const denyCollection = (_id) => {
	//remove collection from collection table
	return new Promise((resolve, reject) => {
		if (!_id) return false;
		
		try {
			//remove collection from collection table
			const getCollectionData = CollectionSchema.findByIdAndRemove(_id);
			resolve(getCollectionData);
		} catch (error) {
			reject(error);
		}
	});
};


module.exports = {
	insertAdminUser,
    getUserByEmail,
	getAdminUserById,
	activeDeactiveUser,
	approveCollection,
	denyCollection,
  };