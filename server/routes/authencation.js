const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const configs = require('../configs/database');
const {isAuth} = require('../middleware/auth')

const router = global.router;

const controller = require('../controller/authencation.controller');

router.post('/signup', controller.signUp);
router.post('/login', controller.logIn);
router.get('/validate', isAuth, controller.validate);

module.exports = router;
