const mongoose = require('mongoose');
//User schema
const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true }, 
    email: { type: String, required: true, unique: true}, 
    password: { type: String, required: true }, 
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

