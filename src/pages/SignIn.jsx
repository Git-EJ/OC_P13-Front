import CircleUSerIcon from "../assets/svg/CircleUserIcon"

const SignIn = () => {

  return (
    <>
      <nav className="main-nav">
        <a className="main-nav-logo" href="./index.html">
          <img
            className="main-nav-logo-image"
            src="/src/assets/img/argentBankLogo.png"            
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <a className="main-nav-item" href="./sign-in.html">
            <CircleUSerIcon />
            Sign In
          </a>
        </div>
      </nav>

      <main className="main bg-dark">
        <section className="sign-in-content">
          <CircleUSerIcon />
          <h1>Sign In</h1>
          <form>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
            <a href="./user.html" className="sign-in-button">
              Sign In
            </a>
            {/* <!-- SHOULD BE THE BUTTON BELOW --> */}
            {/* <!-- <button className="sign-in-button">Sign In</button> --> */}
            {/* <!--  --> */}
          </form>
        </section>
      </main>
      
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
}

export default SignIn