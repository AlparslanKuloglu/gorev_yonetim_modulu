const mongoose = require('mongoose')
const Schema = mongoose.Schema



const RobotSchema = new Schema({
    model: {
        type: String,
        required: true
    },
    batteryInfo: {
        type: String
    }
})


const Robot = mongoose.model('Robot', RobotSchema)
module.exports = Robot
