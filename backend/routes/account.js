const express = require('express');
const router = express.Router();
const { UserTran } = require("../con_fig/db");
const { authMiddleware } = require('../middleware');
const mongoose = require('mongoose');

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const userAccount = await UserTran.findOne({ userId: req.userId });
        if (userAccount) {
            res.status(200).json({ balance: userAccount.balance });
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
});

router.post("/transferBalance", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const { to, amount } = req.body;
        const from = req.userId;

        const senderAccount = await UserTran.findOne({ userId: from }).session(session);
        if (!senderAccount) {
            await session.abortTransaction();
            return res.status(404).json({ msg: "Sender account not found" });
        }

        if (senderAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(411).json({ msg: "Insufficient Balance", balance: senderAccount.balance });
        }

        const recipientAccount = await UserTran.findOne({ userId: to }).session(session);
        if (!recipientAccount) {
            await session.abortTransaction();
            return res.status(404).json({ msg: "Recipient account not found" });
        }

        await UserTran.updateOne({ userId: from }, { $inc: { balance: -amount } }).session(session);
        await UserTran.updateOne({ _id: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        res.status(200).json({ message: "Transfer successful" });
    } catch (err) {
        console.error(err);
        await session.abortTransaction();
        res.status(500).json({ msg: "Transfer failed due to an internal error" });
    } finally {
        session.endSession();
    }
});

module.exports = router;
