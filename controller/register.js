const bcrypt = require('bcrypt')
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const User = require('../models/register');
// const register=require('../models/register');

//validation for registeration
exports.register = async (req, res) => {
  const { username, email, hash_password, mobile } = req.body;
  try {
    const userObj = { username, email, mobile };
    const hashPwd = await hash(hash_password, 12);
    userObj.hash_password = hashPwd;
    console.log(new User(userObj))
    const user = await new User(userObj).save();
    console.log(user);
    var payload = {
      username: user.username,
      email: user.email
    }
    sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, function (err, token) {
      res.status(201).json({ "token": token });
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//validation for logins
exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.hash_password;
  try {
    const user = await User.findOne({ username }).lean();
    if (!user) return res.status(404).send("Invalid credentials");
    // if (user.role !== "user")
    //   return res.status(404).send("Invalid credentials..");
    const isMatch = await compare(password, user.hash_password);
    console.log(isMatch);
    if (!isMatch) return res.status(400).send("Invalid credentials");
    const token = sign({ user }, "ABCD", { expiresIn: 360000 });
    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

//Authenticate users
exports.getAuthUser = async (req, res, next) => {
  try {
    const user = await User.findById(req?.user?._id).select("-hash_password").lean();
    if (!user)
      return res.status(400).send("User not found, Authorization denied..");
    return res.status(200).json({ ...user });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//query to get all users
exports.getAllUser = async (req, res) => {
  try {
    const getUser = await User.find({})
    res.send(getUser)
  }
  catch (err) {
    console.error('Error getting Users', err);
    res.status(500).send('Error getting Users');
  }
}