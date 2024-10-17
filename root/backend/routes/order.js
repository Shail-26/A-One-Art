const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const checkAdmin = require('../middleware/checkAdmin');
const Order = require('../models/Order');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/order-det', [
    fetchuser,
    // Validate dateFrom
    body('dateFrom', 'Invalid start date')
        .isISO8601()
        .toDate()
        .custom((value) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (value < today) {
                throw new Error('Start date cannot be in the past');
            }
            return true;
        }),
    // Validate dateTo
    body('dateTo', 'Invalid end date')
        .isISO8601()
        .toDate()
        .custom((value, { req }) => {
            if (value < req.body.dateFrom) {
                throw new Error('End date must be after start date');
            }
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (value < today) {
                throw new Error('End date cannot be in the past');
            }
            return true;
        }),
    // Validate location
    body('location', 'Location is required').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Fetch user details using userid from fetchuser middleware
        const user = await User.findById(req.user.id).select('name email mobile');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { event, desc, dateFrom, dateTo, location } = req.body;

        // Format dates as 'Day Month Date Year Timezone'
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timeZoneName: 'short' };
        const formattedDateFrom = new Date(dateFrom).toLocaleDateString('en-US', options);
        const formattedDateTo = new Date(dateTo).toLocaleDateString('en-US', options);

        // Construct the formatted event date range
        const eventDateRange = `${formattedDateFrom} to ${formattedDateTo}`;

        // Create a new order document
        const newOrder = new Order({
            userid: req.user.id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            event,
            desc,
            event_date: eventDateRange,
            Location: location
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();

        // Respond with the saved order
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/fetchorder', fetchuser, checkAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.put('/updateorder/:id', fetchuser, checkAdmin, async (req, res) => {
    const { status } = req.body;
    try {
        let order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        const newOrder = {};
        newOrder.status = status;
        // Update the Order
        order = await Order.findByIdAndUpdate(req.params.id, { $set: newOrder }, { new: true });
        res.json({ success: true, order });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.post('/review/:productId', fetchuser, [
    body('rating', 'Rating is required and should be between 1 to 5').isInt({ min: 1, max: 5 }),
    body('comment', 'Comment should not be empty').isLength({ min: 1 })
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { rating, comment } = req.body;
        const productId = req.params.productId;
        const userId = req.user.id; // Assuming user ID is extracted via fetchuser middleware

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if the user has already reviewed the product
        const existingReview = await Review.findOne({ product: productId, user: userId });
        if (existingReview) {
            return res.status(400).json({ message: "User has already reviewed this product" });
        }

        // Create a new review
        const review = new Review({
            product: productId,
            user: userId,
            rating,
            comment
        });

        // Save the review
        const savedReview = await review.save();

        // Add review to the product's reviews array
        product.reviews.push(savedReview._id);

        // Update the product's average rating
        const reviews = await Review.find({ product: productId });
        const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
        product.averageRating = avgRating;

        // Save the updated product
        await product.save();
        
        res.json(savedReview);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.put('/admin/order/:id', [
    fetchuser,
    checkAdmin,  // Middleware to check if the user is an admin
    // Validate the assignedPersons array
    body('assignedPersons').optional().isArray().withMessage('Assigned persons should be an array'),
    body('assignedPersons.*.name', 'Person name is required').optional().notEmpty(),
    body('assignedPersons.*.role', 'Person role is required').optional().notEmpty(),
], async (req, res) => {
    console.log('Request Params:', req.params);
    console.log('Request Body:', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Fetch the order using the ID from the URL
        const orderId = req.params.id;
        let order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Update order fields if provided in the request
        const { assignedPersons } = req.body;
        // If assignedPersons are provided, update them
        if (assignedPersons && assignedPersons.length > 0) {
            order.assignedPersons = assignedPersons;  // This will replace the existing array of assigned persons
        }

        // Save the updated order
        const updatedOrder = await order.save();

        // Respond with the updated order
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API to remove a person from the assignedPersons array by ID
router.delete('/admin/order/assigndelete/:id/:personId', [
    fetchuser,
    checkAdmin,  // Middleware to check if the user is an admin
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Fetch the order using the ID from the URL
        const orderId = req.params.id;
        const personId = req.params.personId;

        // Ensure personId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(personId)) {
            return res.status(400).json({ error: 'Invalid person ID' });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Find the person by their ID and remove them
        const updatedPersons = order.assignedPersons.filter(person => person._id.toString() !== personId);

        // If the person with the given ID doesn't exist, return an error
        if (updatedPersons.length === order.assignedPersons.length) {
            return res.status(404).json({ error: 'Person not found with the given ID' });
        }

        // Update the assignedPersons array
        order.assignedPersons = updatedPersons;

        // Save the updated order
        const updatedOrder = await order.save();

        // Respond with the updated order
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;