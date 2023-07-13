import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router.jsx'

import './main.css'
import AuthProvider from './providers/AuthProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <React.StrictMode>
        <Router />
      </React.StrictMode>
    </AuthProvider>
  </BrowserRouter>
)
