const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { successCode, failCode, errorCode } = require("../config/response");


//xử lý chức năng

//signup (tạo user mới)
const bcrypt = require('bcrypt');
const { parseToken } = require('../middlewares/baseToken');

//get thông tin ảnh và người tạo ảnh theo id_anh
const photoInfo = async (req, res) => {
    try {
        let { hinh_id } = req.params;
        console.log(hinh_id)
        let photoInfo = await model.hinh_anh.findOne({
            where: {
                hinh_id 
            },
            include:
                "nguoi_dung_id_nguoi_dungs"
        })

        if (photoInfo !== null) {
            successCode(res, photoInfo, "Lấy thông tin ảnh thành công")
        }
        else {
            failCode(res, "", "Chưa có người dùng sử dụng ảnh này");
        }

    }
    catch (err) {
        console.log(err)
        errorCode(res, "Lỗi backend")
    }
}



module.exports = {
    photoInfo
}