const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const secret_key = 'ffnaso87q4horfbq87wr';

module.exports = function(token) {
  
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret_key, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded.payload);
      }
    });
  });
}