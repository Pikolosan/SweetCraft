const User = require("../models/user");
const Sweet = require('../models/Sweet');

exports.getHomePage = async (req, res) => {
  try {
    const sweets = await Sweet.find().limit(3);
    res.render('sweets/Home', { sweets });
  } catch (error) {
    console.log('Error fetching sweets:', error);
    res.status(500).send('Server Error');
  }
};

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Sweet Shop!!");
      res.redirect("/sweets");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back to Sweet Shop");
  let redirectUrl = res.locals.redirectUrl || "/sweets";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "You have logged out");
    res.redirect("/sweets");
  });
};