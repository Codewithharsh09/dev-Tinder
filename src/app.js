    const express = require("express");
    const app = express();
    // const port =7000;
    app.use("/test",(req,res)=>{
        res.send("Namaste from the server")
    })
    app.use("/test2",(req,res)=>{
        res.send("RAM RAM from the server")
    })
    app.use("/hello",(req,res)=>{
        res.send("HELLO HELLO HELLO")
    }) 
    app.listen(7000,()=>{
        console.log("server is successfully listening on port 3000")
    });
    console.log("NEW CHANGES");
    console.log("1234567890")