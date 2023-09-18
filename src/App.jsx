import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Pages
import Protected from './pages/Protected';
import Guest from './pages/Guest';
import RootLayout from './pages/Root';
import Dashboard from './pages/Dashboard';
import Job from './pages/Job';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path:'/',
    element:<RootLayout/>,
    children:[
      {
        index:true,
        element:<Protected Component={Dashboard} />
      },
      {
        path:'/create-job',
        element:<Protected Component={Job} />
      },
      {
        path:'/login',
        element:<Guest Component={Login} />
      }
    ]
  }
])


function App() {
  return (
    <React.Fragment>
      <RouterProvider router={router}></RouterProvider>
    </React.Fragment>
  )
}

export default App
