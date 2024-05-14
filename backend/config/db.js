const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://kuldeep:simon@cluster0.ygqebfp.mongodb.net/Paytm').then(()=>console.log("connected"));

const userLoginSchema = mongoose.Schema({
    FirstName : String,
    LastName : String,
    Email : String,
    Password : String,

})
const UserLogin =mongoose.model('UserLogin',userLoginSchema);

module.exports = {
    UserLogin : UserLogin
}
