import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import SignIn from "../pages/SignIn";
import User from "../pages/User";
import Error from "../pages/Error";


const Router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/user/:id", element: <User />},
  { path: "/error/:errorCode", element: <Error /> },
  { path: "*", element: <Error /> },
])

export default Router