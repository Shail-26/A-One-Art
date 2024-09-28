const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const checkAdmin = require('../middleware/checkAdmin');
const Product = require('../models/Product');
const { body, validationResult } = require('express-validator');
const upload = require('../middleware/fileupload'); // Import the multer configuration
const CustomerOrder = require('../models/CustomOrder');
const User = require('../models/User');
const CustomOrder = require('../models/CustomOrder');

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

router.get('/getallproducts', fetchuser, async (req, res) => {
    try {
        const products = await Product.find().select(); 
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/product/:productId',fetchuser, async (req, res) => {
    try {
        const productId = req.params.productId;
        
        // Fetch product and populate the reviews array with actual review data
        const product = await Product.findById(productId).populate('reviews');
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});


// router.post('/customizeorder', fetchuser, upload, [
router.post('/customizeorder', fetchuser, upload, [
    body('customName', 'Enter a valid name').isLength({ min: 0 }),
    body('customDesc', 'Description must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { productId, customName, customDesc } = req.body;

        // Find the product by its ID
        const product = await Product.findById(productId);
        const user = await User.findById(req.user.id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found', id:(productId || 0) });
        }
        // Image file path
        const imagePath = req.file ? req.file.path : null;
        // const imagePath = "";

        const newCustomization = new CustomerOrder({
            product: product._id,
            user: user._id, // Add the user ID from the authenticated request
            customName: customName,
            customDescription: customDesc,
            customImage: imagePath
        });

        const saveCustomization = await newCustomization.save();
        res.json(saveCustomization);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.put('/updatecustomproduct/:id', fetchuser, checkAdmin, async (req, res) => {
    const { status } = req.body;
    try {
        let order = await CustomOrder.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        const newOrder = {};
        newOrder.status = status;
        // Update the Order
        order = await CustomOrder.findByIdAndUpdate(req.params.id, { $set: newOrder }, { new: true });
        res.json({ success: true, order });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/fetchproductorder', fetchuser, checkAdmin,
    async (req, res) => {
        try {
            const product_order = await CustomOrder.find().select(); 
            res.json(product_order);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
})

//Route: PUT "/api/admin/updateproduct"
router.put('/updateproduct/:id', fetchuser, checkAdmin, upload, [
    body('ename', 'Enter a valid name').isLength({ min: 3 }),
    body('edesc', 'Description must be at least 5 characters long').isLength({ min: 5 }),
    body('eprice', 'Price must be a number').isNumeric(),
], async (req, res) => {
    const { name, desc, price } = req.body;
    const imagePath = req.file ? req.file.path : null;

    try {
        // Prepare the updated product object
        const newProduct = {};
        if (name) newProduct.name = name;
        if (desc) newProduct.desc = desc;
        if (price) newProduct.price = price;
        if (imagePath) newProduct.image = imagePath;

        // Find the product by ID
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Update the product
        product = await Product.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true });
        res.json({ success: true, product });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.delete('/deleteproduct/:id', fetchuser, checkAdmin, async (req, res) => {
    try {
        // Find the product by ID
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        // Delete the product
        product = await Product.findByIdAndDelete(req.params.id)
        res.json({ success: true, "Success" : "product has been deleted", product: product });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;
