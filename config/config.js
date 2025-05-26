const mongoose = require('mongoose')
const uri = "mongodb://0.0.0.0:27017/RentalApplications"
mongoose.connect(uri, {
    useNewUrlParser: true , useUnifiedTopology: true
})
    .then(() => console.log("___Data-Base Connected___"))
    .catch((err) => console.log("___Data-Base Didin't Connected___", err));


const connectDB = (uri) => {
    return (uri);
};
module.exports = connectDB
