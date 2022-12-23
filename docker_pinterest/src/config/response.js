// 200 , 400 , 500
const successCode = (res, data, message) => {
    res.status(200).json({
        message,
        content: data
    });
}

//400
const failCode = (res, data, message) => {
    res.status(400).json({
        message,
        content: data
    });
}

//404
const notFoundCode = (res, data, message) => {
    res.status(404).send(message);

    // res.status(404).json({
    //     message,
    //     content: data
    // });
}

//500
const errorCode = (res,message) => {
    res.status(500).send(message);
}
module.exports = {
    successCode,
    failCode,
    errorCode,
    notFoundCode
}