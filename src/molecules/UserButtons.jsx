import { NavLink } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext"
import CircleUSerIcon from "../assets/svg/CircleUserIcon"
import ArrowRightFromBracketIcon from "../assets/svg/ArrowRightFromBracketIcon"
import { useDispatch, useSelector } from "react-redux"
import { clearToken } from "../rtk/slices/authSlice"


const UserButtons = () => {

  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token) || localStorage.getItem('token')
  const { user, setUser } = useContext(UserContext)
  const [firstName, setFirstName] = useState(null)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
  
    if (user && user.firstName) {
      setIsLoading(false)
      setFirstName(user.firstName)
    } else {
      setIsLoading(true)
    }
  }, [user, firstName, token, setFirstName, setIsLoading])
  

  const signOut = () => {
    localStorage.clear()
    dispatch(clearToken())
    setIsLoading(false)
    setUser(null)
    setFirstName(null)
  }

  
  
  return (
    <>
      { token ? ( //TODO isAuth????
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
