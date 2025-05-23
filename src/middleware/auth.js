const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userAuth = async (req, res, next) => {
   try {
      const { token } = req.cookies;
      if (!token) {
         throw new Error("Token is not valid")
      }

      const decodedObj = await jwt.verify(token, "Dev@Tinder$790");
      // Find the User
      const { _id } = decodedObj ;
      const user = await User.findById(_id) ;
      if (!user) {
         throw new Error("User not found")
      }
      req.user = user
      next()
   } catch (err) {
      res.status(404).send("User not found")
   }
};

module.exports = {
   userAuth,
};