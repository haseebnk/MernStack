const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true, 
//     },
//     email: {
//         type: String,
//         required: true, 
//     },
//     phone: {
//         type: String,
//         required: true, 
//     },
//     password: {
//         type: String,
//         required: true, 
//     },
//     isAdmin: {
//         type: Boolean,
//         default: false,
//     },
// });

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, required: true, unique: true },
    phone: String,
    password: String 
});

module.exports = mongoose.model('User', userSchema);