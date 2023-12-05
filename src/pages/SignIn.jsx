import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircleUSerIcon from "../assets/svg/CircleUserIcon";
import TopBar from "../organisms/TopBar";
import NotConnectedButton from "../molecules/UserNotConnectedButton";
import SignInInputs from "../atoms/SignInInputs";
import Footer from "../atoms/Footer";
import useAuth from "../api/Auth";


const SignIn = () => {
  
  const { token, message, error, authentificate, profile } = useAuth()

  const navigate = useNavigate()
  const [email, setEmail] = useState('tony@stark.com') //DEV
  const [password, setPassword] = useState('password123') //DEV
  const [emailMessage, setEmailMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [fieldsValid, setFieldsValid] = useState(false)


  const handleSignInSubmit = useCallback((e) => {
    e.preventDefault();
    console.log("Form submitted");
    authentificate({email: email, password: password})
  }, [authentificate, email, password])


  const validateEmail = useCallback((email) => {
    if (email.length > 5) {
      setEmail(email)
    } else {
      setEmailMessage("email too short")
    }
    console.log(email);
  }, [setEmail])


  const validatePassword = useCallback((password) => {
    if (password.length > 3) {
      setPassword(password)
    } else {
      setPasswordMessage("password too short")
    }
  }, [setPassword])


  useEffect(() => {
    if (email.length && password.length) {
      setFieldsValid(true)
    } else {
      setFieldsValid(false)
    }
  }, [email, password])


  useEffect(() => {
    if (token && token.length) {
      console.log("token: ", token)
      navigate ('/user')
    } else if (error && error.length) {
      navigate ('/error')
    }
  }, [token, error, navigate, profile])


  
  return (
    <>
      <TopBar>
        <NotConnectedButton />
      </TopBar>

      <main className="main bg-dark">

        <section className="sign-in-content">
          <CircleUSerIcon />
          <h1>Sign In</h1>

          <form onSubmit={ handleSignInSubmit }>
            <SignInInputs
              email={email}
              validateEmail={emailMessage}
              validatePassword={passwordMessage}
              password={password}
              onEmailChange={ (e) => validateEmail(e.target.value) }
              onPasswordChange={ (e) => validatePassword(e.target.value) }
            />
            <button type="submit" className="sign-in-button" disabled={!fieldsValid}>Sign In</button>
          </form>
          <div className="login-logger">{message}</div>
        </section>
      </main>
      <Footer />
    </>
  )
}
export default SignIn;
