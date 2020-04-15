var express = require("express");
var passport = require("passport");
var User = require("../models/User");
var jwt = require("jsonwebtoken");
var configs = require("../configs/database");

var router = global.router;

var controller = require("../controller/authencation.controller");

router.post("/signup", controller.signUp);
router.post("/login", controller.logIn);

router.get("/profile", controller.proFile);
router.get("/logout", controller.logOut);

module.exports = router;
