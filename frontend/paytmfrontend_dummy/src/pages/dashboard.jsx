import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchComponent from '../components/searchbar';
import UserListComponent from '../components/userList';
import axios from 'axios';

export default function Dashboard() {
    const [token, setToken] = useState('');
    const [balance, setBalance] = useState(0);
    const [results, setResults] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBalance(response.data.balance);
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };
        const fetchUserDetail = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:3000/api/v1/user/UserDetails", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data.currentUser);
                setResults(response.data.user);
            } catch (error) {
                console.error("Error fetching user details", error.stack);
            }
        };
        if (token) {
            fetchBalance();
            fetchUserDetail();
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token from local storage
        navigate('/signin'); // Redirect to the signin page
    };

    return (
        <div>
            <div className="p-6 bg-white min-h-screen flex flex-col justify-between">
                <div>
                    <header className="flex justify-between items-center pb-4 border-b">
                        <h1 className="text-2xl font-bold">Payments App</h1>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-600">Hello, {user ? user.FirstName : "Guest"}</span>
                            <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full text-lg font-semibold">
                                U
                            </div>
                        </div>
                    </header>

                    <div className="mt-6">
                        <div className="text-lg font-semibold">
                            Your Balance <span className="font-bold text-black">{balance}</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="text-lg font-bold">Users</div>
                        <SearchComponent className="mt-6" userDetails={results} />
                        <UserListComponent userDetails={results} />
                    </div>
                </div>

                <footer className="mt-6">
                    <button
                        onClick={handleLogout}
                        className="w-full py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg font-bold"
                    >
                        Logout
                    </button>
                </footer>
            </div>
        </div>
    );
}
