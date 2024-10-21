const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const checkAdmin = require('../middleware/checkAdmin');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
const mongoose = require('mongoose');
const Feedback = require('../models/Feedback');

router.get('/feedbacks', fetchuser, async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ userId: req.user.id });

        if (!feedbacks || feedbacks.length === 0) {
            return res.status(404).json({ msg: 'No feedbacks found' });
        }

        res.json({ feedbacks });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/feedback', fetchuser, async (req, res) => {
    try {
        const { feedbackText } = req.body;
        const userId = req.user.id; // Assuming user is authenticated and req.user is set by auth middleware

        // Check if the user has already provided feedback in the last 7 days
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const recentFeedback = await Feedback.findOne({
            userId,
            createdAt: { $gte: oneWeekAgo }
        });

        if (recentFeedback) {
            return res.status(400).json({ msg: "You can only add feedback once per week." });
        }

        // Create new feedback
        const newFeedback = new Feedback({
            userId,
            feedbackText,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });

        await newFeedback.save();
        res.status(201).json(newFeedback);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// PUT feedback route - user can edit feedback anytime
// PUT route - user can update their feedback, but only if it hasn't been deleted
router.put('/feedback/:id', fetchuser, async (req, res) => {
    try {
        const { feedbackText } = req.body;
        const userId = req.user.id;
        const feedbackId = req.params.id;

        // Find the feedback by ID and user ID
        let feedback = await Feedback.findOne({ _id: feedbackId, userId });

        if (!feedback) {
            return res.status(404).json({ msg: "Feedback not found" });
        }

        // Check if the feedback has been deleted
        if (feedback.deletedAt) {
            return res.status(400).json({ msg: "Cannot update feedback after it has been deleted." });
        }

        // Update feedback text and updated timestamp
        feedback.feedbackText = feedbackText;
        feedback.updatedAt = Date.now();

        await feedback.save();
        res.status(200).json({ msg: 'Feedback updated successfully', feedback });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.delete('/feedback/:id', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const feedbackId = req.params.id;

        // Check if the feedback exists and is by the same user
        let feedback = await Feedback.findOne({ _id: feedbackId, userId });

        if (!feedback) {
            return res.status(404).json({ msg: "Feedback not found" });
        }

        // Soft delete the feedback by setting deletedAt
        feedback.deletedAt = Date.now();

        await feedback.save();
        res.status(200).json({ msg: 'Feedback deleted successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/admin/feedbacks', fetchuser, checkAdmin, async (req, res) => {
    try {
        // Fetch all feedbacks
        const feedbacks = await Feedback.find().populate('userId', 'name email');
        
        // Return feedback data
        res.status(200).json({ feedbacks });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
