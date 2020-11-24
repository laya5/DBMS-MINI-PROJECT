const express=require("express");
const app=express.Router();
const connection=require("../connections");
app.post("/",function(req,res){
     if(!req.session ){
         return res.redirect("/login");
     }
     const {First_name,Last_name,address,city,State,ZIp}=req.body;
     console.log(ZIp+"this is the zip code");
     const user=req.session.userId;
     const sql="select * from addedtocart where email='"+ user +"';";
     var sql1 ="select id from authentication where email='"+ user+"' ;"
     connection.query(sql1,function(err,result){
        if (err){
            console.log(err);
            return res.redirect("/");

        }
       connection.query(sql,function(err,results){
           if(err){
               return res.redirect("/");
           }
           var g=0;
           var date = new Date();
           var DATE = date.getFullYear()+":"+date.getMonth()+":"+date.getDate();
           var TIME =date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
           results.forEach(function(data){
               g=g+1;
                 var sql2 = "INSERT INTO `Orders`(`authentication_id`,`cart_number`,`price`,`name`,`ADDRESS`,`CITY`,`STATE`,`ZIP`,`DATE`,`TIME`) VALUES ('" + result[0].id + "','" + data.id + "','" + data.quantity_needed*data.price + "','" + First_name +" "+ Last_name + "','" + address + "','" + city + "','" + State + "','" + ZIp  + "','" + DATE + "','" + TIME + "')";
               connection.query(sql2,function(err,result2){
                   if(err){
                       console.log(err);
                       return  res.render("error",{ok:true,message:"this order is already placed if you want to place this order again delete it from the cart and add again"});
                   }
                   else {
                   var sql3 = "UPDATE addedtocart inner join Orders on addedtocart.id = Orders.cart_number SET addedtocart.Order_no = orders.id where addedtocart.id='" + data.id +"';";
                   connection.query(sql3,function(err,results3){
                       if(err){
                           console.log(err);
                       }
                       else{
                           console.log("problem is here");
                           console.log(g +","+results.length);
                            if(g === results.length ){
                    res.render("error",{ok:true,message:" YOUR ORDER IS SUCCESFULLY PLACED HEAD BACK TO HOME PAGE TO SHOP MORE"});
                }
                       }
                   });
                }});
               
           })
       })
     });
})
module.exports=app;