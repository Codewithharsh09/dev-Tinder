const mongoose = require("mongoose");
const validator = require("validator")
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength:4,
        maxLength:40
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address"+ value)
            }
        }
    },
    password: {
        type: String,
        // required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password",+value)
            }
        }
    },
    age: {
        type :  Number,
        min:18
    },
    gender: {
        type: String,
       validate(value){
        if(!["men","female","others"].includes(value)){
            throw new Error("Invalid Gender")
        }
       },
    },
    photoUrl:{
        type:String,
        default:"https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL",+value)
            }
        }
    },
    about:{
        type:String,
        default:"This is a default about of the user !"
    },
    skills:{
        type:[String],
      
    }
},{timestamps:true});
module.exports = mongoose.model("User", userSchema);

// const userModel = mongoose.model("User",userSchema);
// module.exports = userModel