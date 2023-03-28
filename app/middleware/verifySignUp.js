//const { default: validatePassword } = require("../helper/validatePassword");
const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const validatePassword = require("../helper/validatePassword");

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (user) {
      return res.status(400).send({
        success: false,
        message: "Failed! Username is already in use!"
      });
    }
    user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (user) {
      return res.status(400).send({
        success: false,
        message: "Failed! Email is already in use!"
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
};

const validatePasswordReq = async (req, res, next)=>{
  const password = req.body.password;
  const valid = validatePassword(password)
  if(!valid){
    return res.status(500).send({
      success : false,
      message : 'Your password is invalid'
    });
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  validatePasswordReq
};

module.exports = verifySignUp;
