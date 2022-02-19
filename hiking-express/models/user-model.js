const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String
}, { collection: 'user' });

const User = mongoose.model('user', userSchema);

module.exports = User;