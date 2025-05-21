const express = require("express");
const connectDB = require("./config/database");
const app = express();
// const port =7000;
// const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const user = require("./models/user");
app.use(
    cors({
    origin:"http://localhost:5173",
    credentials:true
})
);
app.use(express.json());
app.use(cookieParser());
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user")

app.use("/",authRouter);
app.use("/",userRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

connectDB()
    .then(() => {
        console.log("Database successfully connected!")
        app.listen(7000, () => {
            console.log("Server successfully connected on Port 7000!")
        })
    }).catch((err) => {
        console.log("Databse cannot be connected!",err.message)
    });
