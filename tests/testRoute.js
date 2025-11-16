const sweetController = require('../controllers/sweets');

// Check if all functions exist
const requiredFunctions = [
  'index', 'newroute', 'showroute', 'createroute', 
  'editroute', 'updateroute', 'destroyroute', 
  'searchSweets', 'purchasePage', 'purchase', 'restock'
];

requiredFunctions.forEach(func => {
  if (typeof sweetController[func] === 'function') {
    console.log(`✅ ${func} exists`);
  } else {
    console.log(`❌ ${func} is missing`);
  }
});