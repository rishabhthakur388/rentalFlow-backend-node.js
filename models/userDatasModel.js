const mongoose = require('mongoose')
const userDatasSchema = mongoose.Schema({
    Email: {
        type: String,
    },
    password: {
        type: String
    },
    otp: {
        type: Number,
        default: null
    },
    phoneNumber: {
        type: String,
        default: "",

    },
    fullName: {
        type: String,
        default: ""

    },
    zipCode: {
        type: String,
        default: ""

    },
    businessName: {
        type: String,
        default: ""

    },
    businessNumber: {
        type: String,
        default: ""
    },
    businessWebsite: {
        type: String,
        default: ""

    },
    businessAddress: {
        type: String,
        default: ""

    },
    id_type: {
        type: Number,
        default: 1

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
    businessAcount: {
        type: Boolean,
        default: false
    },
    governmentId: {
        type: String,
        default: "NotProvided"

    },
    appleId: {
        type: String,
        default: ""

    },
    facebookId: {
        type: String,
        default: ""
    },

    aboutMe: {
        type: String,
        default: "Not Provided"
    },
    stage: {
        type: String,
        default: ""
    },
    phoneNumber_is_Varified:
        { type: String },
    userProfilePictureUrl: {
        type: String,
        default: ""
    },
    userProfilePicture: {
        type: String,
        default: ""

    },
    userRating: {
        type: Number,
        default: 0
    },
    totalItems: {
        type: Number,
        default: 0
    },
    LocationName: {
        type: String
    },
    stripeCustomerId: {
        type: String,
        default: ""
    },
    userVideo: {
        type: String,
        default: ""
    },
    videoThumbnail: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})
userDatasSchema.index({ location: '2dsphere' })
module.exports = mongoose.model('userdatas', userDatasSchema)