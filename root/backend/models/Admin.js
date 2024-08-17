const mongoose = require('mongoose')
const { Schema } = mongoose;

const AdminSchema = new Schema({
    name: {
        type:String,
        required:true   
    },
    role: {
        type:String,
        default:'admin'
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    mobile: {
        type:String,
        required:true
    },
    date: {
        type:Date,
        default:Date.now
    }
});
const Admin  = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
