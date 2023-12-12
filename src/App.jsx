import { RouterProvider } from "react-router-dom"
import { useSelector } from "react-redux"
import isAuthRouter from "./router/Router"
import publicRouter from "./router/PublicRouter"


function App() {

  const isAuth = useSelector(state => state.auth.isAuth) || localStorage.getItem('isAuth')

  return (
    isAuth ? (
      <RouterProvider router={ isAuthRouter } />
    ) : (
      <RouterProvider router={ publicRouter } />
    )
  )
}

export default App
