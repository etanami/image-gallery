import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import Home from './pages/Home/Home.jsx'
import Login from './components/Login.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import { Auth0Provider } from '@auth0/auth0-react'
import Auth0Config from '../auth0-config.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage /> 
  },
  {
    path: 'login',
    element: <Login />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={Auth0Config.domain}
    clientId={Auth0Config.clientId}
    redirectUri={Auth0Config.redirectUri}
  >
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Auth0Provider>
)
