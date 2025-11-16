const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const SweetSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    filename: {
      type: String,
      default: "defaultsweetimage",
    },
    url: {
      type: String,
      default: "/images/default-sweet.jpg",
      set: (v) =>
        v === "" ? "/images/default-sweet.jpg" : v,
    },
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  category: {
    type: String, 
    enum: ['chocolate', 'candy', 'baked', 'traditional', 'sugar-free', 'international'],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  categories: {
    type: [String],
    enum: ['Popular', 'Seasonal', 'Festive', 'Premium', 'Discount', 'New'],
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  ingredients: String
  ,
  weight: {
    type: String,
  },
  allergens: {
    type: [String],
    enum: ['Nuts', 'Dairy', 'Gluten', 'Soy', 'Eggs', 'None']
  }
});

SweetSchema.post("findOneAndDelete", async (sweet) => {
  if (sweet) {
    await Review.deleteMany({ _id: { $in: sweet.reviews } });
  }
});

const Sweet = mongoose.model("Sweet", SweetSchema);
module.exports = Sweet;