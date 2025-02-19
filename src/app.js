const express = require("express");
const connectDB = require("./config/database");
const app = express();
// const port =7000;
const User = require("./models/user");
app.use(express.json())
//POST API ==========>>>>>>
app.post("/signup",async (req,res)=>{
    // console.log(req.body)
  //Creating a new instance of the user model -->
    const user = new User(req.body);
    try{
        await user.save();
        res.send("User added successfully !!");
    }catch(err){
        // console.log("ERROR",err )
        res.status(400).send(err)
    }
});
// app.post("/newUserr", async (req,res)=>{
//     const user = new User({
//         firstName : "Pradhuman",
//         lastName : "Singh",
//         emailId : "pradh12@gmail.com",
//         age : 24
//     })
//     try{
//         await user.save()
//         res.send("User added Successfully !!")
//     }catch(err){
//         console.log(err)
//     }
// });

// app.patch("/newUserr",async (req,res)=>{
//     const userId = req.body.userId;
//     const data = req.body
//     try{
//         await User.findByIdAndUpdate({_id : userId},data);
//         res.send("user updated successfully !!")
//     }catch(err){
//         console.log("Something went wrong !!")
//     }
// })
//Get User by email--------->>
app.get("/user",async (req,res)=>{
    const userEmail = req.body.emailId;
   try{
    const users = await User.findOne({emailId : userEmail});
    if(users.length === 0){
        res.status(404).send("User not Found")
    }
   res.send(users)
   }catch(err){
    res.status(400).send("Something went wrong")
   }
})

//Feed API - GET/Feed - get all the user from the database ----->>>>
app.get("/feed",async (req,res)=>{
    const userEmail = req.body.emailId;
    try{
     const users = await User.find({});
     if(!users){
         res.status(404).send("User not Found")
     }
    res.send(users)
    }catch(err){
     res.status(400).send("Something went wrong")
    }    

});

//Delete API-------->>>>>>
app.delete("/user",async (req,res)=>{
    const userId = req.body.userId;
    try{
        const users = await User.findByIdAndDelete(userId);
        // const users = await User.findByIdAndDelete({_id : userId});
        if(!users){
            res.status(404).send("User not Found")
        }
       res.send("User deleted successfully !")
       }catch(err){
        res.status(400).send("Something went wrong")
       }    
   
});

//Update data to the user ---------->>>>>>>

app.patch("/user", async(req,res)=>{
const userId = req.body.userId;
const data = req.body;
try{
const user = await User.findByIdAndUpdate({_id : userId},data,{
    returnDocument:"after",
    runValidators:true,
})
console.log(user)
res.send("User updated successfully !!")
}catch(err){
    res.status(404).send("UPDATE FAILED :" +err)
}
})


// app.delete("/newUser", async (req,res)=>{
//     const userEmail = req.body.emailId
//     try{
//         await User.deleteOne({emailId : userEmail});
//         res.send("User deleted Successfully !!")
//     }catch(err){
//         res.status(404).send(err)
//     }
// });


connectDB()
.then(()=>{
    console.log("Databse connected successfully");
    app.listen(7000, () => {
        console.log("server is successfully listening on port 7000");
    });
}).catch(()=>{
    console.log("Database cannot connected")
});




