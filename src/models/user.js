const mongoose = require("mongoose");
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        index: true,
        minLength: 4,
        maxLength: 40
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Address" + value)
            }
        }
    },
    password: {
        type: String,
        // required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a Strong Password", +value)
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "others"],
            message: `{VALUE} is not a valid gender type`
        },
        // validate(value) {
        //     if (!["male", "female", "others"].includes(value)) {
        //         throw new Error("Invalid Gender")
        //     }
        // },
    },
    photoUrl: {
        type: String,
        default: "https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid URL", +value)
            }
        }
    },
    about: {
        type: String,
        default: "This is a default about of the user !"
    },
    skills: {
        type: [String],

    }
}, { timestamps: true });


userSchema.index({ firstName: 1, lastName: 1 });

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "Dev@Tinder$790", { expiresIn: "7d" });
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this
    const passwordHash = user.password

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash)

    return isPasswordValid;
}
module.exports = mongoose.model("User", userSchema);

// const userModel = mongoose.model("User",userSchema);
// module.exports = userModel