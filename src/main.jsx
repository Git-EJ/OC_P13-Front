import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import store from './rtk/store/store.js'
import UserContextProvider from './context/UserContextProvider.jsx'
import './styles/css/style.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </Provider>
  </React.StrictMode>,
)
