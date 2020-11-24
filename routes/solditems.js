const connection =require("../connections");
profile = function(req, res){
	var message = '';
	console.log(req.session.userId);
	connection.query(" SELECT * FROM users_image WHERE email=?",[req.session.userId], function(err, result){
	  if(result.length <= 0 || err)
	  message = "Profile not found!";
	  console.log(result);
	  console.log("here is your result");
      res.render('solditems',{ item: result});
   })

};
module.exports =profile;