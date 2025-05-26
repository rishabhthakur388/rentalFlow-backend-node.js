const mongoose = require('mongoose')
const availibilitySchema = mongoose.Schema({
    day: {
        type: String
    },
    StartTime: {
        type: String
    },
    EndTime: {
        type: String
    },
    itemId: {
        type: mongoose.Types.ObjectId, ref: 'itemdatas'
    },
    serviceProviderId: {
        type: mongoose.Types.ObjectId, ref: 'userdatas'
    },
    itemRating: {
        type: String
    },
    status: {
        type: Boolean
    }
}, { timestamps: true })
module.exports = mongoose.model('availibilityData', availibilitySchema)