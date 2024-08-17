const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/products/'); // Specify the folder to store images
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Generate unique file name
    }
});

// File validation (max size 3MB, only certain formats allowed)
const upload = multer({
    storage: storage,
    limits: { fileSize: 3 * 1024 * 1024 }, // 3MB max size
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|heic/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!'); // Reject non-image files
        }
    }
}).single('image'); // Single file upload

module.exports = upload;
