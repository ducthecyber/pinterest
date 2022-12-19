const express = require('express');
const homeRoute = express.Router();
const {photoList, photoName} = require("../controllers/homeController");

//lấy danh sách ảnh
homeRoute.get("/photoList",photoList);
homeRoute.get("/photoName",photoName);

module.exports = homeRoute;