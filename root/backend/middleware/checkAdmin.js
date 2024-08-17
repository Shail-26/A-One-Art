// middleware/checkAdmin.js
const Admin = require('../models/Admin');

const checkAdmin = async (req, res, next) => {
    try {
        const user = await Admin.findById(req.user.id);
        if (user && user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ error: "Access denied. Admins only." });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = checkAdmin;
