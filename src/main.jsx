import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { myRouter } from './App'
import './index.css'
import { Provider } from 'react-redux'
import Store from './utils/Store'
import { RouterProvider } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(


    <RouterProvider router={myRouter}/>
    // <ButtonCarousal />

)

