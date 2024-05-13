const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phonenumber: String,
    age: Number,
    city: String,
})

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel