
var router = global.router;
var bcrypt = require('bcryptjs');
var express = require('express');
var passport = require('passport');
var User = require('../mode/User');
var jwt = require('jsonwebtoken');
var configs = require('../configs/database');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


router.post('/change-password', (req, res)=>{

    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(req.body.password, salt, (err,hash)=> {
            //if(err) throw err;
           
       
    User.findOneAndUpdate({email: req.body.email},{password : hash}).exec()
            .then((err, data)=>{
                if(err) throw err;
                res.json({
                    success:true,
                    data: data
                })
            })
        
    })
})
})
module.exports = router;
