const mongoose = require('mongoose')
const bookingSchema = mongoose.Schema({
    itemId: {
        type: mongoose.Types.ObjectId, ref: 'itemdatas'
    },
    clientId: {
        type: mongoose.Types.ObjectId, ref: 'userdatas'
    },
    serviceProviderId: {
        type: mongoose.Types.ObjectId, ref: 'userdatas'
    },
    startTime: {
        type: [String],
        default: ""
    },
    endTime: {
        type: [String],
        default: ""

    },
    deliveryOptions: {
        type: []
    },
    priceDetail: {
        type: Array
    },
    payWith: {
        type: String
    },

    bookingStatus: {
        type: String,
        default: '1',
        enum: ["1", "2", "3", "4"]
    },
    validDriversLicence: {
        type: String,
        default: ""

    },
    notes: {
        type: String,
        default: ""

    },
    paymentId: {
        type: String,
        default: ""
    },
    totalPrice: {
        type: String,
        default: ""

    },
    validDriversLicenceUrl: {
        type: String,
        default: ""
    },
    notesUrl: {
        type: String,
        default: ""
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    deliveryOption: {
        type: Boolean,

    },
    itemPicture: {
        type: String
    },
    itemName: {
        type: String
    },
    startday: {
        type: String
    },
    startday: {
        type: String
    },
    endDateday: {
        type: String
    },
    startDate: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    }


}, { timestamps: true })
module.exports = mongoose.model('bookingmodel', bookingSchema)
