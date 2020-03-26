
var router = global.router;
var bcrypt = require('bcryptjs');
var express = require('express');
var passport = require('passport');
var User = require('../models/User');
var jwt = require('jsonwebtoken');
var configs = require('../configs/database');
let fs = require('fs');
var mongoose = require("mongoose")
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports.changePassword= function(req,res,next){
    let conditions = {};
    if(mongoose.Types.ObjectId.isValid(req.body.id)==true){  //xac thuc thuoc tinh cua Oj
            conditions._id = mongoose.Types.ObjectId(req.body.id);
            
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
    var NewUser= new User({
            password: req.body.password
    });
    // User.CreateUser(NewUser,(err, doc)=>{
    //         if(err) { throw err
            
    //         } else {
    //                 console.log('doc');
                    
                    
    //         };
            

    // });
    
    gtUdt.password=NewUser.password;
    

    
    User.findOneAndUpdate(conditions,{$set: gtUdt},options,(err, dataUpdate)=>{
            if (err) {
                    res.json({
                        result: "failed",
                        data: {},
                        messege: `Can not update .Error is : ${err}`
                    });
                } else {
                    User.CreateUser(dataUpdate,(err, doc)=>{
                            if(err) { throw err
                            
                            } else {
                                    console.log('doc');
                                    res.json({
                                            result: "ok",
                                            data: doc,
                                            messege: "Update successfully"
                                        });
                                    
                            };
                            
            
                    });
                   
                }
    })
};

module.exports.uploadImageProfile=(req, res, next) => {
    let formidable = require('formidable');
    // parse a file upload
    var form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024; //10 MB
    form.multiples = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({
                result: "failed",
                data: {},
                messege: `Cannot upload images.Error is : ${err}`
            });
        }
        
        var arrayOfFiles = [];
        if(files[""] instanceof Array) {
            arrayOfFiles = files[""];
        } else {
            arrayOfFiles.push(files[""]);
        }
        
        if (arrayOfFiles.length > 0) {
            var fileNames = [];
            arrayOfFiles.forEach((eachFile)=> {
                // fileNames.push(eachFile.path)
                fileNames.push(eachFile.path.split('\\')[1]);
            });
            res.json({
                result: "ok",
                data: fileNames,
                numberOfImages: fileNames.length,
                messege: "Upload images successfully"
            });
        } else {
            res.json({
                result: "failed",
                data: {},
                numberOfImages: 0,
                messege: "No images to upload !"
            });
        }
    });
};

module.exports.openImageProfile=(req, res, next) => {
    let imageName = "uploads/" + req.query.image_name;
    fs.readFile(imageName, (err, imageData) => {
        if (err) {
            res.json({
                result: "failed",
                messege: `Cannot read image.Error is : ${err}`
            });
            return;
        }
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(imageData); // Send the file data to the browser.
    });
};

module.exports.changePrictureProfile = function(req,res,next){
    let conditions = {}; // la 1 object
    if(mongoose.Types.ObjectId.isValid(req.body.id)==true){  //xac thuc thuoc tinh cua Oj
        conditions._id = mongoose.Types.ObjectId(req.body.id);
    } else res.json({
        result: "failed",
        data: {},
        messege: "Id khong dung"
    });

    let gtUdt = {};
    

    const options = {
        new: true,   // tra ve du lieu da chuyen doi thay vi ban goc
        multi: true
    };

    //update anh
    if (req.body.image_name && req.body.image_name.length > 0) {
        //Ex: http://localhost:3000/open_image?image_name=ten
        const serverName = require("os").hostname();
        const serverPort = require("../app").settings.port;
        gtUdt.image_name = `${serverName}:${serverPort}/open_image?image_name=${req.body.image_name}`
    }

    //gan category cho san pham
    if (mongoose.Types.ObjectId.isValid(req.body.category_id) == true) {
        gtUdt.categoryId = mongoose.Types.ObjectId(req.body.category_id);
    }
    User.findOneAndUpdate(conditions, {$set: gtUdt}, options, (err, updatedPr) => {
        if (err) {
            res.json({
                result: "failed",
                data: {},
                messege: `Can not update .Error is : ${err}`
            });
        } else {
            res.json({
                result: "ok",
                data: updatedPr,
                messege: "Update successfully"
            });
        }
    })
};

