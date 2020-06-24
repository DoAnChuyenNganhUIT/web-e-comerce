global.router = require('express').Router();

const configs = require('../configs/database')
var router = global.router;
var User = require('../models/User');
const {isAuth} = require('../middleware/auth')
const {uploadFileMiddleware} = require ('../middleware/upload')
const jwt = require('jsonwebtoken');

var mongoose = require('mongoose');

var controller = require('../controller/admin.controller');

router.post('/insert_user', controller.insertUser);

router.get('/get_user_id/:id', controller.getUserId);

router.get('/list_users', controller.getListUser);
router.put('/update_user/:id', controller.updateUser);

router.post('/post_image', uploadFileMiddleware, (req, res, next) => {
    const file = req.file
    if (!file) {
    //   const error = new Error('Please upload a file')
    //   error.httpStatusCode = 400
    res.json({
        message: 'Loi'
    })
      return next(error)
    }
      res.json({
          message: 'OK'
      })
    
  });

router.delete('/delete_user', controller.deleteUser);

module.exports = router;
//router.put('/suaUser')
