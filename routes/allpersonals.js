const express=require("express");
const app =express.Router();
const connection=require("../connections");
const bcrypt=require("bcryptjs");
const fileUpload =require("express-fileupload");

app.get("/sell",function(req,res){
    res.render("buy",{message:" "});
});
var items=[];

app.post("/sell",function(req,res){
    
      var post  = req.body;
      var quantity= post.quantity;
      var item_type=post.type_of_item;
      var pass= post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var mob= post.price;
 
	  if (!req.files){
        return res.status(400).send('No files were uploaded.')
      };
		var file = req.files.uploaded_image;
		var img_name=file.name;
	  	 if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                 
              file.mv('public/images/'+file.name, function(err) {
	              if (err){
                  return res.status(500).send(err);
                }

                else{
                   const email=req.session.userId;
                   console.log(email);
                 if(req.session){
                    connection.query('SELECT * From authentication where email=?',[email], async(err,result)=> {
             try{
                   if(!result || !( await bcrypt.compare(pass,result[0].password))){
                      return  res.render("buy",{message:"email or password is incorrect"});
                      }
                   else{
  	                    var sql = "INSERT INTO `users_image`(`first_name`,`last_name`,`price`,`quantity`, `itemtype` ,`email`,`image`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + quantity + "','" + item_type +"','" + email + "','" + img_name + "')";
    					       	    connection.query(sql, function(err, result) {
    							               if(err){ res.send(err);}
                                 else{res.redirect("/myitems");}});
                        }

}catch(err){
    console.log(err);
}
}
 ); }
                  else{
                     res.render("buy",{message:"YOUR EMAIL OR PASSWORD IS INCORRECT "});
                  }
                
              }
            });}
             else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('home',{HOME: message});
          }

        });


module.exports=app;