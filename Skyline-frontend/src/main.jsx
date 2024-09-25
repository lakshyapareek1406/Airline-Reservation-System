import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './main.css'
import './styles.css';
import'./index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from "../src/Components/context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
      <App />
      </AuthContextProvider>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>
    
  </React.StrictMode>,
)
