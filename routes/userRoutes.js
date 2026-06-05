const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/register", async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json({
            message: "User Registered",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;