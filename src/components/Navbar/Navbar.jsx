import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const nevigate = useNavigate();
    let [loginStatus, setLoginStatus] = useState();
    let location = useLocation();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoginStatus(true)
        } else {
            setLoginStatus(false)
        }
    }, [setLoginStatus, location, nevigate]);


    const logoutHandler = async () => {
        try {
            const formData = new FormData();
            const token = localStorage.getItem('token');
            formData.append('token', token)
            const resp = await axios.post(`${import.meta.env.VITE_API}/logout`, { formData }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // console.log('Response == ', resp.data);
            if (resp.data) {
                localStorage.removeItem('token');
                nevigate('/login');
            }
        } catch (error) {
            // console.log('error == ', error);
            if (error) {
                localStorage.removeItem('token');
                nevigate('/login');
            }
        }
    }


    return (
        <React.Fragment>
            <header className="w-full text-gray-600 body-font bg-light shadow-md mb-3.5 bg-rose-100">
                <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
                    <Link to={loginStatus ? '/' : '/login'} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <span className="ml-3 text-xl">Process Emails</span>
                    </Link>
                    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
                        {
                            loginStatus &&
                            <>
                                <NavLink to={'/'} className="mr-5 hover:text-gray-900">All Jobs</NavLink>
                                <NavLink to={'/create-job'} className="mr-5 hover:text-gray-900">Create Job</NavLink>
                            </>
                        }
                    </nav>
                    {
                        !loginStatus &&
                        <Link to={'/login'} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Login
                        </Link>
                    }

                    {
                        loginStatus &&
                        <button onClick={logoutHandler} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Logout
                        </button>
                    }

                </div>
            </header>
        </React.Fragment>
    )
}

export default Navbar;
