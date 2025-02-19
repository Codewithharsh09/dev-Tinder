// const mongoose = require("mongoose");

// const connectDB = async ()=>{
//  await mongoose.connect('mongodb+srv://wardhanh886:Wardhanh886@devtinder.mnk0c.mongodb.net/devTinder');
// };
// // connectDB()
// module.exports = connectDB;
// // .then(()=>{
// // console.log("Database connection established...")
// // }).catch(err=>{
// // console.log("Database cannot be connected !!")
// // });







const mongoose = require("mongoose");
const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://wardhanh886:Wardhanh886@devtinder.mnk0c.mongodb.net/devTinder')
};

// connectDB()
// .then(()=>{
//     console.log("Database successfully connected")
// }).catch(()=>{
//     console.log("Database can not connect !!")
// });

module.exports = connectDB;











