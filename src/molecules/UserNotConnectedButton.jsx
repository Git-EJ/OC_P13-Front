import { NavLink } from "react-router-dom"
import CircleUSerIcon from "../assets/svg/CircleUserIcon";


const NotConnectedButton = () => {
  return (
    <>
      <NavLink to="/sign-in" className="main-nav-item_contents">
        <CircleUSerIcon />
        Sign In
      </NavLink>
    </>
  )
}

export default NotConnectedButton

  