const Sweet = require("../models/Sweet.js");

module.exports.index = async (req, res, next) => {
  const { category, search } = req.query;

  const query = {
    ...(category && category !== 'All' && { category }),
    ...(search && { 
      $or: [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ]
    })
  };

  const allSweets = await Sweet.find(query);
  res.render("sweets/index.ejs", { allSweets });
};

module.exports.adminRoute = async (req, res) => {
  const allSweets = await Sweet.find({});
  res.render("sweets/admin.ejs", { allSweets });
};


module.exports.newroute = (req, res) => {
  res.render("sweets/new.ejs");
};

module.exports.showroute = async (req, res) => {
  const { id } = req.params;
  const sweet = await Sweet.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner"); 
  
  if (!sweet) {
    req.flash("error", "The requested sweet does not exist!");
    return res.redirect("/sweets");
  }

  // Check if owner exists and is populated
  if (!sweet.owner) {
    console.log('Sweet owner is null for sweet:', sweet._id);
    req.flash("error", "This sweet doesn't have an owner assigned!");
    return res.redirect("/sweets");
  }
  const cuUser = res.locals.currUser;
  res.render("sweets/show.ejs", { sweet, cuUser: req.user });
};

module.exports.createroute = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debug log
    console.log("Request file:", req.file); // Debug log
    
    const { sweet } = req.body;
    
    // Check if sweet data exists
    if (!sweet) {
      req.flash("error", "Sweet data is missing!");
      return res.redirect("/sweets/new");
    }

    const { path: url, filename } = req.file || { 
      path: '/images/default-sweet.jpg', 
      filename: 'default-sweet.jpg' 
    };
    
    const newSweet = new Sweet({
      name: sweet.name,
      description: sweet.description,
      price: sweet.price,
      quantityAvailable: sweet.quantity,
      weight: sweet.weight,
      category: sweet.category,
      ingredients: sweet.ingredients,
      allergens: sweet.allergens || [],
      sweetType: sweet.sweetType,
      available: sweet.available !== undefined ? sweet.available : true,
      owner: req.user._id,
      image: { url, filename },
    });

    await newSweet.save();
    console.log("New sweet created:", newSweet); // Debug log
    
    req.flash("success", "New Sweet Added!");
    res.redirect("/sweets");
  } catch (error) {
    console.error("Error creating sweet:", error); // Debug log
    req.flash("error", "Failed to create sweet!");
    res.redirect("/sweets/new");
  }
};

module.exports.getUserPurchases = async (req, res) => {
  try {
    if (!req.user) {
      req.flash("error", "Please login to view your purchases!");
      return res.redirect('/login');
    }

    const Purchase = require("../models/Purchase");
    const purchases = await Purchase.find({ userId: req.user._id }).populate('sweetId');
    res.render('sweets/myPurchases', { purchases });
  } catch (error) {
    console.error(error);
    req.flash("error", "Could not retrieve purchases!");
    res.redirect('/sweets');
  }
};

module.exports.editroute = async (req, res) => {
  const { id } = req.params;
  const sweet = await Sweet.findById(id);
  if (!sweet) {
    req.flash("error", "The requested sweet does not exist!");
    return res.redirect("/sweets");
  }

  const orgImgUrl = sweet.image.url;
  res.render("sweets/edit.ejs", { sweet, orgImgUrl });
};

module.exports.updateroute = async (req, res) => {
  try {
    const { id } = req.params;
    const { sweet } = req.body;
    const updatedData = { 
      ...sweet, 
      category: sweet.category,
      categories: sweet.categories || [],
    };

    let sweetDoc = await Sweet.findByIdAndUpdate(id, updatedData);

    if (req.file) {
      sweetDoc.image = { url: req.file.path, filename: req.file.filename };
      await sweetDoc.save();
    }

    req.flash("success", "Sweet Updated!");
    res.redirect(`/sweets/${id}`);
  } catch (error) {
    req.flash("error", "Failed to update sweet!");
    res.redirect(`/sweets/${id}/edit`);
  }
};

module.exports.destroyroute = async (req, res) => {
  try {
    const { id } = req.params;
    await Sweet.findByIdAndDelete(id);
    req.flash("success", "Sweet Deleted!");
    res.redirect("/sweets");
  } catch (error) {
    req.flash("error", "Failed to delete sweet!");
    res.redirect("/sweets");
  }
};

module.exports.searchSweets = async (req, res) => {
  try {
    const { query = '', category = '' } = req.query;
    const regex = new RegExp(query, 'i');

    const searchQuery = {
      $or: [
        { name: regex },
        { description: regex }
      ],
      ...(category && { category })
    };

    const sweets = await Sweet.find(searchQuery);
    res.render('sweets/index', { allSweets: sweets });
  } catch (error) {
    req.flash("error", "Search failed!");
    res.redirect("/sweets");
  }
};

module.exports.purchasePage = async (req, res) => {
  try {
    const { id } = req.params;
    const sweet = await Sweet.findById(id);
    if (!sweet) {
      req.flash("error", "Sweet not found.");
      return res.redirect('/sweets');
    }
    res.render('sweets/purchase', {  
      sweetId: sweet._id, 
      sweet,
      pageTitle: "Purchase Sweet"
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "There was an issue loading the purchase page.");
    res.redirect('/sweets');
  }
};

module.exports.purchase = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    
    const sweet = await Sweet.findById(id);
    if (!sweet) {
      req.flash("error", "Sweet not found!");
      return res.redirect("/sweets");
    }

    if (sweet.quantity < quantity) {
      req.flash("error", "Insufficient quantity available!");
      return res.redirect(`/sweets/${id}/purchase-page`);
    }

    sweet.quantity -= parseInt(quantity);
    await sweet.save();

    const Purchase = require("../models/Purchase");
    const purchase = new Purchase({
      sweetId: id,
      userId: req.user._id,
      quantity: parseInt(quantity),
      totalAmount: sweet.price * quantity
    });
    await purchase.save();

    req.flash("success", `Successfully purchased ${quantity} ${sweet.name}(s)!`);
    res.redirect("/purchases/my-purchases");
  } catch (error) {
    console.error(error);
    req.flash("error", "Purchase failed!");
    res.redirect(`/sweets/${id}/purchase-page`);
  }
};

module.exports.restock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    
    const sweet = await Sweet.findById(id);
    if (!sweet) {
      req.flash("error", "Sweet not found!");
      return res.redirect("/sweets");
    }

    sweet.quantity += parseInt(quantity);
    await sweet.save();

    req.flash("success", `Successfully restocked ${quantity} ${sweet.name}(s)!`);
    res.redirect(`/sweets/${id}`);
  } catch (error) {
    req.flash("error", "Restock failed!");
    res.redirect(`/sweets/${id}`);
  }
};

// module.exports = {
//     index,
//     newroute,
//     showroute,
//     createroute,
//     editroute,
//     updateroute,
//     destroyroute,
//     searchSweets,
//     purchasePage,
//     purchase,
//     restock
// };