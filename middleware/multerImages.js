const multer = require('multer');

const path = require('path');
// console.log(path)
const storage = multer.diskStorage({
    destination: function (req, file, collback) {
        collback(null, './public');
    },
    filename: function (req, file, collback) {
        collback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
// console.log("upload",upload)
module.exports = upload;
