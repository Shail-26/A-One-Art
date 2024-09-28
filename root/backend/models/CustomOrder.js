const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomOrderSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who placed the custom order
        required: true
    },
    customName: {
        type: String,
    },
    customDescription: {
        type: String,
    },
    customImage: {
        type: String, // Store the file path of the uploaded image
    },
    status: {
        type: String,
        default: 'pending'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CustomOrder', CustomOrderSchema);
