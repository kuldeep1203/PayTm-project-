import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();  
    const handleSubmit = async(event)=>{
        event.preventDefault(); // prevents default submission of the form 
        try {
            await axios.post('http://127.0.0.1:3000/api/v1/user/signin',{
                "Email": email,
                "Password": password

            })
            alert('Signin Successful! ');
            setTimeout(()=>{
                history('/Dashboard');
            },500)
        }
        catch (error) {
            if (error.response && error.response.data.message === "Invalid Email  or Password") {
                alert('Invalid Email or Password');
            } else {
                console.log(error);
            }  
        }
    }   

    return (
        <div>
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-5 text-center">Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                            <input
                                type="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                                placeholder="sample@outlook.com"
                                required
                                value ={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                            <input
                                type="password"
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                                required
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-start mb-5">
                            <div className="flex items-center h-5">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-gray-300"
                                    required
                                />
                            </div>
                            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900">Remember me</label>
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Submit
                        </button >
                    </form>
                </div>
            </div>    
        </div>
    )
}