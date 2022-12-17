const express = require("express");
const app = express ();
//middlewares chuyển đổi data json từ FE xuống express
app.use(express.json());

const cors= require("cors");
app.use(cors());
//tạo domain
app.listen(8080)

//yarn add mysql2
//kết nối CSDL
// const mysql = require("mysql2");
// const conn = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"1234",
//     database:"db_pinterest",
//     port:3306
// })

const rootRoute = require ("./routes");
app.use("/api",rootRoute);



//CÁCH FIX LỖI
// Node / Express: EADDRINUSE, Address already in use - Kill server
// https://stackoverflow.com/questions/4075287/node-express-eaddrinuse-address-already-in-use-kill-server
// search => write cmd => open node.js command prompt
//taskkill /f /im node.exe