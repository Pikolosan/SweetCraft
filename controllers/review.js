const Sweet = require("../models/Sweet.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
  let sweet = await Sweet.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  sweet.reviews.push(newReview);

  await newReview.save();
  await sweet.save();

  req.flash("success", "New Review Created!");
  res.redirect(`/sweets/${sweet._id}`);
};

module.exports.destroyreview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Sweet.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted!");
  res.redirect(`/sweets/${id}`);
};