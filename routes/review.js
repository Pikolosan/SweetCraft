const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Sweet = require("../models/Sweet.js");
const { validateReview, isLoggedIn, isauthor } = require("../middleware.js");

const ReviewController = require("../controllers/review.js");

router.post(
  "/",
  isLoggedIn, 
  validateReview,
  wrapAsync(ReviewController.createReview)
);

router.delete("/:reviewId", 
  isLoggedIn, 
  isauthor, 
  wrapAsync(ReviewController.destroyreview)
);

module.exports = router;