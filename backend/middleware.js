/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// eslint-disable-next-line no-undef
const { signup, sigin, updateBody } = require('./types');
const { UserLogin } =  require('./con_fig/db');
const { JWT_SECRET } = require('./con_fig/config');
const jwt = require("jsonwebtoken");




function signupware(req, res, next) {
    const payload = req.body;
    // console.log(payload);
    try{
        signup.parse(payload);
        next()
    }catch(err){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }  
}


async function existingUser (req, res, next){
    const payload = req.body
    const ExistUser = await UserLogin.findOne({ Email : payload.Email})

    if(ExistUser){
        return res.status(411).json({
            message : "Email already in Use"
        })
    }
    else{
        next();
    }
}


function signinware(req, res,next){
    const payload =(req.body);
    try{
        sigin.parse(payload);
        
        next();
    }catch(err){
        console.log(err)
        return res.status(411).json({
            message :  "Invalid Email  or Password"
        })
    }
}

// async function authenticate(req, res, next){

    


// }



const authMiddleware = async(req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({msg :"no token "});
    }

    const token = authHeader.split(' ')[1];
    console.log(token);
    // console.log(JWT_SECRET)
    
    try {
        const decoded =jwt.verify(token, JWT_SECRET);
        //console.log(decoded);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.log(err)
        return res.status(403).json({msg :"Session Expired "});
    }
};

function updateWare(req,res,next) {
    const payload  = req.body
    try{
        updateBody.parse(payload);
        next();
    }
    catch(err){
        res.status(411)({msg:"wrong input"});
    }
}


module.exports= {
    signupware: signupware,
    existingUser : existingUser,
    signinware : signinware,
    authMiddleware,
    updateWare:updateWare
}