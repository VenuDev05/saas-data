const express = require("express");
const router = express.Router();

const Admin = require("../models/Admin");

router.post("/create-admin", async (req, res) => {
    try {
        const admin = await Admin.create(req.body);

        res.status(201).json({
            message: "Admin Created",
            admin
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;