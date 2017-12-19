var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');



var User = db.Model.extend({
  tableName: 'users',

  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      
      var pass = this.get('password');
      
      this.set('password', bcrypt.hashSync(pass));
      // console.log('signup: ', this.get('password')); 
      // var shasum = crypto.createHash('sha1');
      // shasum.update(model.get('url'));
      // model.set('code', shasum.digest('hex').slice(0, 5));
    });
  },
  
  passwordVerify: function(inputPW, callback) {
    // console.log('current pw: ', this.get('password'));
    // console.log('inputPW: ', inputPW);
    // inputPW = bcrypt.hashSync(inputPW);
    // console.log('inputPW ', inputPW, 'vs ', this.get('password'));
    bcrypt.compare(inputPW, this.get('password'), function(err, result) {
      if (err) {
        console.log(err);
      } else {
        callback(result);
      }
    });
  }
});

module.exports = User;