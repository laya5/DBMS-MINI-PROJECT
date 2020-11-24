const express=require("express");
const router=express.Router();

 router.get("/",function(req, res){
    req.session.destroy(function(){
        req.session = null;
        res.clearCookie('express.sid', { path: '/' });
        res.redirect('/');

    });
});
module.exports=router;