const Purchase = require('../models/Purchase');
const Sweet = require('../models/Sweet');

module.exports.getUserPurchases = async (req, res) => {
  try {
    if (!req.user) {
      req.flash("error", "Please login to view your purchases!");
      return res.redirect('/login');
    }

    const purchases = await Purchase.find({ userId: req.user._id }).populate('sweetId');
    res.render('sweets/myPurchases', { purchases });
  } catch (error) {
    console.error(error);
    req.flash("error", "Could not retrieve purchases!");
    res.redirect('/sweets');
  }
};

module.exports.cancelPurchase = async (req, res) => {
  try {
    const purchaseId = req.params.id;
    const purchase = await Purchase.findById(purchaseId).populate('sweetId');
    
    if (!purchase) {
      req.flash("error", "Purchase not found!");
      return res.redirect('/sweets/myPurchases');
    }

    if (purchase.sweetId) {
      purchase.sweetId.quantity += purchase.quantity;
      await purchase.sweetId.save();
    }

    await Purchase.findByIdAndDelete(purchaseId);
    req.flash("success", "Purchase cancelled successfully!");
    res.redirect("/sweets/my-purchases");
  } catch (error) {
    console.error(error);
    req.flash("error", "Cancellation failed!");
    res.redirect("/sweets/my-purchases");
  }
};