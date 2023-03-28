const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  secret: process.env.SECRET,
  gmail_username : process.env.GMAIL_USERNAME,
  gmail_password : process.env.GMAIL_PASSWORD
};
