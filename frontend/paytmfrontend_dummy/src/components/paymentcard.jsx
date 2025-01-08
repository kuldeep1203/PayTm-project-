import React, { useState } from 'react';
import axios from 'axios';
const Modal = ({ isOpen, closeModal, userDetail }) => {
    if (!isOpen) return null; 
    const [amount,setAmount]=useState(0);
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-auto relative">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    onClick={closeModal}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <div className="mt-4 text-green-600 font-bold">
                    <p>{userDetail.FirstName + ' ' + userDetail.LastName}</p>
                </div>
                <div className="mt-4">
                    <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
                        Amount (in Rs)
                    </label>
                    <input

                        onChange={(e)=>{
                            setAmount(e.target.value);                        
                        }}

                        type="number"
                        id="amount"
                        placeholder="Enter amount"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-end items-end mt-6 space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={()=>{
                            axios.post("http://localhost:3000/api/v1/account/transferBalance",{
                                to:userDetail,
                                amount
                            },{
                                headers:{
                                    Authorization:"Bearer "+localStorage.getItem("token")
                                }
                            })
                        }}
                        >
                        Confirm
                        
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
