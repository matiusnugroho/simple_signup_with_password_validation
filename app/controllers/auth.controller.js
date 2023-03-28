const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    delete user.password;
    res.status(200).send({
      'success' : true,
      'message' : 'Signed up successfully',
      user
    })
  } catch (error) {
    res.status(500).send({ 'success' : false, 'message' : error.message });
  }
};
