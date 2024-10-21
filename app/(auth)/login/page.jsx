"use client";
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

function Page() {
    const router = useRouter();
    const username = useRef(null);
    const password = useRef(null);

    const [user, setUser] = useState("");
    const [loginAttempted, setLoginAttempted] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);

    const login = () => {
        const eusername = username.current.value;
        const epassword = password.current.value;

        setLoginAttempted(true);

        if (eusername === 'UOM' && epassword === '1234') {
            localStorage.setItem("username", eusername);
            setUser(eusername);
            setLoginSuccess(true);
            router.push('/');
        } else {
            setUser("");
            setLoginSuccess(false);
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between p-5">
                <div>
                    <h1 className='m-0 text-3xl font-impact'>CHAPTERS</h1>
                </div>
                <div className="flex space-x-4 ">
                    <h2>
                        {user ? user : " "}
                    </h2>
                </div>
            </div>

            <form className='flex flex-col items-center p-8 bg-white rounded'>
                <label className='items-center'>Username :</label>
                <input ref={username} type="text" placeholder=" Username" />
                <br />
                <br />
                <label>Password :</label>
                <input ref={password} type="password" placeholder=" Password" />
                <br />
                <br />
                <button className="px-4 py-2 text-white bg-blue-500 rounded" type="button" onClick={login}>Login</button>
            </form>

            {loginAttempted && (
                loginSuccess ? (
                    <p className='flex flex-col items-center p-8 bg-white rounded'>Login successful!</p>
                ) : (
                    <p className='flex flex-col items-center p-8 bg-white rounded'>Invalid username or password. Please try again.</p>
                )
            )}
        </div>
    );
}

export default Page;
