//jwt.io
const jwt = require('jsonwebtoken');
// console.log(checkMatMa)
// console.log(matma)

//hàm tạo token
const parseToken = (data) => {
    let token = jwt.sign({ data }, "bimat", { algorithm: 'HS256', expiresIn: "10y" }); // HS256
    return token;
}

module.exports ={
    parseToken
}