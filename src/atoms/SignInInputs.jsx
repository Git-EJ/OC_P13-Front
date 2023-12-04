import { useState } from "react"


const SignInInputs = () => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  
  
  const arrayOfInputs = [
    {
      label: "Username",
      text: "Username",
      type: "email",
      id: "username",
      value: userName,
      statUpdater: setUserName,
    },
    {
      label: "Password",
      text: "Password",
      type: "password",
      id: "password",
      value: password,
      statUpdater: setPassword,
    },
    {
      label: "Remember me",
      text: "Remember me",
      type: "checkbox",
      id: "remember-me",
      statUpdater: setRememberMe,
    }
  ]


  const handleInputChange = (e, stateUpdater) => {
    stateUpdater(e.target.type === 'checkbox' ? e.target.checked : e.target.value)
  }


  console.log('userName: ', userName);
  console.log('password: ', password);
  console.log('rememberMe: ', rememberMe);

  
  return(
    <>
      {arrayOfInputs.map((input, index) => {
        return (
          <div className="input-wrapper" key={`input${index}`}>
            <label htmlFor={input.id}>{input.label}</label>
            { !input.type === 'checkbox' ?
              ( <input 
                type={input.type}
                id={input.id} 
                value={input.value}
                onChange={(e) => handleInputChange(e, input.statUpdater)}
                /> 
              ) 
              : 
              ( <input 
                  type={input.type} 
                  id={input.id} 
                  onChange={(e) => handleInputChange(e, input.statUpdater)}
                /> 
              )
            }
          </div>
        )
      })}
    </>
  )
}

export default SignInInputs