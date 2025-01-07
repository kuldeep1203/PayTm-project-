import axios from 'axios';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
export default function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const history = useNavigate();
    const handleSubmit = async(event)=>{
        event.preventDefault(); // prevents default submission of the form 
        try {
            const response = await axios.post('http://127.0.0.1:3000/api/v1/user/signup', {
               "FirstName":firstName,
                "LastName": lastName,
                "Email": email,
                "Password": password

            });
            localStorage.setItem('token', response.data.token);

            alert('Signup Successful! Redirecting to login...');
            setTimeout(()=>{
                window.location.href = '/Dashboard';
            },2000)
            
        } catch (error) {
            if (error.response && error.response.data.message === "Email already in Use") {
                alert('User already exists');
            } else {
                console.log(error);
            }
        }
    }


    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-2 text-center">Sign Up</h2>
                <p className="mb-6 text-center text-gray-600">Enter your information to create an account</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                            placeholder="John"
                            required
                            value={firstName}
                            onChange={(e)=>setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                            placeholder="Doe"
                            required
                            value={lastName}
                            onChange={(e)=>setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                            placeholder="johndoe@example.com"
                            required
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                            required
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account? <a href="http://localhost:5173/Signin" className="text-black font-medium hover:underline">Login</a>
                </p>
            </div>
        </div>
    )
}