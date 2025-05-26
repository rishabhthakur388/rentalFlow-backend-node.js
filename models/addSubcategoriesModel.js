const mongoose = require('mongoose')
const subcategorySchema = mongoose.Schema({
    subCategoryName: {
        type: String
    },
    category_ID: {
        type: mongoose.Types.ObjectId, ref: 'itemscategories'
    }
}, { timestamsps: true })
module.exports = mongoose.model('subcategorydata', subcategorySchema)