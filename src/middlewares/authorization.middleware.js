const {
  verifyAccessJWT,
  verifyAdminAccessJWT,
} = require("../helpers/jwt.helper");

const { getUserByWallet } = require("../models/user/user.model");

const { getUserByEmail } = require("../models/adminUser/admin.user.model");

const userAuthorization = async (req, res, next) => {
  // sss
  const { authorization } = req.headers;

  const decoded = await verifyAccessJWT(authorization);
  // const decoded = await verifyAccessJWT(authorization.split(" ")[1]);

  
  if (decoded.walletAddress) {
    const user = await getUserByWallet(decoded.walletAddress);
    
    if (!user._id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.userId = user._id;

    return next();
  }

  return res.status(403).json({ message: "Forbidden" });
};

const adminUserAuthorization = async (req, res, next) => {
  const { authorization } = req.headers;
  
  //remove Bearer from string
  const token = authorization.split(" ")[1];
  

  const decoded = await verifyAdminAccessJWT(token || authorization);
  
  if (decoded.email) {
    const user = await getUserByEmail(decoded.email);
    
    if (!user._id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.userId = user._id;

    return next();
  }

  return res.status(403).json({ message: "Forbidden" });
};

module.exports = {
  userAuthorization,
  adminUserAuthorization,
};
