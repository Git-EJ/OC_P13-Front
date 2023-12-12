import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import SignIn from "../pages/SignIn";
import User from "../pages/User";
import Error from "../pages/Error";
import UserTransactions from "../organisms/UserTransactions";


const isAuthRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/user", element: <User />},
  { path: "/user/transactions", element: <UserTransactions />},
  { path: "/error/:errorCode", element: <Error /> },
  { path: "*", element: <Error /> },
])

export default isAuthRouter