const express = require("express")
const router = express.Router();
const mongoose = require("mongoose");
const { Account } = require("../db")
const { authMiddleware } = require("../middleware");


router.get('/balance', authMiddleware, async (req, res) => {
    const account = await Account.findOne({ userId: req.userId })
    res.json({
        balance: account.balance
    })
})



router.post('/transfer', authMiddleware, async (req, res) => {

    const session = await mongoose.startSession();

    session.startTransaction();

    const account = await Account.findOne({ userId: req.userId }).session(session)
    const toAccount = await Account.findOne({ userId: req.body.to }).session(session)

    //toAccount check
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account!"
        })
    }

    //balance check
    if (req.body.amount > account.balance) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance!"
        })
    }


    await Account.updateOne({ userId: req.userId }, {
        $inc: {
            balance: -req.body.amount
        }
    }).session(session)

    await Account.updateOne({ userId: req.body.to }, {
        $inc: {
            balance: req.body.amount
        }
    }).session(session)

    await session.commitTransaction();
    await session.endSession();
    res.json({
        message: "Transfer successful"
    })

})
module.exports = router;