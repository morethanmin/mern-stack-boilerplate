const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    minlength: 1,
  },
  lastname: {
    type: String,
    maxlength: 5,
  },
  role: {
    type: String,
    default: 0,
  },
  password: {
    type: String,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});
//middleware
userSchema.pre("save", function (next) {
  var user = this;
  //password가 변환 되는 때에만 암호화 해준다.
  if (user.isModified("password")) {
    //비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {

  //plainPassword 1234567    암호회된 비밀번호 $2b$10$l492vQ0M4s9YUBfwYkkaZOgWHExahjWC
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  })
}

userSchema.methods.generateToken = function (cb) {
  var user = this;
  //jsonwebtoken을 이용해 토큰 생성
  var token = jwt.sign(user._id.toHexString(), "secretToken");

  //user._id + secretToken = token

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    //decode token
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //유저아이디를 이용해서 유저를 찾은 다음에
        //client에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id":decoded, "token": token}, function(err,user) {
            if(err) return cb(err);
            cb(null, user)
        })

    })
}

const User = mongoose.model("User", userSchema);

module.exports = { User };
