import React from 'react'
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <React.Fragment>
            <header className="w-full text-gray-600 body-font bg-light shadow-md mb-3.5 bg-rose-100">
                <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
                    <Link to={'/'} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <span className="ml-3 text-xl">Process Emails</span>
                    </Link>
                    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                        <NavLink activeClassName={'active'} to={'/'}  className="mr-5 hover:text-gray-900">All Jobs</NavLink>
                        <NavLink activeClassName={'active'} to={'/create-job'} className="mr-5 hover:text-gray-900">Create Job</NavLink>
                    </nav>
                    <Link to={'/login'} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Login
                    </Link>
                </div>
            </header>
        </React.Fragment>
    )
}

export default Navbar;
