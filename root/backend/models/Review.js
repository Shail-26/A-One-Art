const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the product being reviewed
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who wrote the review
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5 // Assuming a 5-star rating system
    },
    comment: {
        type: String,
        required: true,
        maxlength: 500 // Limit comment length if needed
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', ReviewSchema);
