var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var configs = require('../configs/database');
var bcrypt = require('bcryptjs');

var userSchema = new Schema({
    
    email :{
        type    : String,
        unique  : true,
        required: true
    },
   
    password :{
        type    : String,
        required: true
    },
    
    name : {
        type    : String,
    },
    role :{
        type: [{
            type: String,
            enum : ["admin","khachhang"],
        }],
        default: ["khachhang"],
    }
},{collection : "User"});

var User = module.exports = mongoose.model("User",userSchema);

module.exports.getUserById = (id,cb) => {
    User.findById(id, cb)
};

module.exports.getUserByEmail = (email,cb) => {
    User.findOne({email: email}, cb)
};

module.exports.CreateUser = (newUser, cb) => {
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(newUser.password, salt, (err,hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(cb);
        })
    })
};

module.exports.comparePassword = (Mypassword,hash ,cb) => {
    bcrypt.compare(Mypassword, hash, (err, isMatch) => {
        if(err) throw err;
        cb(null, isMatch);
    })
}