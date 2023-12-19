
import { Navigate, createBrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import Home from '../pages/home';
import SignIn from '../pages/SignIn';
import User from '../pages/User';
import Error from '../pages/Error';
import UserTransactions from '../organisms/UserTransactions';


const SecuredRoute = ({ children, isAuth }) => {
  return isAuth ? children : <Navigate to="/sign-in" />
}

const Router = () => {
  const isAuthRedux = useSelector(state => state.auth.isAuth)
  const isAuthLocalStorageExists = localStorage.getItem('isAuth') !== null
  const isAuth = isAuthRedux !== undefined && isAuthRedux !== null ? isAuthRedux : isAuthLocalStorageExists

  const isAuthRouter = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/error/:errorCode", element: <Error /> },
    { path: "/*", element: <Navigate to="/" /> },
    { path: "*", element: <Error /> },

    {
      path: "/user",
      element: (
        <SecuredRoute isAuth={isAuth}>
          <User />
        </SecuredRoute>
      ),
    },
    {
      path: "/user/transactions",
      element: (
        <SecuredRoute isAuth={isAuth}>
          <UserTransactions />
        </SecuredRoute>
      ),
    },
  ])

  return isAuthRouter
}

SecuredRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isAuth: PropTypes.bool.isRequired,
}

export default Router
