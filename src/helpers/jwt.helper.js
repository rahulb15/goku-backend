const jwt = require('jsonwebtoken');

// const { storeUserAccessJWT } = require('../model/user/User.model');
// const { token } = require('morgan');

const crateAccessJWT = async (walletAddress) => {
	try {
		const accessJWT = await jwt.sign({ walletAddress }, process.env.JWT_ACCESS_SECRET, {
			expiresIn: '1d',
		});

		// await storeUserAccessJWT(_id, accessJWT);

		return Promise.resolve(accessJWT);
	} catch (error) {
		return Promise.reject(error);
	}
};

const verifyAccessJWT = (userJWT) => {
	try {
		return Promise.resolve(jwt.verify(userJWT, process.env.JWT_ACCESS_SECRET));
	} catch (error) {
		return Promise.resolve(error);
	}
};

const crateAdminAccessJWT = async (email) => {
	try {
		const accessJWT = await jwt.sign({ email }, process.env.JWT_ADMIN_ACCESS_SECRET, {
			expiresIn: '1d',
		});

		// await storeUserAccessJWT(_id, accessJWT);

		return Promise.resolve(accessJWT);
	} catch (error) {
		return Promise.reject(error);
	}
};

const verifyAdminAccessJWT = (userJWT) => {
	try {
		return Promise.resolve(jwt.verify(userJWT, process.env.JWT_ADMIN_ACCESS_SECRET));
	} catch (error) {
		return Promise.resolve(error);
	}
};

module.exports = {
	crateAccessJWT,
    verifyAccessJWT,
	crateAdminAccessJWT,
	verifyAccessJWT,
	verifyAdminAccessJWT
};