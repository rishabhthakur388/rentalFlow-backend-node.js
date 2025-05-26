const mongoose = require('mongoose')
const reviewsSchema = mongoose.Schema({
    clientId: {
        type: mongoose.Types.ObjectId, ref: 'userdatas'
    },
    serviceProviderReviewId: {
        type: mongoose.Types.ObjectId, ref: 'userdatas'
    },
    itemId: {
        type: mongoose.Types.ObjectId, ref: 'itemdatas'
    },
    Review: {
        type: String
    },
    numberOfStars: {
        type: Number
    },
    bookingId: {
        type: mongoose.Types.ObjectId, ref: 'bookingmodels'
    }
}, { timestamps: true })
module.exports = mongoose.model('reviewsdata', reviewsSchema)