

var router = global.router;
let product = require('../mode/Product');
var mongoose = require("mongoose")
let fs = require('fs');

/* GET users listing. */


router.post('/insert_product', function(req, res, next) {

    const newProd =  new product({
        name        : req.body.name,
        kind        : req.body.kind,
        price       : req.body.price,
        
    });
    newProd.save(function(err){
        if(err){
            res.json({
                result  : "failed",
                data    :{},
                messege :`Err is ${err}`
            });
        }
        else{
            res.json({
                result  :"successful",
                data    :{
                    name        : req.body.name,
                    kind        : req.body.kind,
                    price       : req.body.price
                },
                messege :"Insert product success"
            });
        };
    })
    
  });

router.get('/list_product', function(req, res, next) {  //xuat tat ca ds san pham
    product.find({}).limit(50).sort({name:1}).select({
        name        : 1,
        kind        : 1,
        price       : 1,
        Create_date : 1,
        status      : 1,
    }).exec(function(err,pro){
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
                count   :pro.length,
                messege :"Query list of product success"
            });
        };
    })
});

// xuat san pham theo id
router.get('/get_product_id', function(req, res, next) {            
    product.findById(require('mongoose').Types.ObjectId(req.query.id),
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
                messege :"Query Id product success"
            });
        };
    })
  });


  // xuat san pham theo tu khoa tim kiem
  router.get('/find_key', function(req, res, next) {
    if(!req.query.name){
        res.json({
            result  :"failed",
            data    :[],
            messege :"Name khong hop le"
        })
    };
    var key = {
        name : new RegExp(req.query.name, "i")      
        // i la khong phan biet chu hoa hay thuong  // chon co ki tu trung
       // name = new RegExp("^" + req.query.name +"$" , "i")        chon dung ki tu 
    };
    product.find(key).limit(50).sort({name:1}).select({
        name        : 1,
        kind        : 1,
        price       : 1,
        Create_date : 1,
        status      : 1,
    }).exec(function(err,pro){
        if(err){
            res.json({
                result  : "failed",
                data    :[],
                messege :`Err is ${err}`
            });
        }
        else
        {
            if(pro.length>0){
            res.json({
                result  :"successful",
                data    :pro,
                count   :pro.length,
                messege :"tim kiem thanh cong"
            });
            }
            else{
                res.json({
                    result  :"failed",
                    data    : [],
                    
                    messege :"sai ten tim kiem"
                }); 
            }
        };
    })
});


router.put('/update_product',function(req,res,next){
    let conditions = {}; // la 1 object
    if(mongoose.Types.ObjectId.isValid(req.body.id)==true){  //xac thuc thuoc tinh cua Oj
        conditions._id = mongoose.Types.ObjectId(req.body.id);
    } else res.json({
        result: "failed",
        data: {},
        messege: "Id khong dung"
    });

    let gtUdt = {};
    if (req.body.name && req.body.name.length > 2) {
        gtUdt.name = req.body.name;
    }
    gtUdt.kind = req.body.kind;

    const options = {
        new: true,   // tra ve du lieu da chuyen doi thay vi ban goc
        multi: true
    };

    //update anh
    if (req.body.image_name && req.body.image_name.length > 0) {
        //Ex: http://localhost:3000/open_image?image_name=ten
        const serverName = require("os").hostname();
        const serverPort = require("../app").settings.port;
        gtUdt.img = `${serverName}:${serverPort}/open_image?image_name=${req.body.image_name}`
    }

    //gan category cho san pham
    if (mongoose.Types.ObjectId.isValid(req.body.category_id) == true) {
        gtUdt.categoryId = mongoose.Types.ObjectId(req.body.category_id);
    }
    product.findOneAndUpdate(conditions, {$set: gtUdt}, options, (err, updatedPr) => {
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
})
 
router.delete('/xoa_product', (req, res, next)=>{
    product.findOneAndDelete({_id: mongoose.Types.ObjectId(req.body.id)},(err,user)=>{
        if(err){
            res.json({
                result: "failed",
                messege:`khong the xoa . loi ${err}`
            });
            return;
        }
        if(!user){
            res.json({
                result: "failed",
                messege:"san pham khong ton tai"
            })
        }
        else {
            res.json({
                result: "ok",
                messege:"xoa thanh cong"
            })
        }
    }
    )
});

router.post('/upload_images', (req, res, next) => {
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
});

router.get('/open_image', (req, res, next) => {
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
});
module.exports = router;
