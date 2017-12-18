var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');



var User = db.Model.extend({
  tableName: 'users',

  initialize: function() {
    // console.log('Successfully initialized!', this.attributes);
    this.on('creating', function(model, attrs, options) {
      
      var pass = this.get('password');
      console.log('pass: ', pass);
      this.set('password', bcrypt.hashSync(pass));
           
      // var shasum = crypto.createHash('sha1');
      // shasum.update(model.get('url'));
      // model.set('code', shasum.digest('hex').slice(0, 5));
    });
  }
});

module.exports = User;