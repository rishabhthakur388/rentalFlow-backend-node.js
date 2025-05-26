const mongoose = require('mongoose')
const itemsSchema = mongoose.Schema({
    nameOfItemYouAreListing: {
        type: String
    },
    itemDiscription: {
        type: String
    },
    rentalRules: {
        type: String
    },
    itemSubCategory: {
        type: mongoose.Types.ObjectId, ref: 'subCategories'
    },
    itemPicture: {
        type: String
    },
    pictureUrl: {
        type: String
    },
    minimumRental: {
        type: String
    },
    quantity: {
        type: String
    },
    price: {
        type: String
    },
    deposite_inCash: {
        type: String
    },
    ownerDelivery: {
        type: Boolean
    },
    delivery_fee: {
        type: String
    },
    rentalPichkup: {
        type: Boolean
    },
    businessAddress: {
        type: String
    },
    serviceProviderId: {
        type: mongoose.Types.ObjectId, ref: 'userdatas'
    },
    lat: {
        type: Number
    },
    long: {
        type: Number
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number]
        }
    },
    rating: {
        type: Number
    },
    locationName: {
        type: String
    },
    serviceFee: {
        type: String,
        default: ""
    }
}, { timestamps: true })

itemsSchema.index({ location: '2dsphere' })

module.exports = mongoose.model('itemdata', itemsSchema)