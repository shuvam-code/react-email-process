import React from 'react'
import ReactDOM from 'react-dom/client'
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS
import './index.css';
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
