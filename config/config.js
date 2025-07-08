const mongoose = require('mongoose')
const uri = process.env.URI
mongoose.connect(uri, {
    useNewUrlParser: true , useUnifiedTopology: true
})
    .then(() => console.log("___Data-Base Connected___"))
    .catch((err) => console.log("___Data-Base Didin't Connected___", err));


const connectDB = (uri) => {
    return (uri);
};
module.exports = connectDB
