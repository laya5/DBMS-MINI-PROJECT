const express=require("express");
const app =express.Router();
const connection=require("../connections");
app.get("/:id",function(req,res){
    const id1=req.params.id;
    var ok=true;
    if(req.session.userId===undefined){
        ok=false;
    }
    
    const sql= "select * from users_image where itemtype LIKE '" + id1 +"%';" 
    console.log(sql);
    connection.query(sql,function(err,results){
        if(err){
           return  res.render("main",{ok:ok,HOME:"there is error while loading to continue please login or go back to home page",item:[]});
        }
        else{
            console.log(results);
           return res.render("main",{ok:ok,HOME:'fruit',item:results});
        }
    })
    
});
module.exports=app;