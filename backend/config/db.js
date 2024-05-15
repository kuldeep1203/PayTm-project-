const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://kuldeep:simon@cluster0.ygqebfp.mongodb.net/Paytm').then(()=>console.log("connected"));

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
    UserLogin : UserLogin,
    UserTran
}
