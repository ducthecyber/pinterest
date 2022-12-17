const express = require('express');
const userRoute = express.Router();
const {createUser, login} = require("../controllers/userController");

//SIGNUP
userRoute.post("/signUp",createUser);
userRoute.get("/login",login);
module.exports = userRoute;