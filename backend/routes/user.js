// backend/routes/user.js
const express = require('express');
const {signupware,existingUser,signinware, updateWare, authMiddleware} = require('C:\\Users\\kulu1\\Desktop\\Everything\\PayTmClone\\backend\\middleware.js')
const { UserLogin } =  require('C:\\Users\\kulu1\\Desktop\\Everything\\PayTmClone\\backend\\config\\db.js')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("C:\\Users\\kulu1\\Desktop\\Everything\\PaytmClone\\backend\\config\\config.js")


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
	await UserLogin.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
})

 







module.exports = router;