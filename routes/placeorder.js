const express=require("express");
const app=express.Router();
const connection=require("../connections");
app.post("/",function(req,res){
var date =new Date();
console.log(req.body);
if(!req.session ){
         return res.redirect("/login");
     }
   connection.query("SELECT id from authentication where email=?",[res.session.userId],function(err,results){
       if(err){
           return res.redirect("/register");
       }
       
   })

})

module.exports=app;