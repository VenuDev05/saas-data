require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require("./models/User");
const Admin = require("./models/Admin");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists"
      });
    }

    const user = new User({
      username,
      password
    });

    await user.save();

    res.status(201).json({
      message: "Account Created Successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Fixed Admin
    if (
      username === "admin" &&
      password === "admin123"
    ) {
      return res.json({
        role: "admin",
        username: "admin"
      });
    }

    const user = await User.findOne({
      username,
      password
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Username or Password"
      });
    }

    res.json({
      role: "user",
      username: user.username
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB Connected');
    })
    .catch((err) => {
        console.error('❌ MongoDB Error:', err);
    });

app.get('/', (req, res) => {
    res.send('Welcome to backend!!!');
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});