import React from 'react'
import ReactDOM from 'react-dom/client'
import UserContextProvider from './context/UserContextProvider.jsx'
import App from './App.jsx'
import './styles/css/style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
)
