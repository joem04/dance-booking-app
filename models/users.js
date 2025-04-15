// models/users.js
const Datastore = require('nedb');
const path = require('path');
const bcrypt = require('bcrypt');

const db = new Datastore({ 
  filename: path.join(__dirname, '../db/users.db'), 
  autoload: true 
});

// Hash password before inserting
function createUser(user, callback) {
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return callback(err);
    user.password = hash;
    db.insert(user, callback);
  });
}

function authenticate(username, password, callback) {
  db.findOne({ username }, (err, user) => {
    if (err || !user) return callback(null, false);
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) callback(null, user);
      else callback(null, false);
    });
  });
}

module.exports = {
  db,
  createUser,
  authenticate
};
