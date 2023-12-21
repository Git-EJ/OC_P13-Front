import Logo from "../atoms/Logo";
import PropTypes from "prop-types";

const TopBar = ({ children }) => {
  return (
    <nav className="main-nav">
      <Logo />
      {children}
    </nav>
  );
};

TopBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TopBar;
