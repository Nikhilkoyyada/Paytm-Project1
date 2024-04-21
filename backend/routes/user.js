// backend/routes/user.js
const express = require('express');
const router = express.Router();
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");

const { authMiddleware } = require("../middleware");

// Routes
router.post("/signup", async (req, res) => {
    const { username, firstName, lastName, password } = req.body;

    if (!username|| !firstName || !lastName || !password) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.status(411).json({
            message: "Existing user"
        });
    }

    const user = await User.create({
        username,
        password,
        firstName,
        lastName,
    });

    const userId = user._id;

    await Account.create({
        userId,
        balance: (1 + Math.random() * 10000).toFixed(2)
    });

    const token = jwt.sign({ userId }, "Nikhil");

    res.json({
        message: "User created successfully",
        token: token
    });
});

router.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    if (!username  || !password) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }

    const user = await User.findOne({ username, password });

    if (user) {
        const token = jwt.sign({ userId: user._id }, "Nikhil");

        res.json({
            message:"Login successfull",
            token: token
        });
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    });
});

router.put("/", authMiddleware, async (req, res) => {
    const { password, firstName, lastName } = req.body;

    if (!(password || firstName || lastName)) {
        res.status(411).json({
            message: "Error while updating information"
        });
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.json({
        message: "Updated successfully"
    });
});

router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    const loggedInUserId=req.userId
    

    const users = await User.find({
        $and: [
            {

                $or: [
                    { firstName: { "$regex": filter } },
                    { lastName: { "$regex": filter } }
                ]
            },
            {
               
                _id: { $ne: loggedInUserId }
            }
        ]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});

module.exports = router;
