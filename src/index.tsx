import { GeistProvider, CssBaseline } from '@geist-ui/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App, { loader as loaderApp } from './App'
import reportWebVitals from './reportWebVitals'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import { Login } from './pages/login/Login'
import './firebase/firebase.config'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    index: true,
  },
  {
    path: '/home',
    element: <App />,
    loader: loaderApp,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GeistProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </GeistProvider>
    </Provider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
