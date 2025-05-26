const mongoose = require('mongoose')
const listingSchema = mongoose.Schema({
    itemId: {
        type: mongoose.Types.ObjectId, ref: 'itemdatas'
    },
    userId: {
        type: mongoose.Types.ObjectId, ref: 'userdatas'
    },
    serviceProviderId: {
        type: mongoose.Types.ObjectId, ref: 'userdatas'
    }

}, { timestamps: true })
module.exports = mongoose.model('listingData', listingSchema)