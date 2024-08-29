const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Order = require('../models/Order');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

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

module.exports = router;
