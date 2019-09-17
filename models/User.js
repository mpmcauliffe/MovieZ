const mongoose      = require('mongoose')


const UserSchema = mongoose.Schema({
    screenName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: Number,
        require: true,  
    }
})


module.exports = mongoose.model('user', UserSchema)
