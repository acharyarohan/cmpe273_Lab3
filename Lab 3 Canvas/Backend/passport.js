const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const bcrypt = require('bcrypt');
var ExtractJwt = require('passport-jwt').ExtractJwt;

var UserModel = require('./models/User.js')

module.exports = function (passport) {
  console.log('passport function');

  var opts = {
    jwtFromRequest: ExtractJwt.fromBodyField('token') ,

    
      secretOrKey: 'secret_my'
  };
  passport.use('jwt',new JwtStrategy(opts, function (jwt_payload, callback) {
    

    console.log('hello',jwt_payload.email);


      UserModel.findOne({ 
          'email': jwt_payload.email 
      }, (err, res) => {

              if (res) {
                  var user = res;
                  delete user.password;
                  callback(null, user.email);
              }
              else {
                  callback(err, false);
              }
          });
  })); 