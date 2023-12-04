import { useMemo, useState } from "react"
import PropTypes from 'prop-types'

const SignInInputs = ({
  email,
  validateEmail,
  onEmailChange=()=>{},
  password,
  validatePassword,
  onPasswordChange=()=>{}
}) => {

  const [checked, setChecked] = useState(!!localStorage.getItem('remember-me'))

  const arrayOfInputs = useMemo(() => [
    {
      label: "Username",
      text: "Username",
      type: "email",
      id: "username",
      value: email,
      error: validateEmail,
      stateUpdater: (e) => onEmailChange(e),
    },
    {
      label: "Password",
      text: "Password",
      type: "password",
      id: "password",
      value: password,
      error: validatePassword,
      stateUpdater: (e) => onPasswordChange(e),
    },
    {
      label: "Remember me",
      text: "Remember me",
      type: "checkbox",
      id: "remember-me",
      value: checked,
      stateUpdater: (e) => {
        setChecked(e.target.checked)
        localStorage.setItem("remember-me", e.target.checked)
      },
    }
  ], [checked, email, password, onEmailChange, onPasswordChange, validateEmail, validatePassword])
  
  return(
    <>
      {arrayOfInputs.map((input, index) => {
        return (
          <div className="input-wrapper" key={`input${index}`}>
            <label htmlFor={input.id}>{input.label}</label>
            <input 
              type={input.type}
              id={input.id}
              value={input.value}
              checked={!!input.value}
              onChange={(e) => input.stateUpdater(e)}
            />
            <div className="error-message">{input.error}</div>
          </div>
        )
      })}
    </>
  )
}

SignInInputs.propTypes = {
  email: PropTypes.string,
  validateEmail: PropTypes.string,
  onEmailChange: PropTypes.func,
  password: PropTypes.string,
  validatePassword: PropTypes.string,
  onPasswordChange: PropTypes.func,
}

SignInInputs.defaultProps = {
  email: '',
  password: '',
  onEmailChange: () => {},
  onPasswordChange: () => {},
}

export default SignInInputs