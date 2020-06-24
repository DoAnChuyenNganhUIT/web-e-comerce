var express = require('express');
var passport = require('passport');
var User = require('../models/User');
var jwt = require('jsonwebtoken');
var configs = require('../configs/database');

var router = global.router;


module.exports.signUp=(req, res)=>{
        
        User.getUserByEmail(req.body.email, (err,user)=>{
                if(err) throw err;
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
                if(err) { 
                        throw err
                } else {
                        res.json({
                                success: true,
                                message: 'user dang ki thanh cong'
                        })
                }
                

        })}

})};
module.exports.logIn=(req,res)=>{
        var email = req.body.email;
        var password = req.body.password;
        User.getUserByEmail(email, (err,user)=>{
                if(err) throw err;
                if(!user) {
                        res.json({
                                success: false,
                                message:'tai khoan khong dung'
                        });
                }
                User.comparePassword(password, user.password, (err, isMatch) =>{
                        if(err) throw err;
                        if(isMatch) {
                                var token = jwt.sign(user.toJSON(), configs.secret, {expiresIn: 3600})
                                res.json({
                                        success:true,
                                        message : {
                                                token :token,
                                                user: user
                                        }
                                });
                        }else {
                                res.json({
                                        success: false,
                                        message: 'mat khau khong dung'
                                });
                        }
                })

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

               console.log(decoded)
    
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
            
              const decoded = await verifyToken(req.query.token, configs.secret);
            
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
}
 

module.exports.profile=passport.authenticate('jwt', { session: false }), (req, res)=>{
        res.json({user : user.req})
};
module.exports.logOut=(req,res)=>{
        req.logout();
        res.redirect('/');
};


