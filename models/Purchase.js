const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
    sweetId: {
        type: Schema.Types.ObjectId,
        ref: 'Sweet',
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'completed'
    }
});

const Purchase = mongoose.models.Purchase || mongoose.model('Purchase', purchaseSchema);
module.exports = Purchase;