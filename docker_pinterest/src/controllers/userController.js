const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { successCode, failCode, errorCode } = require("../config/response");


//xử lý chức năng

//signup (tạo user mới)
const bcrypt = require('bcrypt');
const { parseToken } = require('../middlewares/baseToken');
const createUser = async (req, res) => {
    try {
        let { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;
        //mã hóa password
        let passwordHash = bcrypt.hashSync(mat_khau, 10);
        let checkEmail = await model.nguoi_dung.findOne({
            where: {
                email
            }
        })
        if (checkEmail) {
            failCode(res, { ho_ten, email }, "Email đã tồn tại");
        }
        else {
            let result = await model.nguoi_dung.create({
                email,
                mat_khau: passwordHash,
                ho_ten,
                tuoi,
                anh_dai_dien
            })
            //cẩn thận lỗi chín tả chữ successCode
            successCode(res, result, "Tạo mới thành công !")
        }
    }
    catch (err) {
        console.log(err)
        errorCode(res, "Lỗi backend")
    }
}

//login 
const login = async (req, res) => {
    try {
        let { email, mat_khau } = req.body;
        let checkLogin = await model.nguoi_dung.findOne({
            where: {
                email
            }
        })

        if (checkLogin) {
            //checkPass đang bị lỗi, không sử dụng được
            // let checkPass= bcrypt.compareSync(mat_khau,checkLogin.mat_khau);
            // console.log(checkLogin.mat_khau)
            // console.log(mat_khau)
            //true=>khớp
            if (checkLogin.mat_khau === mat_khau) {
                // console.log(parseToken(checkLogin));
                return res.status(200).send({
                    message: "Login thành công",
                    statusCode: 200,
                    accessToken: parseToken(checkLogin)
                })
                // successCode(res,parseToken(checkLogin),"Login thành công");
            }
            else {
                failCode(res, "", "Mật khẩu không đúng");
            }
        }
        else {
            failCode(res, "", "Email không đúng");
        }

    }
    catch (err) {
        console.log(err)
        errorCode(res, "Lỗi backend")
    }
}

//edit thong tin user
const updateUser = async (req, res) => {
    try {
        let { nguoi_dung_id } = req.params;
        let { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;
        let checkUser = await model.nguoi_dung.findOne({
            where: {
                nguoi_dung_id
            }
        })
        let passWordHash = bcrypt.hashSync(mat_khau, 10);

        //TRONG 1 REQUEST, KHÔNG ĐỂ RESPONSE TRÙNG NHAU
        //ví dụ để 2 successCode hoặc 2 errorCode là báo lỗi 500
        //postman sẽ trả về param trong đường link
        if (checkUser) {
            await model.nguoi_dung.update({
                email,
                mat_khau:passWordHash,
                ho_ten,
                tuoi,
                anh_dai_dien
            }, {
                where: {
                    nguoi_dung_id
                }
            })
            let editUser= await model.nguoi_dung.findOne({
                where:{nguoi_dung_id}
            })
            successCode(res, editUser, "Update thông tin người dùng thành công");
        }
        else {
            failCode(res, `Mã số người dùng: ${nguoi_dung_id}`, "Người dùng không tồn tại");
        }

    } catch (err) {
        errorCode(res, "Lỗi backend")
    }


}

module.exports = {
    createUser,
    login,
    updateUser
}