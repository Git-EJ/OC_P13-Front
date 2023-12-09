import { useContext, useMemo } from "react"
import PropTypes from 'prop-types'
import UserContext from "../context/UserContext"


const SignInInputs = ({
  email,
  validateEmail,
  onEmailChange=()=>{},
  password,
  validatePassword,
  onPasswordChange=()=>{},
}) => {
  
  const { rememberMe, setRememberMe } = useContext(UserContext)

  rememberMe ? localStorage.setItem('remember-me', true) : localStorage.setItem('remember-me', false)


  const arrayOfInputs = useMemo(() => [
    {
      label: "Username",
      text: "Username",
      type: "email",
      id: "username",
      value: email,
      placeholder: "example@domain.com",
      error: validateEmail,
      required: true,
      stateUpdater: (e) => onEmailChange(e),
    },
    {
      label: "Password",
      text: "Password",
      type: "password",
      id: "password",
      value: password,
      placeholder: "8 to 32 characters",
      error: validatePassword,
      required: true,
      minLength: 8,
      maxLength: 32,
      stateUpdater: (e) => onPasswordChange(e),
    },
    {
      label: "Remember me",
      text: "Remember me",
      type: "checkbox",
      id: "remember-me",
      checked: rememberMe,
      required: false,
      stateUpdater: (e) => {
        setRememberMe(e.target.checked)
        localStorage.setItem("remember-me", e.target.checked)
      },
    }
  ], [rememberMe, setRememberMe, email, password, onEmailChange, onPasswordChange, validateEmail, validatePassword])
  
  return(
    <>
      {arrayOfInputs.map((input, index) => {
        return (
          <div className="input-wrapper" key={`input${index}`}>
            <label htmlFor={input.id}>{input.label}</label>
            {input.type !== "checkbox" ? (
              <input 
                type= {input.type}
                id= {input.id}
                defaultValue= {input.value}
                placeholder={input.placeholder}
                required= {input.required}
                minLength={input.minLength ? input.minLength : null}
                maxLength={input.maxLength ? input.maxLength : null}
                onBlur= {(e) => input.stateUpdater(e)}
              />
            ) : (
              <input 
                type= {input.type}
                id= {input.id}
                defaultChecked= {!!input.checked}
                required= {input.required}
                onChange= {(e) => input.stateUpdater(e)}
              />
            )}
            <div className="input_error-message">{input.error}</div>
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