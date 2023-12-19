import { RouterProvider } from "react-router-dom"
import { useSelector } from "react-redux"
import isAuthRouter from "./router/Router"
import publicRouter from "./router/PublicRouter"
import { useEffect } from "react"


function App() {

//TODO secured route for public/private route
  const isAuth = useSelector(state => state.auth.isAuth) || localStorage.getItem('isAuth')
  useEffect(() => {
    console.log('%c isAuth: ', 'color:red', isAuth)
  }, [isAuth])


  return (
    isAuth ? (
      <RouterProvider router={ isAuthRouter } />
    ) : (
      <RouterProvider router={ publicRouter } />
    )
  )
}

export default App
