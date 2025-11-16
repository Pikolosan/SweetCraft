const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const purchaseController = require("../controllers/purchases.js");

// My Purchases page
router.get("/my-purchases",
  isLoggedIn,
  wrapAsync(purchaseController.getUserPurchases)
);

// Cancel purchase
router.delete("/:id",
  isLoggedIn,
  wrapAsync(purchaseController.cancelPurchase)
);

module.exports = router;