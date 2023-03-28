const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const bcrypt = require("bcryptjs");

const nodemailer = require('nodemailer');
exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    delete user.password;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.gmail_username,
        pass: config.gmail_password
      }
    });

    const mailOptions = {
      from: config.gmail_username,
      to: req.body.email,
      subject: 'You are signed up',
      text: 'Congratulations, you have successfully signed up!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send({ 'success': false, 'message': 'Failed to send email' });
      } 
      else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.status(200).send({
      'success' : true,
      'message' : 'Signed up successfully',
      user
    })
  } catch (error) {
    res.status(500).send({ 'success' : false, 'message' : error.message });
  }
};
