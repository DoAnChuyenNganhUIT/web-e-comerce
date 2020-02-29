var router = global.router;
var User = require('../mode/User');
var mongoose = require("mongoose")
let fs = require('fs');

router.post('/them-user', (req, res)=>{
        
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

router.get('/get_user_id', function(req, res, next) {            
    User.findById(require('mongoose').Types.ObjectId(req.query.id),
    (err,pro)=>{
        if(err){
            res.json({
                result  : "failed",
                data    :[],
                messege :`Err is ${err}`
            });
        }
        else{
            res.json({
                result  :"successful",
                data    :pro,
                messege :"Query Id user success"
            });
        };
    })
  });


module.exports = router;
//router.put('/suaUser')