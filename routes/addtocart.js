const express=require("express");
const mysqlConnection = require("../connections");
const app =express.Router();
const connection=require("../connections");

/* get REQUEST FOR CART ITEMS */
app.get("/",function(req,res){
     const user = req.session.userId;
     if(!req.session ){
         return res.redirect("/login");
     }
    
    connection.query("select * from addedtocart where email = ?",[user],function(err,results){
        if(err){
            console.log(err);
            res.render("cartbag",{message:"there is some error in login session or email please login again to continue",items:[]})
        }
        else{
             var sql1= "select DISTINCT users_image.id,users_image.first_name,users_image.price,users_image.last_name,users_image.image,users_image.ISWISHLISTED,addedtocart.quantity_needed from users_image inner join addedtocart on users_image.id = addedtocart.cart_number where addedtocart.email= '"+ user +"';";
     connection.query(sql1,function(err,result){
         if(err){
             console.log(err);
         }
         else{
         console.log(result);
         res.render("cartbag",{message:" ",items:result});
         }
     })
   }
        })
});
app.post("/add/:id",function(req,res){
    var ok =false;
      const id1 = req.params.id;
      const session=req.session.userId;
      var item=[];
          if(session === undefined){
       return  res.render("login",{message:" You need to login first!!"});
              }
          else{
        ok=true;
        const quantity_required =req.body.quantity;
           connection.query("select * from users_image",function(err,resul){
          if(err){
            res.render("main",{ok:ok,HOME:"SORRY ERROR WHILE LOADING",item:[]})
          }
          else{
             connection.query("select * from users_image WHERE id =?",[id1],function(err,result){
          if(err){
            res.render("main",{ok:ok,HOME:"SORRY ERROR WHILE LOADING",item:[]})
          }
          else{
            var sql = "INSERT INTO `addedtocart`(`NAME`,`email`,`price`,`quantity_needed`, `cart_number`) VALUES ('" + result[0].first_name + "','" + req.session.userId + "','" + result[0].price + "','" + quantity_required + "','" + id1 + "')";
             connection.query(sql,function(err,results){

                  if(err){
                      return res.render("main",{ok:ok,HOME:"ITEM NOT ADDED TO CART",item:resul});
                  }
            else{
              
                    res.redirect("/cart");
              } }); 
          }
        })
          }
        
      });
       
    }});

app.get("/remove/:id",function(req,res){
  var ok =false;
      const id1 = req.params.id;
      const session=req.session.userId;
      var item=[];
          if(session === undefined){
       return  res.render("login",{message:" You need to login first!!"});
          }
          var sql ="delete from addedtocart where cart_number='"+ id1 +"' AND email='"+session+"';"
          connection.query(sql,function(err,results){
            if(err){
              return res.render("main",{ok:ok,HOME:" ERROR WHILE DELETING CLICK ON HOME TO HEAD BACK",item:[]});
            }
            else{
              console.log("here are my results "+ results[0]);
            res.redirect("/cart");
            }
          })

          
})

module.exports= app;