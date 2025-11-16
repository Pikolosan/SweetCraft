const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.pre('save', function(next) {
    if (this.email === 'admin@SweetCraft.com') {
        this.isAdmin = true;
    }
    next();
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);