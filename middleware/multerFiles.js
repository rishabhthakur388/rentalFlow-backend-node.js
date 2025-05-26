const multer = require('multer');

const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, collback) {
        collback(null, './filesUploaded');
    },
    filename: function (req, file, collback) {
        collback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});
const upload2 = multer({ storage: storage });
module.exports = upload2;


