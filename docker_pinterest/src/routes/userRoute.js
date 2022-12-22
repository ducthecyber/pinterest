const express = require('express');
const userRoute = express.Router();
const {createUser, login, updateUser} = require("../controllers/userController");
const { verifyToken } = require('../middlewares/baseToken');

//SIGNUP
userRoute.post("/signUp",createUser);
userRoute.get("/login",login);
userRoute.put("/updateUser/:nguoi_dung_id",verifyToken,updateUser)
module.exports = userRoute;