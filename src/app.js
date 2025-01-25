const express = require("express");
const app = express();
// const port =7000;

const {adminAuth,userAuth} = require("./middleware/auth");
//Handle Auth Middleware for all request GET,POST
app.use("/admin",adminAuth);
// app.use("/user",userAuth);

app.post("user/login",(req,res)=>{
    res.send("User logged in succefffully")
});
app.get("/user/data", userAuth,(req, res) => {
    res.send("User Data Sent");
});
app.get("/newUser",userAuth,(req,res)=>{
    res.send({firstName:"Harsh",lastName : "Wardhan"})
});
    app.get("/admin/getAllData", (req, res) => {
        res.send("All Data Sent");
});
app.get("/admin/deleteUser", (req, res) => {
    res.send("Deleted User");
});
app.listen(7000, () => {
    console.log("server is successfully listening on port 7000")
});
