const mongoose = require('mongoose');
const en = require('dotenv')

en.config()
// console.log(process.env.PATH)
mongoose.connect(process.env.URI).then(()=>console.log("connected"));

const userLoginSchema = mongoose.Schema({
    FirstName : String,
    LastName : String,
    Email : String,
    Password : String,

})

const UserTransaction = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "UserLogin",
        required : true
    },
    balance: { 
        type :Number,
        required : true,
        default : 0
    }
})


const UserLogin =mongoose.model('UserLogin',userLoginSchema);
const UserTran = mongoose.model('UserTran',UserTransaction);

module.exports = {
    UserLogin,
    UserTran
}
