const mongoose = require('mongoose');

//Registeration db schema
const registerSchema = new mongoose.Schema(
        {
            username:{
                type: String,
                trim: true,
                required: [true, "name is required"],
                unique:true,
            },
            email:{
                type: String,
                trim: true,
                unique: true,
                required: [true, "email is required"],
            },
            hash_password: {
                type: String
              },
            mobile:{
                type:Number,
                trim:true,
                required:[true, "mobile number is required"],
            },
        }
);
registerSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
  }; 
module.exports = mongoose.model("Register_details", registerSchema);