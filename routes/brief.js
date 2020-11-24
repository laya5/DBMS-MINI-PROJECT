const express=require("express");
const app=express.Router();
const connection=require("../connections");
app.get("/:id",function(req,res){
    const id2 = req.params.id;
    var ok =true;
    if(req.session.userId===undefined){
        ok=false;
    }
    console.log(id2);
    const sql = "select * from users_image where id = " + id2 + ";";
    connection.query(sql,function(err,results){
        if(err){
            console.log(sql);
            return res.render("main",{ok:ok,HOME:"some thing went wrong",item:[]})
        }
        else{
            console.log(results);
            return res.render("brief",{ok:ok,data:results});
        }
    });
});
module.exports=app;
 