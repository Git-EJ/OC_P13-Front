import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <NavLink to="/" className="main-nav-logo_container">
      <span className="main-nav-logo_text1">ARGENT</span>
      <span className="main-nav-logo_text2">BANK</span>
      <h1 className="sr-only">Argent Bank</h1>
    </NavLink>
  );
};

export default Logo;
