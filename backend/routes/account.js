const express = require('express');
const router = express.Router();
const { UserTran } = require("../con_fig/db");

router.get("/balance", async (req, res) => { //need to add auth middleware
    const a = await UserTran.findOne({ userId: req.userId });
    if (a) {
        res.status(200).json({ balance: a.balance })
    }
    else {
        res.status(404).json({ msg: "User not found" })
    }
});






module.exports = router;