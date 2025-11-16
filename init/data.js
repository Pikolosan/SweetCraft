const data = [
  {
    name: "Belgian Chocolate Truffles",
    description: "Rich and creamy Belgian chocolate truffles with a soft ganache center.",
    image: {
      filename: "chocolate_truffles.jpg",
      url: "/images/chocolate-truffles.jpg",
    },
    price: 25.99,
    category: "chocolate",
    quantity: 50,
    categories: ["Popular", "Premium"],
    ingredients: ["Belgian chocolate", "cream", "cocoa powder"],
    weight: "200g",
    allergens: ["Dairy"]
  },
  {
    name: "Artisanal Gummy Bears",
    description: "Handcrafted gummy bears with natural fruit flavors.",
    image: {
      filename: "gummy_bears.jpg",
      url: "/images/gummy-bears.jpg",
    },
    price: 12.99,
    category: "candy",
    quantity: 100,
    categories: ["Popular", "New"],
    ingredients: ["fruit juice", "gelatin", "cane sugar"],
    weight: "150g",
    allergens: ["None"]
  },
  {
    name: "French Macarons",
    description: "Delicate almond meringue cookies with buttercream filling.",
    image: {
      filename: "macarons.jpg",
      url: "/images/macarons.jpg",
    },
    price: 18.50,
    category: "baked",
    quantity: 30,
    categories: ["Premium", "Festive"],
    ingredients: ["almond flour", "egg whites", "sugar", "butter"],
    weight: "6 pieces",
    allergens: ["Nuts", "Eggs"]
  }
];

module.exports = { data };