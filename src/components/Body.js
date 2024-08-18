import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter, } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

const Body = () => {
 

    const BrowserRouter =createBrowserRouter([

        {
            path:"/",
            element:<Login></Login>
        },
        {
            path:"/browse",
            element:<Browse></Browse>
        }
    ])
  

  return (
    <div>
    <RouterProvider router={BrowserRouter}></RouterProvider>
    </div>
  )
}

export default Body
