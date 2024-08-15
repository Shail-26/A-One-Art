const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const checkAdmin = require('../middleware/checkAdmin');
const Product = require('../models/Product');
const { body, validationResult } = require('express-validator');
const upload = require('../middleware/fileupload'); // Import the multer configuration

// Route: POST "/api/admin/addproduct". Admin Login Required
router.post('/addproduct', fetchuser, checkAdmin, upload, [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('desc', 'Description must be at least 5 characters long').isLength({ min: 5 }),
    body('price', 'Price must be a number').isNumeric(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, desc, price } = req.body;

        // Image file path
        const imagePath = req.file.path;

        const newProduct = new Product({
            name,
            image: imagePath,
            desc,
            price
        });

        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
