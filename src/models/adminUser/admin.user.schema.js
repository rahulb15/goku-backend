const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {
  hashPassword,
  comparePassword,
} = require("../../helpers/bcrypt.helper");
//jju
const AdminUser= new Schema({
  email: {
    type: String,
    maxlength: 50,
   
  },
  password: {
    type: String,
   
    
  },
  firstName: {
    type: String,
   
    
  },
  lastName: {
    type: String,
   
    
  },
 
 
});


// Create a model based on the AdminUserSchema
const AdminUserSchema = mongoose.model("AdminUser", AdminUser);

// Create an async function to initialize the admin user
async function init() {
  const hpassword = await hashPassword("admin@123");
  const admin = await AdminUserSchema.findOne({ email: "admin@yopmail.com" }); // Use findOne instead of find
  if (!admin) {
    await AdminUserSchema.create({
      email: "admin@yopmail.com",
      password: hpassword,
      firstName: "admin",
      lastName: "admin",
    });
  }
}

// Call the init function to create the admin user if it doesn't exist
init();

module.exports = {
  AdminUserSchema, // Export the AdminUser model
};

