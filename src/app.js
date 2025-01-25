const express = require("express");
const app = express();
// const port =7000;

app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("Something went wrong")
    }
});
app.get("/getUserData", (req, res) => {
    try {
        //Logic of db call anf geta user data
        throw new Error("hjzdzfh")
        res.send("User Data Sent")
    } catch (err) {
        res.status(500).send("Some error contact support team")
    }
});

app.listen(7000, () => {
    console.log("server is successfully listening on port 7000")
});
