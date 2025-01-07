const express = require('express');
const router = express.Router();
const { UserTran } = require("../con_fig/db");
const { authMiddleware } = require('../middleware');
const mongoose = require('mongoose');   

router.get("/balance",authMiddleware ,async (req, res) => { 
    try{
        //console.log(req.userId)
        const a = await UserTran.findOne({ userId: req.userId });
        if (a) {
            res.status(200).json({ balance: a.balance })
        }
        else {
            res.status(404).json({ msg: "User not found" })
        }
    }
    catch(err){
        console.error(err);
    }
});

router.post("/transferBalance",authMiddleware,async (req,res)=>{
    
    const Session = await mongoose.startSession();
    Session.startTransaction();
    const { to, amount } = req.body;
    const from = req.userID;
    const senderAccount = await UserTran.findOne({userId : from}).session(Session);

   
    if(senderAccount.balance < amount){
        await Session.abortTransaction();   
        res.status(411).json({msg:"Insufficient Balance" , balance:senderAccount.balance});
    }
    try{
        await UserTran.updateOne({userId:from},{$inc:{balance:-amount}}).session(Session);
        await UserTran.updateOne({userId:to},{$inc:{balance:amount}}).session(Session);
    }
    catch(err){
        await Session.abortTransaction();
        console.error(err);  
    }
    await Session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
})






module.exports = router;