global.router = require('express').Router();

var router = global.router;
var User = require('../models/User');

var mongoose = require('mongoose');

var controller = require('../controller/admin.controller');

router.post('/insert_user', controller.insertUser);

router.get('/get_user_id', controller.getUserId);

router.put('/update_user', controller.updateUser);

router.delete('/delete_user', controller.deleteUser);

module.exports = router;
//router.put('/suaUser')
