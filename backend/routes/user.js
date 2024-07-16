// backend/routes/user.js
const express = require('express');
const {signupware,existingUser,signinware, updateWare, authMiddleware} = require('../middleware.js')
const { UserLogin,UserTran } =  require('../con_fig/db.js')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../con_fig/config.js");


router.post("/signup",signupware,existingUser,async function (req, res) {
    const FirstName  = req.body.FirstName
    const LastName = req.body.LastName
    const Email = req.body.Email
    const Password = req.body.Password
    bcrypt.hash(Password, 10, async (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
        }
    const a = await UserLogin.create({
        FirstName,
        LastName,
        Email,
        Password:hash
    })
    //also intialize the balance from 0-10000 randomly
    const b = await UserTran.create({
        userId : a._id,
        balance : Math.floor(Math.random() * 10000)
    })
    if(a){
        const userID = a._id;//object id in mongo
        const token = jwt.sign({userID},JWT_SECRET);
        res.status(200).json({
            msg:"User Created",
            token : token
        })
    }
    else{
        res.status(411).json({msg:"failed to create"})
    }
});

})


router.post("/signin",signinware,async (req,res,next) => {
    const payload = req.body
    // console.log(payload)
    const  ExistUser  = await UserLogin.findOne({Email:payload.Email})
    // console.log(ExistUser)
    if(!ExistUser){
        res.status(404).json({msg : "User not found"})
    }
    else{
        const pwd = ExistUser.Password
        // console.log(pwd);
       
        const pwdMatch = await bcrypt.compare(payload.Password,pwd)
        // console.log(pwdMatch);
        if(!pwdMatch){
            return res.status(404).json({ message: ' Incorrect Password'});
        }
        else{
            const token = jwt.sign({ 
                userId : ExistUser._id
            },JWT_SECRET);
    
    
            res.json({ token: token ,message : "sign in  successfull"});
            next();
            return;
            
        }
    }
    
})



router.put("/UpdateDetails",updateWare,authMiddleware, async (req, res) => {
    
        // console.log(payload)
    // const  ExistUser  = await UserLogin.findOne({Email:payload.Email})
    if(req.body){
        if(req.body.Password){
            bcrypt.hash(req.body.Password,10,async (err,hash) => {
                if(err){
                    console.log('Error hashing password :',err);
                }
                // console.log(req.body)
                req.body.Password = hash
                // // console.log(req.body);
                // console.log(req.userID)

	            const a = await UserLogin.updateOne({ _id:req.userID }, req.body);
               
                if(a){
                    res.status(200).json({
                        message: "Updated successfully"
                    })
                }
                else{
                    res.status(411).json({msg:"failed to create"})
                }
            })
            
        }
    }
	
   
})


router.delete("/UserDelete",authMiddleware,async (req,res) =>{
    await UserLogin.deleteOne({_id:req.userID})
    res.status(411).json({msg:"deleted successfully"})
})
 


router.get("/UserDetails",async(req,res) =>{
    const filter = req.query.filter || "";
    // console.log(filter)

    const regexFilter = new RegExp(`^${filter}`,"i");
    const users = await UserLogin.find({
        $or: [{
            FirstName: {$regex : regexFilter}
        }, {

            LastName: {$regex : regexFilter}
        }]
    })
    // console.log(users);
    res.json({
        user: users.map(user => ({
            Email : user.Email,
            FirstName: user.FirstName,
            LastName: user.LastName,
            _id: user._id
        }))
    })
})







module.exports = router;