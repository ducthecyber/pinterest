const express = require ("express");
const rootRoute = express.Router();
const userRoute = require("./userRoute");
const homeRoute = require("./homeRoute");
const detailRoute = require("./detailRoute");
const photoRoute = require("./photoRoute") ;

rootRoute.use("/user",userRoute);
rootRoute.use("/home",homeRoute);
rootRoute.use("/detail",detailRoute);
rootRoute.use("/photo",photoRoute);
module.exports = rootRoute;

//localhost:8080/api/user/signup