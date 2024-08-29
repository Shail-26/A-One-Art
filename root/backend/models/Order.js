const mongoose = require('mongoose')
const { Schema } = mongoose;

const OrderSchema = new Schema({
    userid: {
        type:String,
        required:true
    },
    name: {
        type:String,
        required:true   
    },
    email: {
        type:String,
        required:true,
    },
    mobile: {
        type:String,
        required:true
    },
    event: {
        type:String,
        required:true
    },
    desc: {
        type:String
    },
    event_date: {
        type:String,
        required: true
    },
    Location: {
        type:String,
        required: true
    },
    date: {
        type:Date,
        default:Date.now
    }
});
const Order  = mongoose.model('Order', OrderSchema);
module.exports = Order;
