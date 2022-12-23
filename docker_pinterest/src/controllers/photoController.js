const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { successCode, failCode, errorCode } = require("../config/response");
const e = require('cors');

//QUẢN LÝ ẢNH
//get thông tin user
const userInfo = async (req, res) => {
    try {
        let data = await model.nguoi_dung.findAll({

        })
        successCode(res, data, "Lấy thông tin người dùng thành công");
    }
    catch (err) {
        errorCode(res, "Lỗi backend")
    }
}

//get danh sách ảnh đã lưu theo nguoi_dung_id
const userIdSavePhoto = async (req, res) => {
    try {
        let { nguoi_dung_id } = req.params;

        let data = await model.luu_anh.findAll({
            where: {
                nguoi_dung_id
            }
        })
        let checkId = await model.nguoi_dung.findOne({
            where: {
                nguoi_dung_id
            }
        })
        if (checkId) {
            if (data.length > 0) {
                successCode(res, data, "Lấy danh sách ảnh thành công")
            }
            else {
                failCode(res, data, "Người dùng chưa lưu ảnh")
            }
        }
        else {
            successCode(res, "", "Người dùng không tồn tại")

        }
        console.log(nguoi_dung_id)
    }
    catch (err) {
        errorCode(res, "Lỗi backend")
    }
}

//get danh sách ảnh đã tạo theo nguoi_dung_id
const userIdCreatePhoto = async (req, res) => {
    try {
        let { nguoi_dung_id } = req.params;
        let data = await model.hinh_anh.findAll({
            where: {
                nguoi_dung_id
            }
        })
        let checkId = await model.nguoi_dung.findOne({
            where: {
                nguoi_dung_id
            }
        })
        if (checkId) {
            if (data.length > 0) {
                successCode(res, data, "Lấy danh sách ảnh thành công")
                console.log(nguoi_dung_id)
            } else {
                successCode(res, "", "Người dùng chưa tạo ảnh")

            }
        }else{
            failCode(res,data,"Người dùng không tồn tại")
        }
    }
    catch (err) {
        errorCode(res, "Lỗi backend")
    }
}

//XÓA ẢNH THEO ID ẢNH
const deletePhoto = async (req, res) => {
    try {
        let { hinh_id } = req.params;
        let listPhoto = await model.hinh_anh.findAll({
            where: { hinh_id }
        })
        let commentPhoto = await model.binh_luan.findAll({
            where: { hinh_id }
        })
        let savePhoto = await model.luu_anh.findAll({
            where: { hinh_id }
        })
        if (commentPhoto.length > 0) {
            console.log(commentPhoto, "comment")
            return failCode(res, "", "Không thể xóa ảnh vì đã được comment");
            //nếu không có return sẽ ra lỗi :"Cannot set headers after they are sent to the client"
            //    The route callback will not return when these res functions are called. It will continue running until it hits the end of the function or a return statement. If you want to return when sending a response you can do it like so: return res.send().
            //phải thêm return để nó dừng lại
        }
        if (savePhoto.length > 0) {
            return failCode(res, "", "Không thể xóa ảnh vì đã được lưu bởi người dùng");
        }
        if (listPhoto.length == 0) {
            return failCode(res, "", "Không thể xóa ảnh vì ảnh không tồn tại");
        }
        else {
            await model.hinh_anh.destroy({
                where: {
                    hinh_id: Number(hinh_id)
                }
            })
        }
        successCode(res, listPhoto, "Xóa ảnh thành công")

    }
    catch (err) {
        console.log(err)
        errorCode(res, "Lỗi backend")
    }
}

//Thêm ảnh
const uploadPhoto = async (req, res) => {
    try {
        let { nguoi_dung_id } = req.params;
        let { ten_hinh, mo_ta, tuoi } = req.body;
        let checkUser = await model.nguoi_dung.findOne({
            where: {
                nguoi_dung_id
            }
        })

        if (checkUser) {
            const fs = require('fs');
            //lưu ý, khi upload file vào form-data, mặc dù trong cột VALUE có giá trị nhưng sau khi tắt postman rồi mở lại thì có thể không đọc được
            //phải bấm xóa đi rồi upload lại
            console.log(req.file)
            if (req.file.size >= 400000) {
                fs.unlinkSync(process.cwd() + "/src/public/img/" + req.file.filename);
                res.send("chỉ được phép upload 4Mb");
                return;
            }
            // console.log(req.file.mimetype)
            if (req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/jpg") {
                fs.unlinkSync(process.cwd() + "src/public/img/" + req.file.filename);
                res.send("sai định dạng");
            }
            fs.readFile(process.cwd() + "/src/public/img/" + req.file.filename, (err, data) => {
                // `"data:${req.file.mimetype};base64,${Buffer.from(data).toString("base64")}"`;

                // lưu database
                let dataBase = `data:${req.file.mimetype};base64,${Buffer.from(data).toString("base64")}`;

                // successCode(res, data, "Thêm ảnh thành công")

                //xử lý xóa file
                // setTimeout(() => {
                //     fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);

                // }, 5000);

                // res.send(dataBase);
            })

            let data = await model.hinh_anh.create({
                where: {
                    nguoi_dung_id
                },
                nguoi_dung_id,
                ten_hinh,
                duong_dan: `localhost:8080/src/public/img/${req.file.filename}`,
                mo_ta,
                tuoi
            })
            successCode(res, data, "Thêm ảnh thành công")

        }

        else {
            failCode(res, `Mã số người dùng: ${nguoi_dung_id}`, "Người dùng không tồn tại");
        }

    }

    catch (err) {
        console.log(err)
        errorCode(res, "Lỗi backend")
    }

}


module.exports = {
    userInfo,
    userIdSavePhoto,
    userIdCreatePhoto,
    deletePhoto,
    uploadPhoto
}