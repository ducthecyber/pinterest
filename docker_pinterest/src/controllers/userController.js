const sequelize= require ('../models/index');
const init_models = require ('../models/init-models');
const model = init_models(sequelize);
const {successCode, failCode, errorCode} = require("../config/response");


//xử lý chức năng

//signup (tạo user mới)
const bcrypt = require ('bcrypt');
const { parseToken } = require('../middlewares/baseToken');
const createUser = async (req,res)=>{
    try{
        let {email, mat_khau, ho_ten, tuoi,anh_dai_dien} = req.body;
        //mã hóa password
        let passwordHash = bcrypt.hashSync(mat_khau,10);
        let checkEmail = await model.nguoi_dung.findOne({
            where :{
                email
            }
        })
        if (checkEmail){
            failCode(res, {ho_ten, email}, "Email đã tồn tại");
        }
        else{
            let result = await model.nguoi_dung.create({
                email,
                mat_khau:passwordHash,
                ho_ten,
                tuoi,
                anh_dai_dien
            })
            //cẩn thận lỗi chín tả chữ successCode
            successCode(res, result, "Tạo mới thành công !")
        }
    }
    catch(err){
        console.log(err)
        errorCode(res,"Lỗi backend")
    }
}

//login 
const login = async (req,res)=>{
    try{
        let {email,mat_khau}= req.body;
        let checkLogin = await model.nguoi_dung.findOne({
            where:{
                email
            }
        })
        
        if(checkLogin){
            //checkPass đang bị lỗi, không sử dụng được
            // let checkPass= bcrypt.compareSync(mat_khau,checkLogin.mat_khau);
            // console.log(checkLogin.mat_khau)
            // console.log(mat_khau)
            //true=>khớp
            if(checkLogin.mat_khau === mat_khau){
                // console.log(parseToken(checkLogin));
                successCode(res,parseToken(checkLogin),"Login thành công");
            }
            else{
                failCode(res,"","Mật khẩu không đúng");
            }
        }
        else{
            failCode(res,"","Email không đúng");
        }
        
    }
    catch(err){
        console.log(err)
        errorCode(res, "Lỗi backend")
    }
}
module.exports ={
    createUser,
    login
}