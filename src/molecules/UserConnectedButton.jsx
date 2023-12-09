import { NavLink } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext"
import CircleUSerIcon from "../assets/svg/CircleUserIcon"
import ArrowRightFromBracketIcon from "../assets/svg/ArrowRightFromBracketIcon"


const UserConnectedButton = () => {

  const { user } = useContext(UserContext)
  const [firstName, setFirstName] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user && user.firstName) {
      setIsLoading(false)
      setFirstName(user.firstName)
    } else {
      setIsLoading(true)
    }
  }, [user])

  return (
    <div className="main-nav-item_container">
      <NavLink to="/user/" className="main-nav-item_contents">
        <CircleUSerIcon />
        {isLoading ? 'Loading...' : firstName}
      </NavLink>
      {/* TODO logout clear localStorage when not remember me*/}
      <NavLink to="/" className="main-nav-item_contents">
        
        <ArrowRightFromBracketIcon />
        Sign Out
      </NavLink>
    </div>  
  )
}

export default UserConnectedButton