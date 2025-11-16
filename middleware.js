const Sweet = require("./models/Sweet.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { sweetSchema, reviewSchema } = require("./schema.js");

// Simple isLoggedIn middleware - check if user exists in request
const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in!");
    return res.redirect("/login");
  }
  next();
};

// Middleware to save redirect URL
const saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// Middleware to check if user is owner of the sweet
const isOwner = async (req, res, next) => {
  let { id } = req.params;
  let sweet = await Sweet.findById(id);
  if (!sweet.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of this sweet!");
    return res.redirect(`/sweets/${id}`);
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    req.flash("error", "You need admin privileges to access this!");
    return res.redirect("/sweets");
  }
};

const isAdminOrOwner = async (req, res, next) => {
  let { id } = req.params;
  let sweet = await Sweet.findById(id);
  
  if (req.user && (req.user.isAdmin || sweet.owner.equals(req.user._id))) {
    next();
  } else {
    req.flash("error", "You don't have permission to do that!");
    return res.redirect(`/sweets/${id}`);
  }
};

// Middleware to check if user is author of the review
const isauthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review!");
    return res.redirect(`/sweets/${id}`);
  }
  next();
};

// Sweet validation middleware
const validateSweet = (req, res, next) => {
  console.log("=== VALIDATION MIDDLEWARE ===");
  console.log("Request body sweet data:", req.body.sweet);
  console.log("Ingredients field:", req.body.sweet?.ingredients);
  
  const { error } = sweetSchema.validate(req.body);
  
  if (error) {
    console.log("Validation error details:", error.details);
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    console.log("Validation passed!");
    next();
  }
};

// Review validation middleware
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

module.exports = {
  isLoggedIn,
  saveRedirectUrl,
  isOwner,
  isauthor,
  validateSweet,
  validateReview,
  isAdmin,
  isAdminOrOwner
};