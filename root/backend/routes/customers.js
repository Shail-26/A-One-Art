const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser'); // Ensure the user is logged in
const checkAdmin = require('../middleware/checkAdmin'); // Ensure the user is an admin
const User = require('../models/User');

// Route: GET "/api/admin/getallusers". Admin Login Required
router.get('/getallusers', fetchuser, checkAdmin, async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Fetch all users, excluding passwords
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/getuser/:id', fetchuser, checkAdmin, async (req, res) => {
    try {
        const userId = req.params.id;
        
        // Fetch user by ID, excluding password
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});



module.exports = router;
