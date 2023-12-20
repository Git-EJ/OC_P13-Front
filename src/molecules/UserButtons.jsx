import { NavLink, useNavigate } from "react-router-dom"
import CircleUSerIcon from "../assets/svg/CircleUserIcon"
import ArrowRightFromBracketIcon from "../assets/svg/ArrowRightFromBracketIcon"
import { useDispatch, useSelector } from "react-redux"
import { clearRemember, clearToken } from "../rtk/slices/authSlice"
import { useCallback, useEffect, useState } from "react"


const UserButtons = () => {

  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.isAuth) || localStorage.getItem('isAuth')
  const firstName = useSelector(state => state.auth.userFirstName) || localStorage.getItem('userFirstName')
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()


  useEffect(() => {
    console.log('%c userButtons firstName: ', 'color:orangered', firstName)
    console.log('%c userButtons isAuth: ', 'color:orangered', isAuth)
    if (firstName) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [firstName, isAuth, setIsLoading])


  const signOut = useCallback(() => {
    localStorage.clear()
    dispatch(clearToken())
    dispatch(clearRemember())
    setIsLoading(false)
    navigate ('/')
  },[dispatch, setIsLoading, navigate])

  
  return (
    <>
      { isAuth ? (
        <div className="main-nav-item_container">
          <NavLink to="/user/" className="main-nav-item_contents">
            <CircleUSerIcon />
            {isLoading ? 'Loading...' : firstName}
          </NavLink>

          <div className="main-nav-item_contents" onClick={signOut}>
            <ArrowRightFromBracketIcon />
            Sign Out
          </div>
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
