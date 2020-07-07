global.router = require('express').Router();

const router = global.router;
let MyImage = require('../models/MyImage')

router.post('/insert-image', (req, res, next) => {
    const newMyImage = new MyImage({
        name: req.body.name,
        url: req.body.url,
        userId: req.body.userId

    });
    newMyImage.save((err, myImage) => {
        if(err){
            res.json({
                result: false,
                data: {},
                message: `Err is ${err}`
            });
        }
        else {
            res.json({
                result: true,
                data: myImage,
                message: "Insert image success"
            })
        }
    })
})

router.get('/list-images', (req, res ,next) => {
    MyImage.find({},(err, myImage) => {
        if(err){
            res.json({
                result: false,
                data: [],
                message: `Err is ${err}`
            })
        }
        else{
            res.json({
                result: true,
                count: myImage.length,
                data: myImage,
                message:'List image success'
            })
        }
    })
})

router.get('/imageId/:id', (req, res, next) => {
    const {id = ''} = req.params;
    MyImage.findById(id, (err, myImage) => {
        if(err){
            res.json({
                result: false,
                data: [],
                message: `Err is ${err}`
            });
        }
        else {
            res.json({
                result: true,
                data: myImage,
                message: 'Find Id image success'
            })
        }
    })
})

module.exports = router;