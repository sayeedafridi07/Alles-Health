import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../services/operations/authAPI';

export default function MyProfile() {
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    const [editing, setEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        dispatch(updateUserProfile(editedUser));
        setEditing(false);
    };

    const handleCancel = () => {
        setEditing(false);
        setEditedUser({ ...user });
    };

    const handleChange = (e) => {
        setEditedUser((prevUser) => ({
            ...prevUser,
            additionalDetails: {
                ...prevUser.additionalDetails,
                [e.target.name]: e.target.value,
            },
        }));
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="bg-white shadow-sm sticky top-0 z-50 px-10">
                <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
                <div className="mb-4 flex items-center space-x-2 relative group">
                    {
                        user && (
                            <span className="text-gray-600 flex items-center justify-center font-semibold text-md bg-gray-200 rounded-full w-20 h-20 border-2 border-gray-300">
                                {user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()}
                            </span>
                        )
                    }
                </div>
                <div className="mb-4">
                    <label className="text-gray-600 mr-2">First Name:</label>
                    <span>{editedUser?.firstName}</span>
                </div>
                <div className="mb-4">
                    <label className="text-gray-600 mr-2">Last Name:</label>
                    <span>{editedUser.lastName}</span>
                </div>
                <div className="mb-4">
                    <label className="text-gray-600 mr-2">Email:</label>
                    <span>{editedUser.email}</span>
                </div>
                <div className="mb-4">
                    <label className="text-gray-600 mr-2">Gender:</label>
                    {editing ? (
                        <select
                            name="gender"
                            value={editedUser.additionalDetails?.gender || ''}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    ) : (
                        <span>{editedUser.additionalDetails?.gender || 'Not specified'}</span>
                    )}
                </div>

                <div className="mb-4">
                    <label className="text-gray-600 mr-2">Date of Birth:</label>
                    {editing ? (
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={editedUser.additionalDetails?.dateOfBirth || ''}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    ) : (
                        <span>{editedUser.additionalDetails?.dateOfBirth || 'Not specified'}</span>
                    )}
                </div>
                <div className="mb-4">
                    <label className="text-gray-600 mr-2">Contact Number:</label>
                    {editing ? (
                        <input
                            type="tel"
                            name="contactNumber"
                            value={editedUser.additionalDetails?.contactNumber || ''}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    ) : (
                        <span>{editedUser.additionalDetails?.contactNumber || 'Not specified'}</span>
                    )}
                </div>
                <div className="mb-4">
                    <label className="text-gray-600 mr-2">About:</label>
                    {editing ? (
                        <textarea
                            type="text"
                            name="about"
                            value={editedUser.additionalDetails?.about || ''}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    ) : (
                        <span>{editedUser.additionalDetails?.about || 'Not specified'}</span>
                    )}
                </div>
                {editing ? (
                    <div className="flex justify-end">
                        <button
                            onClick={handleSave}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleEdit}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
}
