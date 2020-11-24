const express=require("express");
const app =express.Router();
const connection=require("../connections");
/* get REQUEST FOR WISHLIST ITEMS */
app.get("/",function(req,res){
    const user = req.session.userId;
     var ok=true;
    if(!req.session){
        var ok=false;
        console.log("you need to login first");
        return res.redirect("/login");
    }
              var sql1= "select DISTINCT users_image.id,users_image.first_name,users_image.price,users_image.last_name,users_image.image,users_image.ISWISHLISTED,users_image.quantity from users_image inner join wishlist on users_image.id = wishlist.wishlist_number WHERE wishlist.email='"+ user +"';";
    connection.query(sql1,function(err,results){
        if(err){
            console.log(err);
            console.log(user);
            res.render("main",{ok:ok,HOME:"sorry couldn't continue please got back to home",item:[]});
        }
        else{
            if(results.length ===0){
                res.render("main",{ok:ok,HOME:"YOUR WISHLIST IS EMPTY ADD SOME ITEMS",item:[]});
            }
            else{
                res.render("wishlist",{message:" ",items:results})
            }

        }
    })
});

app.get("/remove/:id",function(req,res){
    var ok =false;
      const id1 = req.params.id;
    if(!req.session.userId){
       return   res.render("login",{message:" You need to login first!!"});
    }
  
    else{
        var item=[];
        connection.query("SELECT * from users_image",function(err,results){
            if(err){
                item=0;
            }
            else{
                console.log(results);
                item=results;
            }
        });
        ok=true;
        var sql="DELETE from wishlist WHERE wishlist_number="+ "'"+ id1 +"' AND email= "+"'" + req.session.userId +"';"
       connection.query(sql,function(err,result){
        if(err){
            console.log(err);
            return res.render("main",{ok:ok,HOME:"THERE IS A PROBLEM IN DELETING ITEM FROM WISHLIST PLEASE TRY AGAIN LATER!",item:item})
        }
        else{
            return res.redirect("/wishlist");
        }
       })
    }
    }
    );

    app.get("/add/:id",function(req,res){
        var ok =false;
      const id1 = req.params.id;
    if(!req.session.userId){
       return   res.render("login",{message:" You need to login first!!"});
    }
    else{
          var item=[];
        connection.query("SELECT * from users_image",function(err,results){
            if(err){
                item=0;
            }
            else{
                console.log(results);
                item=results;
            }
        });
        ok=true;
          connection.query("SELECT * from users_image  WHERE id=?",[id1],function(err,result){
        if(err){
            return res.render("main",{ok:ok,HOME:"THERE IS A PROBLEM IN ADDING ITEM TO WISHLIST PLEASE TRY AGAIN LATER!",item:item})
        }
        else{
            var sql = "INSERT INTO `wishlist`(`FRUIT_NAME`,`email`,`price`,`Last_name`,`wishlist_number`) VALUES ('" + result[0].first_name + "','" + req.session.userId + "','" + result[0].price + "','" + result[0].last_name + "','" + id1 + "')";
            
            connection.query(sql,function(err,result){
                if(err){
                    return res.render("main",{ok:ok,HOME:"ERROR OCCURED WHILE ADDING",item:item})
                }
                else{
                     return res.render("main",{ok:ok,HOME:"ITEM SUCCESSFULLY ADDED TO WISHLIST",item:item})
                       }
                   })
                }
            })
           
        }
       })
module.exports=app
