import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './Navbar.css';
import { MoonLoader } from "react-spinners";

const Navbar = () => {
    const nevigate = useNavigate();
    let [loginStatus, setLoginStatus] = useState();
    let location = useLocation();
    let [loading, setLoading] = useState(true);


    // check for notification
    const toastId2 = 'toastId-2';
    const toastId3 = 'toastId-3';
    // console.log(location.state);



    useEffect(() => {
        setLoading(false);
        console.log('Navigating', location.state);
        const token = localStorage.getItem('token');
        if (token) {
            setLoginStatus(true)
        } else {
            setLoginStatus(false)
        }

        if (location.state && location.state.showToast) {
            if (location.state.toastType == 'success') {
                toast.success(location.state.toastMessage, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    toastId: toastId2
                });
            }

            if (location.state.toastType == 'error') {
                toast.error(location.state.toastMessage, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    toastId: toastId3
                });
            }

            window.history.replaceState({}, document.title)
        }

        // setTimeout(() => {
        //     setLoading(false)
        // },500)

    }, [nevigate, location, location.state]);


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
                toast.dismiss(toastId2);
                nevigate('/login', {
                    state: {
                        showToast: true,
                        toastMessage: 'Logout successfully',
                        toastType: 'success'
                    }
                });
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
             {/* loading state */}
             {
                loading &&
                <div className='loader_overlay'>
                    <MoonLoader
                        color={'#C86A83'}
                        loading={loading}
                        size={80}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            }
            <header className="w-full text-gray-600 body-font bg-light shadow-md mb-3.5 bg-rose-100">
                <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
                    <Link to={loginStatus ? '/' : '/login'} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <span className="ml-3 text-xl">
                        <img src="./vipapiport.png" className="logo" />
                            ipapiport
                        </span>
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
                        <Link to={'/login'} className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Login
                        </Link>
                    }

                    {
                        loginStatus &&
                        <button onClick={logoutHandler} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Logout
                        </button>
                    }

                </div>
            </header>
            <ToastContainer />

        </React.Fragment>
    )
}

export default Navbar;
