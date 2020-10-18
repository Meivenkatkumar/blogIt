const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {type: String, required: true},
        password: {type: String},
        email: {type: String, default:""},
        emailVerified: {type: Boolean, default: false},
        auth: {type: String, required: true},
        mobile: {type:String, default: ""},
        mobVerified: {type: Boolean, default: false},
    }
);

module.exports = mongoose.model('user', userSchema);