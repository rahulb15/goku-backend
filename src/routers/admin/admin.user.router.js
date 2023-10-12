const express = require("express");
const router = express.Router();
const {
  crateAccessJWT,
  crateAdminAccessJWT,
} = require("../../helpers/jwt.helper");
const {
  hashPassword,
  comparePassword,
} = require("../../helpers/bcrypt.helper");
const {
  createEntityToken,
  getSubDomainUrl,
} = require("../../helpers/entitytoken.helper");
const { EmailerHelper } = require("../../helpers/email.helper");
const { UserSchema } = require("../../models/user/user.schema");
const {
  EntityTokenSchema,
} = require("../../models/entityToken/entity.token.schema");
const { AdminUserSchema } = require("../../models/adminUser/admin.user.schema");
const {
  verifyTokenExpiration,
  removeEntityToken,
} = require("../../models/entityToken/entity.model");
const {
  userAuthorization,
  adminUserAuthorization,
} = require("../../middlewares/authorization.middleware");
const {
  getUserByEmail,
  insertAdminUser,
  getAdminUserById,
} = require("../../models/adminUser/admin.user.model");

router.post("/signUp", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Mongoose Model.findOne()

  try {
    //hash password
    const user = await getUserByEmail(email);
    if (user) {
      return res.json({ status: "error", message: "User Already Exsists" });
    }
    const hashedPass = await hashPassword(password);
    const newUserObj = {
      email,
      password: hashedPass,
      firstName,
      lastName,
    };

    const result = await insertAdminUser(newUserObj);

    res.json({
      status: "success",
      message: "New Admin Crated created",
      result,
    });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
});

router.post("/login", async (req, res) => {
  

  const { email, password } = req.body;
  

  if (!email || !password) {
    return res.json({ status: "error", message: "Invalid form submition!" });
  }

  const user = await getUserByEmail(email);
  
  const passFromDb = user && user._id ? user.password : null;

  if (!passFromDb)
    return res.json({ status: "error", message: "Invalid Email or Password!" });
  
  const result = await comparePassword(password, passFromDb);

  if (!result) {
    return res.json({ status: "error", message: "Invalid email or password!" });
  }

  const accessJWT = await crateAdminAccessJWT(user.email);

  res.json({
    status: "success",
    message: "Login Successfully!",
    accessJWT,
  });
});

router.post("/forgetPassword", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await getUserByEmail(email);
    
    if (user) {
      
      const token = await createEntityToken({
        userId: user._id,
        email: user.email,
      });
      
      const verificationLink = await getSubDomainUrl(
        "reset-password?id=" + token
      );

      
      const htmlContent = `<div><a href=${verificationLink}>Click here</a> to reset your password</div>`;
      await EmailerHelper({ content: htmlContent, receiver: email });
      //   await EmailManager.sendForgotPasswordLink(
      // 	{
      // 	  email: userExist.email,
      // 	  link: verificationLink,
      // 	  name: userExist.firstName
      // 	},
      //   );

      return res.json({
        status: "success",
        message: "Forgot password link sent successfully.",
      });
    } else {
      return res.json({ status: "error", message: "User doesn't exist." });
    }
  } catch (err) {
    
    return res.json({ status: "error", message: err });
  }
});

router.post("/resetPassword", async (req, res) => {
  const { password, confirmPassword, token } = req.body;
  try {
    if (confirmPassword !== password) {
      return res.json({ status: "error", message: "Password doesn't Match" });
    }

    /**
     * fINDING TOKEN***********************************************************************
     */
    

    let tokenInfo = await EntityTokenSchema.findOne({
      token: token,
    });
    
    /***************************************************************************************/
    if (!tokenInfo)
      return res.json({
        status: "error",
        message: "The link to change your password is invalid.",
      });

    let hasExpire = await verifyTokenExpiration(tokenInfo.expiresAt);

    if (hasExpire) {
      const newPassword = await hashPassword(password);
      await AdminUserSchema.updateOne(
        { _id: tokenInfo.userId },
        { $set: { password: newPassword } }
      );
      await removeEntityToken(token);
      
      return res.json({
        status: "success",
        message: "Password changed successfully.",
      });
    } else {
      await removeEntityToken(token);
      return res.json({
        status: "error",
        message: "The link to change your password has been expired.",
      });
    }
  } catch (err) {
    
    return res.json({ status: "error", message: err });
  }
});


// old ,new , confirm password reset password api
router.post("/changePassword", async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  
  
  console.log("confirmPassword", confirmPassword)
  console.log("req.userId",req.query.userId)
  try {
    if (confirmPassword !== newPassword) {
      return res.json({ status: "error", message: "Password doesn't Match" });
    }
    const _id = req.query.userId;
    const user = await getAdminUserById(_id);
    const passFromDb = user && user._id ? user.password : null;
    if (!passFromDb)
      return res.json({ status: "error", message: "Invalid Password!" });
    const result = await comparePassword(oldPassword, passFromDb);
    if (!result) {
      return res.json({ status: "error", message: "Invalid Password!" });
    }
    const hashedPass = await hashPassword(newPassword);
    await AdminUserSchema.updateOne( { _id: _id }, { $set: { password: hashedPass } });
    return res.json({ status: "success", message: "Password changed successfully." });
  } catch (err) {
    
    return res.json({ status: "error", message: err });
  }
});






// Get admin user profile router
router.get("/", adminUserAuthorization, async (req, res) => {
  //this data coming form database

  try {
    const _id = req.userId;

    const userProf = await getAdminUserById(_id);

    res.json({ status: "succes", adminUser: userProf });
  } catch (err) {
    return res.json({ status: "error", message: err });
  }
});

// Send Mail to admin user
router.post("/sendMail", adminUserAuthorization, async (req, res) => {
  
  const { email } = req.body;
  
  const message = "Hello World";
  try {
    const htmlContent = `<div>${message}</div>`;
    await EmailerHelper({ content: htmlContent, receiver: email });
    return res.json({ status: "success", message: "Mail sent successfully." });
  } catch (err) {
    
    return res.json({ status: "error", message: err });
  }
});

module.exports = router;
