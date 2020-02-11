const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');
const UserSchema = new mongoose.Schema({
    Nome: String,
    github_user: String,
    bio: String,
    avatar_url: String,
    religion: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
     }
});
module.exports = mongoose.model('User', UserSchema);