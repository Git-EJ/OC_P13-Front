import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import SignIn from "../pages/SignIn";
import Error from "../pages/Error";

const publicRouter = createBrowserRouter([
  { path: "/*", element: <Navigate to="/" />},
  { path: "/", element: <Home /> },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/error/:errorCode", element: <Error /> },
  { path: "*", element: <Error /> },
])

export default publicRouter