const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { successCode, failCode, errorCode, notFoundCode } = require("../config/response");


//xử lý chức năng

//signup (tạo user mới)
const bcrypt = require('bcrypt');
const { parseToken } = require('../middlewares/baseToken');
const luu_anh = require('../models/luu_anh');

//get thông tin ảnh và người tạo ảnh theo id_anh
const photoInfo = async (req, res) => {
    try {
        let { hinh_id } = req.params;
        // console.log(hinh_id)
        let photoInfo = await model.hinh_anh.findOne({
            where: {
                hinh_id
            },
            include:
                "nguoi_dung"
        })

        if (photoInfo !== null) {
            successCode(res, photoInfo, "Lấy thông tin ảnh thành công")
        }
        else {
            failCode(res, "", "Hình ảnh chưa được tạo");
        }

    }
    catch (err) {
        // console.log(err)
        errorCode(res, "Lỗi backend")
    }
}

//get thông tin bình luận theo id_anh
const commentInfo = async (req, res) => {
    try {
        let { hinh_id } = req.params;
        // console.log(hinh_id)
        let commentInfo = await model.binh_luan.findAll({
            where: {
                hinh_id
            },
            include:
                "hinh"
        })
        let checkId = await model.hinh_anh.findOne({
            where: {
                hinh_id
            }
        })
        console.log("checkId", checkId)
        if (checkId) {
            if (commentInfo.length > 0) {
                successCode(res, commentInfo, "Lấy thông tin comment thành công")
            }
            else {
                failCode(res, `Mã hình ${hinh_id} `, "Chưa có lượt bình luận ảnh này. Bạn hãy là người đầu tiên");
            }
        }
        else {
            notFoundCode(res, "", "Mã ảnh không tồn tại")
        }

    }
    catch (err) {
        // console.log(err)
        errorCode(res, "Lỗi backend")
    }
}

//get thông tin ảnh đã lưu hay chưa
const photoSave = async (req, res) => {
    try {
        let { hinh_id } = req.params;
        let photoSave = await model.luu_anh.findAll({
            where: {
                hinh_id
            },

        })
        let checkId = await model.hinh_anh.findOne({
            where: {
                hinh_id
            }
        })
        if (checkId) {
            if (photoSave.length !== 0) {
                successCode(res, photoSave, `Ảnh đã lưu bởi ${photoSave.length} người dùng`)
            }
            else {
                failCode(res, "", "Người dùng chưa lưu hình này. Còn chờ gì mà không lưu vào bộ sưu tập của mình!");
            }

        }
        else {
            failCode(res, "", "Hình ảnh không tồn tại");
        }

    }
    catch (err) {
        // console.log(err)
        errorCode(res, "Lỗi backend")
    }
}

//lưu thông tin bình luận mới
const commentPost = async (req, res) => {
    try {
        let { nguoi_dung_id, hinh_id, ngay_binh_luan } = req.body;

        let data = await model.binh_luan.create({
            nguoi_dung_id,
            hinh_id,
            ngay_binh_luan
        });
        successCode(res, data, "Bình luận thành công");

    }
    catch (err) {
        let { nguoi_dung_id, hinh_id, ngay_binh_luan } = req.body;
        let checkNguoiDung = await model.nguoi_dung.findAll({
            where: {
                nguoi_dung_id
            }
        })
        let checkHinh = await model.hinh_anh.findAll({
            where: {
                hinh_id
            }
        })
        if (checkNguoiDung == '' || checkHinh == '' || checkNguoiDung == '' && checkHinh == '') {
            errorCode(res, "Thông tin người dùng hoặc hình ảnh không có sẵn")
        }
        else {
            errorCode(res, "Lỗi backend")
        }
    }
}
module.exports = {
    photoInfo,
    commentInfo,
    photoSave,
    commentPost
}