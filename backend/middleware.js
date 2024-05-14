
const { signup, sigin, updateBody } = require('C:\\Users\\kulu1\\Desktop\\Everything\\PaytmClone\\backend\\types.js');
const {UserLogin} =  require('C:\\Users\\kulu1\\Desktop\\Everything\\PayTmClone\\backend\\config\\db.js');
const { JWT_SECRET } = require("C:\\Users\\kulu1\\Desktop\\Everything\\PaytmClone\\backend\\config\\config.js");
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



const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({});
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