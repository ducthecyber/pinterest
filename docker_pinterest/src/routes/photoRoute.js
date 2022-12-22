const express = require('express');
const { userInfo, userIdSavePhoto, userIdCreatePhoto, deletePhoto, uploadPhoto } = require('../controllers/photoController');
const { verifyToken } = require('../middlewares/baseToken');
const { upload } = require('../middlewares/upload');
const photoRoute = express.Router();

//lấy thông tin user
photoRoute.get("/user",verifyToken,userInfo);
photoRoute.get("/saved/:nguoi_dung_id",verifyToken,userIdSavePhoto);
photoRoute.get("/created/:nguoi_dung_id",verifyToken,userIdCreatePhoto);
photoRoute.delete("/deleted/:hinh_id",verifyToken,deletePhoto);
photoRoute.post("/uploadPhoto/:nguoi_dung_id",upload.single("dataUpload"),uploadPhoto);

module.exports = photoRoute;