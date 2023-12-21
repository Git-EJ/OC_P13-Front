import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircleUSerIcon from "../assets/svg/CircleUserIcon";
import TopBar from "../organisms/TopBar";
import UserButtons from "../molecules/UserButtons";
import SignInInputs from "../atoms/SignInInputs";
import Footer from "../atoms/Footer";
import useAuth from "../api/Auth";
import { useSelector } from "react-redux";
import useUserProfile from "../api/Profile";

const SignIn = () => {
  const navigate = useNavigate();
  const { error, authentificate } = useAuth();
  const { postProfile } = useUserProfile();

  const [email, setEmail] = useState(process.env.NODE_ENV === "development" ? "tony@stark.com" : ""); //DEV
  const [password, setPassword] = useState(process.env.NODE_ENV === "development" ? "password123" : ""); //DEV
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [fieldsValid, setFieldsValid] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const handleSignInSubmit = useCallback(
    (e) => {
      e.preventDefault();

      authentificate({ email: email, password: password });
    },
    [authentificate, email, password]
  );

  const validateEmail = useCallback(
    (email) => {
      const emailPattern =
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+(?<!\.{2})\.[a-zA-Z]{2,}$/;

      if (!emailPattern.test(email)) {
        setEmailMessage(
          "Caractère(s) non autoris(é) et/ou format email incorrect"
        );
      } else {
        setEmailMessage("");
      }
      setEmail(email);
    },
    [setEmail, setEmailMessage]
  );

  const validatePassword = useCallback(
    (password) => {
      const passwordPattern = /^[a-zA-Z0-9-_#*@&]*$/;

      if (!passwordPattern.test(password)) {
        setPasswordMessage("Caractère(s) non autorisé(s), autorisé(s): -_#*@&");
      } else {
        setPasswordMessage("");
        setPassword(password);
      }
    },
    [setPassword, setPasswordMessage]
  );

  useEffect(() => {
    if (email.length && password.length) {
      setFieldsValid(true);
    } else {
      setFieldsValid(false);
    }
  }, [email, password]);

  useEffect(() => {
    if (token && token.length) {
      postProfile();
      navigate("/user");
    } else if (error && error.length) {
      navigate("/error");
    }
  }, [token, error, navigate, postProfile]);

  return (
    <>
      <TopBar>
        <UserButtons />
      </TopBar>

      <main className="main bg-dark">
        <section className="sign-in-content">
          <div className="sign-in-content_logo">
            <CircleUSerIcon />
          </div>

          <h1 className="sign-in-content_title">Sign In</h1>

          <form onSubmit={handleSignInSubmit}>
            <SignInInputs
              email={email}
              validateEmail={emailMessage}
              validatePassword={passwordMessage}
              password={password}
              setPasswordMessage={setPasswordMessage}
              onEmailChange={(e) =>
                validateEmail(e.target.value.trim().toLowerCase())
              }
              onPasswordChange={(e) => validatePassword(e.target.value.trim())}
            />
            <button
              type="submit"
              className="sign-in-button"
              disabled={!fieldsValid}
            >
              Sign In
            </button>
          </form>
          {error ? (
            <div className="login-logger">{error.response.data.message}</div>
          ) : null}
        </section>
      </main>
      <Footer />
    </>
  );
};
export default SignIn;
