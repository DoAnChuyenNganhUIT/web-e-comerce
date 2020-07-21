var express = require('express');
var passport = require('passport');
var User = require('../models/User');
var jwt = require('jsonwebtoken');
var configs = require('../configs/database');

var router = global.router;


module.exports.signUp=(req, res)=>{
        
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
                                password: req.body.password,
                                name:req.body.name
                        });
        User.CreateUser(NewUser,(err, doc)=>{
                if(err){
                                res.json({
                                        result: false,
                                        message: `Err is ${err}`
                                })
                        
                } else {
                        res.json({
                                success: true,
                                message: 'user dang ki thanh cong'
                        })
                }
                

        })}

})};
module.exports.logIn= async (req,res, next)=>{
        var email = req.body.email;
        var password = req.body.password;
         User.getUserByEmail(email, (err,user)=>{
                console.log(user)
                
                if(err) {
                        res.json({
                                result: false,
                                message: `Err is ${err}`
                        })
                
                };
                if(!user) {
                        res.json({
                                success: false,
                                message:'tai khoan khong dung'
                        });
                }
                console.log(password);
                if(user){
                        User.comparePassword(req.body.password, user.password, (err, isMatch) =>{
                                if(err) {
                                        res.json({
                                                success: false,
                                                message: `Err is ${err}`
                                        })
                                
                                };
                                if(isMatch) {
                                        var token = jwt.sign(user.toJSON(), configs.secret)
                                        res.json({
                                                success:true,
                                                message : 'Dang nhap thanh cong',
                                                data: {
                                                        token: token
                                                }
                                        });
                                }else {
                                        res.json({
                                                success: false,
                                                message: 'mat khau khong dung'
                                        });
                                }
                        })
                }
                

        })
};

exports.isAuth = async (req, res, next) => {
        const tokenFromClient = req.body.token || req.query.token || req.headers['x-access-token'];

        const verifyToken = (token, secretKey) => {
                return new Promise((resolve, reject) => {
                    jwt.verify(token, secretKey, (error, decoded) => {
                        if(error) {
                            return reject(error);
                        }
                        resolve(decoded)
                    })
                })
            }

        if (tokenFromClient) {
            try {
                const decoded = await verifyToken(tokenFromClient, configs.secret);
    
                req.jwtDecoded = decoded;

               
    
                // Access next controller
                next();
    
            } catch (error) {
    
                return res.status(401).json({
                    message: 'Unauthorized.'
                })
            }
        } else {
            return res.status(403).send({
                message: 'No token provided'
            })
        }
    }

exports.validate = async (req, res, next) => {
        const verifyToken = (token, secretKey) => {
                return new Promise((resolve, reject) => {
                  jwt.verify(token, secretKey, (error, decoded) => {
                    if (error) {
                      return reject(error);
                    }
                    resolve(decoded);
                  });
                });
              };
        if(req.params.token){
                try {
                        let decoded = await verifyToken(req.params.token, configs.secret);
                        req.jwtDecoded = decoded;
                        if (decoded) {
                                res.json({
                                        success: true,
                                        message: 'ok',
                                        data: decoded,
                                });
                              } else {
                                res.json({
                                  message: 'error',
                                });
                              }
                } catch (error) {
                        res.json({
                                success: false,
                                message: error
                        })
                }
        }
        
        
       
}
 

module.exports.profile=passport.authenticate('jwt', { session: false }), (req, res)=>{
        res.json({user : user.req})
};
module.exports.logOut=(req,res)=>{
        req.logout();
        res.redirect('/');
};


