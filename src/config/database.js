const mongoose = require("mongoose");

const connectDB = async ()=>{
 await mongoose.connect('mongodb+srv://wardhanh886:Wardhanh886@devtinder.mnk0c.mongodb.net/devTinder');
};
// connectDB()
module.exports = connectDB;
// .then(()=>{
// console.log("Database connection established...")
// }).catch(err=>{
// console.log("Database cannot be connected !!")
// });













