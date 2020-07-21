global.router = require('express').Router();

var router = global.router
var User = require('../models/User');

var mongoose = require("mongoose");
const { use } = require('passport');



module.exports.insertUser=(req, res)=>{
        
        User.getUserByEmail(req.body.email, (err,user)=>{
                if(err) {
                        res.json({
                                result: false,
                                message: `Err is ${err}`
                        })
                };
                if(user) {
                        res.json({
                                success: false,
                                message:'tai khoan da ton tai'
                        });
                }
                else if(!user){
                        var NewUser = new User({
                                email: req.body.email,
                                name: req.body.name,
                                password: req.body.password
                        });
        User.CreateUser(NewUser,(err, doc)=>{
                if(err) { 
                        res.json({
                                result: false,
                                message: `Err is ${err}`
                })
                
                } else {
                        res.json({
                                success: true,
                                message: 'user them thanh cong'
                        })
                }
                

        })}

})};

module.exports.getUserId=function(req, res, next) {            
    User.findById(require('mongoose').Types.ObjectId(req.params.id),
    (err,pro)=>{
        if(err){
            res.json({
                result  : "failed",
                data    :[],
                message :`Err is ${err}`
            });
        }
        else{
            res.json({
                result  :"successful",
                data    :pro,
                message :"Query Id user success"
            });
        };
    })
  };

exports.getListUser = (req, res, next) => {
        User.find({}).select({
                name: 1,
                email: 1,
                image_name: 1,
                role: 1
        }).exec((err,user) =>{
                if(err){
                        res.json({
                                result: false,
                                data: [],
                                message: 'err'
                        });
                }
                else {
                        res.json({
                                result: true,
                                count: user.length,
                                data: user,
                                message: 'query list user success'
                        })
                }
        })
}

  module.exports.updateUser=function(req,res,next){
        let conditions = {};
        if(mongoose.Types.ObjectId.isValid(req.params.id)==true){  //xac thuc thuoc tinh cua Oj
                conditions._id = mongoose.Types.ObjectId(req.params.id);
                
        }
        else{
                res.json({
                        result: 'failed',
                        data : {},
                        message: 'id khong dung'
                })
                
        };
        const options = {
                new: true,   // tra ve du lieu da chuyen doi thay vi ban goc
                multi: true
            };
        
        let gtUdt = {};
        // User.getUserByEmail(req.body.email, (err,user)=>{
        //         if(err) throw err;
        //         if(user) {
        //                 var NewUser = new User({
        //                         email: req.body.email,
        //                         password: req.body.password
        //                 });
        //                 res.json({
        //                         message:'hey'
        //                 });
        if(req.body.password){
                var NewUser= new User({
                        password: req.body.password
                });
                gtUdt.password=NewUser.password;
        }
        
       
        // User.CreateUser(NewUser,(err, doc)=>{
        //         if(err) { throw err
                
        //         } else {
        //                 console.log('doc');
                        
                        
        //         };
                

        // });
        
        
        gtUdt.name = req.body.name;

        
        User.findOneAndUpdate(conditions,{$set: gtUdt},options,(err, dataUpdate)=>{
                if (err) {
                        res.json({
                            result: "failed",
                            data: {},
                            messege: `Can not update .Error is : ${err}`
                        });
                    } else if(req.body.password){
                        User.CreateUser(dataUpdate,(err, doc)=>{
                                if(err) { throw err
                                
                                } else {
                                        res.json({
                                                result: "ok",
                                                data: doc,
                                                messege: "Update successfully"
                                            });
                                        
                                };
                                
                
                        });
                       
                    } else {
                        res.json({
                                result: "ok",
                                data: dataUpdate,
                                messege: "Update successfully"
                            });
                    }
        })
};


module.exports.deleteUser=function(req, res, next){
        User.findOneAndDelete({_id: mongoose.Types.ObjectId(req.params.id)},(err,user)=>{
                if(err){
                        res.json({
                            result: "failed",
                            messege:`khong the xoa . loi ${err}`
                        });
                        return;
                    }
                    if(!user){
                        res.json({
                            result: "failed",
                            messege:"User khong ton tai"
                        })
                    }
                    else {
                        res.json({
                            result: "ok",
                            messege:"xoa thanh cong"
                        })
                    }
        })
};
