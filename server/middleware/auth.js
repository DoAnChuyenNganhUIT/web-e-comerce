const passport = require('passport');
const { secret } = require('../configs/database');
const jwt = require('jsonwebtoken');

// const handleJWT = (req, res, next) => async (err, user, info) => {
//     req.user = user || { role: 'guest' };
//     return next();
// };
//exports.authorize = passport.authenticate('jwt', { session: false });

exports.isAdmin = (req, res, next) => {
    if (req.user.role === 'admin') return next();
    return res.status(401).json('Unauthorized');
};
exports.isAuth = async (req, res, next) => {
    const tokenFromClient = req.body.token || req.query.token || req.headers['x-access-token'];
    const verifyToken = (token, secretKey) => {
        return new Promise ((resolve, reject) => {
            jwt.verify(token, secretKey, (error, decoded) => {
                if(error){
                    return reject(error);
                }
                resolve(decoded)
            })
        })
    }
    if (tokenFromClient){
        try {
            const decoded = await verifyToken(tokenFromClient, secret);
            req.jwtDecoded = decoded;
            next ();
        }
        catch (error) {
            return res.status(401).json({
                message: 'Unauthorized.'
            })
        }
    }else{
        return res.status(403).send({
            message: 'No token provided'
        })
    }
}
