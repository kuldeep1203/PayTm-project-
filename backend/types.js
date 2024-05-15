const zod = require('zod');

// const signup = zod.object({
//     FirstName: zod.string().refine(value => value.trim() !== '', { 
//         message: 'First name cannot be empty' 
//     }),
//     LastName: zod.string().refine(value => value.trim() !== '', { 
//         message: 'Last name cannot be empty' 
//     }),
//     Email: zod.string().email().refine(email => email.trim() !== '', { 
//         message: 'invalid email address'  
//     }),
//     password: zod.string().min(8).superRefine(password => {
//         // Check if the password contains at least one lowercase letter, one uppercase letter, one digit, and one special character
//         return (
//             /[A-Z]/.test(password) &&
//             /[a-z]/.test(password) &&
//             /[0-9]/.test(password) &&
//             /[^a-zA-Z0-9]/.test(password)
//         );
//     }, {
//         message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
//     })
// });
const signup = zod.object({
    FirstName: zod.string(),
    LastName: zod.string(),
    Email: zod.string().email(),
    Password: zod.string().min(8)
});


const signin = zod.object({
    Email : zod.string().email(),
    Password: zod.string().min(8)
})

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});




module.exports = {
    signup: signup,
    sigin : signin,
    updateBody: updateBody
};
