try {
  const Sweet = require('../models/Sweet');
  console.log('✅ Sweet model found');
  
  const middleware = require('../middleware');
  console.log('✅ Middleware found');
  
  const schema = require('../schema');
  console.log('✅ Schema found');
  
  const sweetController = require('../controllers/sweets');
  console.log('✅ Sweets controller found');
  
  console.log('🎉 All modules loaded successfully!');
} catch (error) {
  console.error('❌ Module error:', error.message);
}