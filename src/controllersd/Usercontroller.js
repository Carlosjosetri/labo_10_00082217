const mongoose=require('mongoose');
const User = require('../models/user');
const Authcontroller={};
const bcrypt = require('bcrypt');


Authcontroller.index= function(req,res,next){

    res.render('index');
}

Authcontroller.login=function(req,res,next){

    res.render('singnin')
}
Authcontroller.create=function(req,res,next){

    res.render('singnup')
}

Authcontroller.store=function(req,res,next){

    let user ={
        email: req.body.email,
        password:req.body.password

    }
  await User.create(user,(error,User)=>{
      if(error)
      {
          return res.render('signup',{err:error, email:user.email});
      }
      else
      {
          let data ={
              userId: user._id.toString(),
              email: user.email,
              password: user.password 
          }
     bcrypt.hash(data.userId,10,function(err,has){
          if(err){
              next(err);
          }
           data.userId=hash;
           req.session.user=JSON.stringify(data);
           return res.redirect('/users/profile')

     })    



      }
  })

}


Authcontroller.profile = function(req,res)
{
    res.render('profile');
}

Authcontroller.signin=function(req,res,nest){
    var data ={};
    User.authenticate(req.body.email,req.body.password,(err,user)=>{
        if (err || !user ){
            res.render('signin',{err: error ,email:req.body.email})
        }
        else{
            data.userId=user._id.toString();
            data.email=user.email;
            data.password=user.password;
            bcrypt.hash(data.userId,10,function(err,hash){
                if(err){
                    next(err);
                }
                data.userId=hash;
                req.session.user=JSON.stringify(data);
                return res.redirect('/users/profile')
            })
        }
    } )
}