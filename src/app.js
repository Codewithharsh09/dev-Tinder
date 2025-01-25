    const express = require("express");
    const app = express();
    // const port =7000;
    
    app.get("/user/:userId/:password/:key",
    (req,res,next)=>{
        console.log("Handling the route user !!")
        res.send(req.params)
        console.log(req.params)
        next()
    },
    (req,res,next)=>{
        console.log("Handling the route user 2!!")
        // res.send("2nd Response !!");
        next()
    },
    (req,res,next)=>{
        console.log("Handling the route user 3!!")
        // res.send("3rd Response !!");
        next();

    },
    (req,res,next)=>{
        console.log("Handling the route user 4!!")
        // res.send("4th Response !!")
        next();
    });

    app.listen(7000,()=>{
        console.log("server is successfully listening on port 7000")
    });
