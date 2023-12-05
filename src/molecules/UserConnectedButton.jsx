import { NavLink } from "react-router-dom"
import CircleUSerIcon from "../assets/svg/CircleUserIcon"
import ArrowRightFromBracketIcon from "../assets/svg/ArrowRightFromBracketIcon"


const UserConnectedButton = () => {

  //DEV Mocked data
  const firstName = "Tony"

  return (
    <div className="main-nav-item_container">
      <NavLink to="/user/" className="main-nav-item_contents">
        <CircleUSerIcon />
        {firstName}
      </NavLink>
      {/* TODO logout clear token from localStorage when not remember me*/}
      <NavLink to="/" className="main-nav-item_contents">
        <ArrowRightFromBracketIcon />
        Sign Out
      </NavLink>
    </div>  
  )
}

export default UserConnectedButton