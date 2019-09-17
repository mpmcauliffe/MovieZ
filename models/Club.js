const mongoose      = require('mongoose')
const event         = require('./Event')


const ClubSchema = mongoose.Schema({
    clubName: {
        type: String,
        required: true,
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    members: [
        {    
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User', 
        }
    ],
    events: [event],
})


module.exports = mongoose.model('user', UserSchema)
