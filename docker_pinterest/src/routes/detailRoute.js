const express = require('express');
const { photoInfo, commentInfo, photoSave, commentPost } = require('../controllers/detailController');
const { verifyToken } = require('../middlewares/baseToken');
const detailRoute = express.Router();

//lấy thông tin ảnh
detailRoute.get("/photoInfo/:hinh_id",verifyToken,photoInfo);
//lấy thông tin comment
detailRoute.get("/commentInfo/:hinh_id",verifyToken,commentInfo);
//kiểm tra ảnh đã lưu hay chưa
detailRoute.get("/photoSave/:hinh_id",verifyToken,photoSave);
//post comment kèm theo thông tin người dùng và hình ảnh
detailRoute.post("/commentPost",verifyToken,commentPost);

module.exports = detailRoute;