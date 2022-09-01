const mongoose = require('mongoose')
const Schema = mongoose.Schema



const CommandSchema = new Schema({
    robotID: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    jobUpdate: {
        type: String
    }
})


const Command = mongoose.model('Command', CommandSchema)
module.exports = Command
