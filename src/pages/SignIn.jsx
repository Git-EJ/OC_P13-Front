import { NavLink } from "react-router-dom";
import CircleUSerIcon from "../assets/svg/CircleUserIcon";
import TopBar from "../organisms/TopBar";
import NotConnectedButton from "../molecules/UserNotConnectedButton";
import SignInInputs from "../atoms/SignInInputs";
import Footer from "../atoms/Footer";

const SignIn = () => {

  
  return (
    <>
      <TopBar>
        <NotConnectedButton />
      </TopBar>

      <main className="main bg-dark">

        <section className="sign-in-content">
          <CircleUSerIcon />
          <h1>Sign In</h1>

          <form>
            <SignInInputs />
            {/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
            <NavLink to='/user/id' className="sign-in-button">
              Sign In
            </NavLink>
            {/* <!-- SHOULD BE THE BUTTON BELOW --> */}
            {/* <button className="sign-in-button">Sign In</button> */}
            {/* <!--  --> */}
          </form>
        </section>
      </main>

     <Footer />
    </>
  );
};

export default SignIn;
