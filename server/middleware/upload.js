// var multer = require('multer');
// var fs = require('fs');
// var mkdirp = require('mkdirp');
// var mime = require('mime');
// var { includes } = require('lodash');
// var Response = require('server/utils/response');

// var dir = `uploads/${new Date().getFullYear()}/${new Date().getMonth()}`;
// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         !fs.existsSync(dir) && mkdirp(dir);
//         cb(null, dir);
//     },
//     filename: function(req, file, cb) {
//         var filename = `${
//             req.user._id
//         }.${new Date().getTime()}.${mime.getExtension(file.mimetype)}`;
//         cb(null, filename);
//     }
// });
// var fileFilter = function(req, file, cb) {
//     var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
//     if (includes(allowedMimes, file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(
//             new Response(400, {
//                 errors: { picture: 'Định dạng ảnh không hợp lệ' }
//             })
//         );
//     }
// };
// var upload = multer({
//     limits: { fileSize: 1024 * 1024 * 3 },
//     storage,
//     fileFilter
// });

// exports.uploadAvatarMiddleware = upload.single('avatar');
// exports.uploadImageMiddleware = upload.single('image');
// exports.uploadEventMiddleware = upload.single('pictureFile');
// exports.onFileSizeLimit = multer({
//     onFileSizeLimit: function(file) {
//         return new Response(400, {
//             errors: {
//                 picture: 'Ảnh vượt quá kích thước cho phép'
//             }
//         }).returnResponse(res);
//     }
// });
