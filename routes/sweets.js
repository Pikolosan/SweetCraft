const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateSweet, isAdmin, isAdminOrOwner } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Import controller - make sure path is correct
const sweetController = require("../controllers/sweets.js");

router.get("/admin",
  isLoggedIn,
  isAdmin,
  wrapAsync(sweetController.adminRoute)
);

router
  .route("/")
  .get(wrapAsync(sweetController.index))
  .post(
    isLoggedIn,
    isAdmin,
    upload.single("sweet[image]"),
    validateSweet, 
    wrapAsync(sweetController.createroute)
  );

router.get("/new", isLoggedIn,isAdmin, sweetController.newroute);

router.get("/my-purchases",
  isLoggedIn,
  wrapAsync(sweetController.getUserPurchases)
);

router.route("/search")
  .get(wrapAsync(sweetController.searchSweets));

router
  .route("/:id")
  .get(wrapAsync(sweetController.showroute))
  .put(
    isLoggedIn,
    isAdminOrOwner,
    upload.single("sweet[image]"),
    validateSweet,
    wrapAsync(sweetController.updateroute)
  )
  .delete(
    isLoggedIn,
    isAdminOrOwner,
    wrapAsync(sweetController.destroyroute)
  );

router.get("/:id/edit", 
  isLoggedIn, 
  isAdminOrOwner, 
  wrapAsync(sweetController.editroute)
);

router.get("/:id/purchase-page", 
  isLoggedIn, 
  wrapAsync(sweetController.purchasePage)
);

router.post("/:id/purchase",
  isLoggedIn,
  wrapAsync(sweetController.purchase)
);

router.post("/:id/restock",
  isLoggedIn,
  isOwner,
  wrapAsync(sweetController.restock)
);


module.exports = router;