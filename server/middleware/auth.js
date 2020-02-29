const passport = require('passport');

// const handleJWT = (req, res, next) => async (err, user, info) => {
//     req.user = user || { role: 'guest' };
//     return next();
// };
//exports.authorize = passport.authenticate('jwt', { session: false });

exports.isAdmin = (req, res, next) => {
    if (req.user.role === 'admin') return next();
    return res.status(401).json('Unauthorized');
};
