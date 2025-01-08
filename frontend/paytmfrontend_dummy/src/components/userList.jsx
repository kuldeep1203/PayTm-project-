import { useState } from "react";
import Modal from "./paymentcard"; // Import the modal component

export default function UserListComponent({ userDetails }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [friendDetails,setfriendDetails]=useState(null);
    const openModal = (user) => {
        setfriendDetails(user)
        setIsModalOpen(true);
    }
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="mt-6">
            {userDetails && userDetails.length > 0 ? (
                <ul>
                    {userDetails.map((user) => (
                        <li
                            key={user._id}
                            className="flex justify-between items-center p-2 border-b"
                        >
                            <div>
                                <p className="text-lg font-semibold">{user.FirstName} {user.LastName}</p>
                                <p className="text-sm text-gray-600">{user.Email}</p>
                            </div>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={()=>openModal(user)} 
                            >
                                Send
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">No users found.</p>
            )}

         
            <Modal isOpen={isModalOpen} closeModal={closeModal} userDetail={friendDetails} />
        </div>
    );
}
