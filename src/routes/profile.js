const express = require("express");
const { userAuth } = require("../middleware/auth")
const { validateEditProfileData } = require("../utils/validation");
const user = require("../models/user");
const profileRouter = express.Router();


profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user
        if (!user) {
            throw new Error("User doesnot exist!")
        }
        res.send(user);
    } catch (err) {
        res.status(401).send("ERROR : " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request");
        }
        const loggedInUser = req.user
        Object.keys(req.body).forEach(key => (loggedInUser[key] = req.body[key]))
        await loggedInUser.save();
        res.json({ message: `${loggedInUser.firstName}, your Profile updated Successfully!`, data: loggedInUser, })
    } catch (err) {
        res.status(401).send("ERROR : " + err.message);
    }
});

module.exports = profileRouter;