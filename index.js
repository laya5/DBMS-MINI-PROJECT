const mysql=require('mysql');
const path=require('path');
const express = require("express");
const bodyParser =require("body-parser");
const connection=require("./connections");
const cookieParser=require("cookie-parser");
const fileUpload =require("express-fileupload");
const app=express();
const pages=require("./routes/authentication");
const personals =require("./routes/allpersonals");
const solditems =require("./routes/solditems");
const categories=require("./routes/categories");
const logout=require("./routes/logout");
const loginType=require("./routes/logintype");
const wishlist =require("./routes/wishlist");
const checkout =require("./routes/checkout");
const placeorder=require("./routes/placeorder");
app.set('view engine','ejs');
const session=require("express-session");
const addingcart=require("./routes/addtocart");
const brief=require("./routes/brief");
const { unwatchFile } = require('fs');
require("dotenv").config();
const publicDirectory= path.join(__dirname,'./public');
app.use(session({
    name:'laya',
    resave:false,
    saveUninitialized:false,
    secret:process.env.SECRET,
    key:'express.sid',
    cookie:{
        maxAge:Number(process.env.SESS_LIFETIME),
        sameSite:true,
        secure:false,

    }
}));
app.use(express.static(publicDirectory));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(fileUpload());
app.use("/",pages);
app.use("/auth/pages",personals);
app.get('/myitems',solditems);
app.use("/cart",addingcart);
app.use("/categories",categories);
app.use("/logout",logout);
app.use("/wishlist",wishlist);
app.use("/brief",brief);
app.use("/placeorder",checkout);

app.listen(3000,function()
{
    console.log("yeah listening");
});