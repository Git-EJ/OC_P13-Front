import { RouterProvider } from "react-router-dom"
import Router from "./router/Router"


function App() {

 const  isAuthRouter  = Router()
  
 return <RouterProvider router={ isAuthRouter } />

}

export default App
