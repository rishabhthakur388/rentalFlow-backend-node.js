const mongoose = require('mongoose')
const newSchema = mongoose.Schema({
    data: [{
        playerName: {
            type: String
        },
        score: {
            type: String
        }
    }],
    fullName: {
        type: String
    },
    email: {
        type: String
    }
})
module.exports = mongoose.model('newData', newSchema)