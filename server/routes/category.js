var router = global.router;
let category = require('../mode/category');
let product = require('../mode/Product');
var mongoose = require("mongoose")

router.post('/them_category', function(req, res, next) {
    
    var key = {
        //name : new RegExp(req.query.name, "i")      
        // i la khong phan biet chu hoa hay thuong  // chon co ki tu trung
        name : new RegExp('^' + req.body.name.trim() +'$' , "i")        
        //chon dung ki tu 
    };
    category.find(key).limit(1).exec(function(err,pro){
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
           
            }
            else{
                const newCategory = new category({
                    name        : req.body.name,
                    des         : req.body.des,
                })
                newCategory.save(function(err){
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
                                des         : req.body.des,
                            },
                            messege :"Insert category success"
                        });
                    };
                })
            }
        };
    })
});


router.delete('/delete_category', (req, res, next) => {
    category.findOneAndRemove({_id: mongoose.Types.ObjectId(req.body.category_id)}, (err) => {
        if (err) {
            res.json({
                result: "failed",
                messege: `loi , cannot delete. Error is : ${err}`
            });
            return;
        }
        product.findOneAndRemove({categoryId: mongoose.Types.ObjectId(req.body.category_id)}, (err) => {
            if (err) {
                res.json({
                    result: "failed",
                    messege: `Cannot delete product with categoryId: ${req.body.category_id}. Error is : ${err}`
                });
                return;
            }
            res.json({
                result: "ok",
                messege: "Delete category and product  successful"
            });
        });
    });
});

module.exports = router;