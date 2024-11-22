const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const checkAdmin = require('../middleware/checkAdmin');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
const mongoose = require('mongoose');
const Feedback = require('../models/Feedback');
const nodemailer = require('nodemailer');
require('dotenv').config();

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

router.post('/send-email', fetchuser, async (req, res) => {
    const { email, message } = req.body;

    if (!email || !message) {
        return res.status(400).json({ msg: 'Email and message are required' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE, // or use other email providers
            auth: {
                user: process.env.EMAIL_NODEMAILER, // Replace with your email
                pass: process.env.EMAIL_PASSKEY, // Replace with your email password or app-specific password
            },
        });

        const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="text-align: center; color: #4CAF50;">Thank you for reaching out to us!</h2>
            <p style="font-size: 16px; line-height: 1.5; color: #555;">
                Dear User,<br><br>
                We have received your message and appreciate the time you took to share your thoughts with us.
            </p>
            <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #4CAF50;">
                <p style="font-size: 14px; color: #555;">Your Message:</p>
                <p style="font-size: 16px; color: #333; font-weight: bold;">"${message}"</p>
            </div>
            <p style="font-size: 16px; line-height: 1.5; color: #555;">
                We will get back to you soon!<br><br>
                Thank you for helping us make our platform better!
            </p>
            <div style="text-align: center; margin-top: 20px;">
                <a href="http://localhost:3000/" style="padding: 10px 20px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 4px;">Visit Us</a>
            </div>
        </div>
        `;

        const mailOptions = {
            from: 'AOneArt',
            to: email,
            subject: 'Thank You for Contacting Us',
            html: htmlContent,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ msg: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ msg: 'Failed to send email' });
    }
});



module.exports = router;
