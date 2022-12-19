const express = require('express');
const { photoInfo } = require('../controllers/detailController');
const { verifyToken } = require('../middlewares/baseToken');
const detailRoute = express.Router();

//lấy thông tin ảnh
detailRoute.get("/photoInfo/:hinh_id",verifyToken,photoInfo);

module.exports = detailRoute;