var express = require('express');
var passport = require('passport');
var User = require('../mode/User');
var jwt = require('jsonwebtoken');
var configs = require('../configs/database');

var router = global.router;

router.post('/', (req, res)=>{
        res.json('hiiiiiii')
});
router.post('/signup', (req, res)=>{
        
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
                                password: req.body.password
                        });
        User.CreateUser(NewUser,(err, doc)=>{
                if(err) { throw err
                        // res.json({
                        //         success: false,
                        //         message: 'user dang ki khong thanh cong'
                        // });
                } else {
                        res.json({
                                success: true,
                                message: 'user dang ki thanh cong'
                        })
                }
                

        })}

})});
router.post('/login',(req,res)=>{
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
                                                token :'JWT ' + token,
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
})

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res)=>{
        res.json({user : user.req})
});
router.get('/logout',(req,res)=>{
        req.logout();
        res.redirect('/');
})
router.post('/them', (req,res)=>{
        var NewUser = new User({
                email: req.body.email,
                password: req.body.password
        });
        NewUser.save((err, doc)=>{
                if(err) throw err;
                res.json({
                        success: true,
                        data: doc
                })
        })
});

module.exports = router;