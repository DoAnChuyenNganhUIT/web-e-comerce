var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var configs = require('../configs/database');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');

var userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    image_name: {
      type: String,
    },

    name: {
      type: String,
    },
    role: {
      type: [
        {
          type: String,
          enum: ['admin', 'khachhang'],
        },
      ],
      default: ['khachhang'],
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { collection: 'User' }
);

var User = (module.exports = mongoose.model('User', userSchema));

module.exports.getUserById = (id, cb) => {
  User.findById(id, cb);
};

module.exports.getUserByEmail = (email, cb) => {
  User.findOne({ email: email }, cb);
};

module.exports.CreateUser = (newUser, cb) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(cb);
    });
  });
};

module.exports.comparePassword = (Mypassword, hash, cb) => {
  bcrypt.compare(Mypassword, hash, (err, isMatch) => {
    if (err) throw err;
    cb(null, isMatch);
  });
};

userSchema.methods.createPasswordResetToken = function createPasswordResetToken() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
