const express = require("express");
const connectDB = require("./config/database");
const app = express();
// const port =7000;
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt");
app.use(express.json());
// const {adminAuth,userAuth} = require("../src/middleware/auth")


app.post("/login",async (req,res)=>{
    try{
        const {emailId,password} = req.body;
        const user = await  User.findOne({emailId:emailId})
        if(!user){
            throw new Error("User not found")
        }
        const isUserFind = await bcrypt.compare(password,user.password)
if(isUserFind){
    res.send("Log in successfully")
}else{
    throw new Error("Invalid parameter")
}
    }catch(err){
        res.status(401).send("ERROR : ",err.message)
    }
})
app.post("/signup", async (req, res) => {
    try {
        //Validation of data
        validateSignUpData(req);
        const {firstName,lastName,emailId,password} = req.body
        //Encrypt the password
        const passwordHash =await bcrypt.hash(password,10)
        console.log(passwordHash)
        //creating a new instance of the user model
        const user = new User({
            firstName,lastName,emailId,password:passwordHash
        })
        await user.save();
        res.send("User Added successfully");
    } catch (err) {
        res.status(401).send("ERROR : " + err.message);
    }
});



// //find user / Read
// app.get("/user", async (req, res) => {
//     // const userEmail = req.body.emailId;
//     try {
//         const userFind = await User.find({})
//         res.send(userFind);
//         console.log("USER =", userFind)
//     } catch (err) {
//         res.status(401).send("Something went wrong")
//     }
// })
// //create user
app.post("/addUser", async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send({ message: "Users added successfully!", user });
    } catch (err) {
        res.status(500).json({ error: "Users not added", details: err.message });
    }
})
// //update
app.patch("/user/:userId", async (req, res) => {
    //http://localhost:7000/updateUser/67d7c26b1ad490f0e2e90b4f(hit url on postman)
    // const userId = req.params._id
    const userId = req.params?.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = [
            "userId",
            "skills",
            "photoUrl",
            "about",
            "gender",
            "age",
            "password"
        ]
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k))
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed")
        }
        if(data.skills.length>10){
            throw new Error("Skills cannot be more than 10")
        }
       
        // const userupdate = await User.findByIdAndUpdate({_id : userId},{$set:{data}});
        const userupdate = await User.findByIdAndUpdate({ _id: userId }, data,
            { returnDocument: "after", runValidators: true });
        res.send("User updated Successfully")
        console.log(userupdate)
        console.log(data.skills.length)
    } catch (err) {
        res.send(err.message)
    }
});

// //delete
// app.delete("/deleteUser", async (req, res) => {
//     const userId = req.body?._id
//     try {
//         const deleteUser = await User.findByIdAndDelete({ _id: userId })
//         res.send("User deleted successfully")
//         console.log(deleteUser)
//     } catch (err) {
//         res.status(404).send("user not deleted")
//     }
// })


connectDB()
    .then(() => {
        console.log("Database successfully connected!")
        app.listen(7000, () => {
            console.log("Server successfully connected!")
        })
    }).catch((err) => {
        console.log("Databse cannot be connected!")
    });
