var router = global.router;
var bcrypt = require("bcryptjs");
var express = require("express");
var passport = require("passport");
var User = require("../models/User");
var jwt = require("jsonwebtoken");
var configs = require("../configs/database");

var controller = require("../controller/user.controller");

router.put("/change_password", controller.changePassword);

router.post("/upload_image_profile", controller.uploadImageProfile);

router.get("/open_image_profile/:image_name", controller.openImageProfile);

router.put("/change_picture_profile/:id", controller.changePictureProfile);

router.post("/forgot_password", controller.forgotPassword);

router.post("/reset_password/:token", controller.resetPassword);

module.exports = router;
