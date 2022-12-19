const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { successCode, failCode, errorCode } = require("../config/response");


//xử lý chức năng

//signup (tạo user mới)
const bcrypt = require('bcrypt');
const { parseToken } = require('../middlewares/baseToken');

//get danh sách ảnh 
const photoList = async (req,res) => {
    try {
        let photoList = await model.hinh_anh.findAll({

        })

        if (photoList !== null) {
            successCode(res, photoList, "Lấy danh sách ảnh thành công")
        }
        else {
            failCode(res, "", "Danh sách ảnh còn trống");
        }

    }
    catch (err) {
        console.log(err)
        errorCode(res, "Lỗi backend")
    }
}

//get tìm kiếm danh sách ảnh theo tên
const photoName = async (req,res) => {
    try {
        let {ten_hinh} = req.body;
        let photoList = await model.hinh_anh.findOne({
            where:{
                ten_hinh
            }
        })

        if (photoList !== null) {
            successCode(res, photoList, "Lấy danh sách ảnh thành công")
        }
        else {
            failCode(res, "", "Danh sách ảnh còn trống");
        }

    }
    catch (err) {
        console.log(err)
        errorCode(res, "Lỗi backend")
    }
}

module.exports = {
    photoList,
    photoName
}