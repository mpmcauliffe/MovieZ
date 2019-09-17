
const { Schema }   = require('mongoose')


const EventSchema = new Schema({
    movieTitle: String,
    location: String,
    date: Date(),
})


module.exports = EventSchema
