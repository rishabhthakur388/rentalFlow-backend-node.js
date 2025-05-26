const mongoose = require('mongoose')
const chatSchema = mongoose.Schema({
    sender_id: {
        type: mongoose.Types.ObjectId, ref: 'userdatas'
    },
    reciver_id: {
        type: mongoose.Types.ObjectId, ref: 'userdatas'
    },
    item_id: {
        type: mongoose.Types.ObjectId, ref: 'itemdatas'
    },
    message:{
        type:String,
    }
}, {
    timestamps: true
})
// userDatasSchema.index({ location: '2dsphere' })
module.exports = mongoose.model('chat', chatSchema)