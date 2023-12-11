import { NavLink } from "react-router-dom"
import CircleUSerIcon from "../assets/svg/CircleUserIcon"
import ArrowRightFromBracketIcon from "../assets/svg/ArrowRightFromBracketIcon"
import { useDispatch, useSelector } from "react-redux"
import { clearToken } from "../rtk/slices/authSlice"
import { useEffect, useState } from "react"


const UserButtons = () => {

  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.isAuth) || localStorage.getItem('isAuth')
  const firstName = useSelector(state => state.auth.userFirstName) || localStorage.getItem('userFirstName')
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    console.log('%c userButtons firstName: ', 'color:lime', firstName)
    if (firstName) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [firstName, isAuth, setIsLoading])


  const signOut = () => {
    localStorage.clear()
    dispatch(clearToken())
    setIsLoading(false)
  }

  
  return (
    <>
      { isAuth ? (
        <div className="main-nav-item_container">
          <NavLink to="/user/" className="main-nav-item_contents">
            <CircleUSerIcon />
            {isLoading ? 'Loading...' : firstName}
          </NavLink>

          <NavLink to="/" className="main-nav-item_contents" onClick={signOut}>
            <ArrowRightFromBracketIcon />
            Sign Out
          </NavLink>
        </div>

      ) : (

        <NavLink to="/sign-in" className="main-nav-item_contents">
          <CircleUSerIcon />
          Sign In
        </NavLink>
      )}
    </>
  )
}

export default UserButtons
