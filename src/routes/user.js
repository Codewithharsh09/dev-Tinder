const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth")
const ConnectionRequest = require("../models/connectionRequest")

// Get all the pending connection request for the loggedIn User
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id
        }).populate("fromUserId", ["firstName"
            , "lastName ", "emailId"]);
        res.json({ message: "Data fetched Successfully!", connectionRequest })
    } catch (err) {
        return res.status(400).send("ERROR: ", err.message
        )
    }
});
const USER_SAFE_DATA = "firstName lastName age gender";

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" }
            ],
        }).populate("fromUserId", USER_SAFE_DATA)

        const data = connectionRequest.map(row => row.fromUserId);

        res.json({ data });
    } catch (err) {
        res.status(400).send("ERROR: ", err.message)
    }
})
module.exports = userRouter;