import React from 'react'
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const sidebarLinks = [
        {
            name: "My Family Tree",
            path: "",
        },
        {
            name: "My Medical Journey",
            path: "",
        },
        {
            name: "Famous People Like Me",
            path: "",
        },
        {
            name: "Manage Consent",
            path: "",
        },
        {
            name: "My Profile",
            path: "/my-profile",
        },
        {
            name: "Settings",
            path: "",
        },
    ];

    return (
        <aside className="bg-white w-60 h-screen shadow-md flex flex-col gap-2 fixed top-24 left-0">
            <ul className="flex flex-col gap-2">
                {sidebarLinks.map((link, index) => (
                    <li key={index} className="px-4 py-2 hover:bg-blue-200">
                        <Link to={link.path}>{link.name}</Link>
                    </li>
                ))}
            </ul>
        </aside>
    )
}
