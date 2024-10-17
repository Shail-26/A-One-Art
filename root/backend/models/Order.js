const mongoose = require('mongoose');
const { Schema } = mongoose;
let personCounter = 1;

const OrderSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true   
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    event_date: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'pending'
    },
    assignedPersons: [{
        name: {
            type: String
        },
        role: {
            type: String
        },
        exposingPrize: {
            type: Number
        }
    }]
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
