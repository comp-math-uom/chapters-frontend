// components/Navbar.jsx
"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function Navbar() {
  const [username, setUsername] = useState();
  const [profilePic, setProfilePic] = useState();

  useEffect(() => {
    let un = localStorage.getItem("username");
    let pp = "https://via.placeholder.com/150"; 
    setUsername(un);
    setProfilePic(pp);
  }, []);

  return (
    <div className="flex items-center justify-between p-5">
      <div>
        <h1 className="m-0 text-3xl font-impact">CHAPTERS</h1>
      </div>
      <div className="flex items-center gap-5">
        {username ? (
          <div className="flex items-center gap-2">
            <p className="text-base text-black text-decoration-none">{username}</p>
            {profilePic && (
              <img
                src={profilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            )}
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link href="/Signin" className="hover:underline">Sign In</Link>
            <Link href="#" className="hover:underline">Sign Up</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
