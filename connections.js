const mysql=require('mysql');
const express = require("express");
 require('dotenv').config();
var mysqlConnection =mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements:true,
    insecureAuth : true
});
mysqlConnection.connect((err)=>{
if(!err){
    console.log("connection established");
}
else{
    console.log(err)
    ;
}
}
);
module.exports=mysqlConnection;

