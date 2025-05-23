const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation")
const User = require("../models/user");
const bcrypt = require("bcrypt");
// const user = require("../models/user");


authRouter.post("/signup", async (req, res) => {
    try {
        //Validation of data 
        validateSignUpData(req)
        //Encrypt the password
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10)
        //creating a new instance of the user model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });
        await user.save();
        res.send("User Added successfully");
    } catch (err) {
        res.status(401).send("ERROR : " + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Invalid Credentials")
        };
        const isPasswordValid = await user.validatePassword(password)
        if (isPasswordValid) {

            // //Create a JWT token
            const token = await user.getJWT()

            //Add the token to cookie and send the response back to the user
            res.cookie("token", token,{httpOnly:true})
            res.send(user);
        } else {
            throw new Error("Invalid Credentials")
        }
    } catch (err) {
        res.status(401).send("ERROR : " + err.message);
    }
});

authRouter.post("/logout",async (req,res)=>{
res.cookie("token",null,{
    expires:new Date(Date.now())
})
res.send("user logged out!");
});

module.exports = authRouter;