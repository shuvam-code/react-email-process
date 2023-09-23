import React from 'react'
import { Outlet } from 'react-router-dom';
// Components
import Navbar from '../components/Navbar/Navbar';
const Root = () => {
  return (
    <React.Fragment>
        <Navbar />
        <Outlet/>
    </React.Fragment>
  )
}

export default Root
