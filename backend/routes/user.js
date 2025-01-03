const express = require("express");
const router = express.Router();
const zod = require("zod")
const jwt = require("jsonwebtoken")
const { User, Account } = require("../db")
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const signUpSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

router.post('/signup', async (req, res) => {
    //Zod Validation
    const result = signUpSchema.safeParse(req.body);
    if (!result.success) {
        res.status(411).json({
            message: "Invalid inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        res.status(411).json({
            message: "Email already taken"
        })
    }

    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })

    const userId = user._id;

    await Account.create({
        userId: userId,
        balance: Math.floor(Math.random() * 10000) + 1
    })


    const token = jwt.sign({ userId }, JWT_SECRET)

    res.status(200).json({
        message: "User created successfully",
        token: token
    })

})

const signInSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post('/signin', async (req, res) => {
    const result = signInSchema.safeParse(req.body);
    if (!result.success) {
        res.status(411).json({
            message: "Invalid inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if (user) {
        const userId = user._id;
        const token = jwt.sign({ userId }, JWT_SECRET)

        res.status(200).json({
            token: token
        })

        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })


})

const updateSchema = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional()
})

router.put('/', authMiddleware, async (req, res) => {
    const result = updateSchema.safeParse(req.body);
    if (!result.success) {
        req.status(411).json({
            message: "Invalid inputs"
        })
    }

    await User.updateOne({ _id: req.userId },
        req.body
    );

    res.json({
        message: "Updates Successfully"
    })


})

router.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            {
                firstName: {
                    "$regex": filter
                }
            },
            {
                lastName: {
                    "$regex": filter
                }
            }
        ]
    })

    res.status(200).json({
        user: users.map((user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.get('/name', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findOne({
            _id: userId
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            name: user.firstName
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
})

module.exports = router;