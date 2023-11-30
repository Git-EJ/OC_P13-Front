import { NavLink } from "react-router-dom";


const Logo = () => {
  return (
    <NavLink to="/" className="main-nav-logo">
      <img
        className="main-nav-logo-image"
        src="/src/assets/img/argentBankLogo.png"
        alt="Argent Bank Logo"
      />
      <h1 className="sr-only">Argent Bank</h1>
    </NavLink>
  );
}

export default Logo;
