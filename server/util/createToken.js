const jwt = require('jsonwebtoken');
const secret_key = 'ffnaso87q4horfbq87wr';

module.exports = function createToken(user_pw) {
  const token = jwt.sign({ payload: user_pw }, secret_key);
  console.log("TOKEN", token);
  return token;
}