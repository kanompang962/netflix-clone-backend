const jwt = require('jsonwebtoken');
const expressjwt = require("express-jwt");
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        User.create({ name, email, password: hash }, (err, data) => {
            if (err) {
                return res.status(400).json({ error: 'Register failed' });
            }
            res.json(data);
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    User.findOne({ email }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }
            if (result) {
                // Passwords match, authentication successful
                // Add token 
                const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
                res.json({ token, email });
            } else {
                // Passwords don't match, authentication failed
                res.status(401).json({ error: 'Authentication failed' });
            }
        });
    });
};

