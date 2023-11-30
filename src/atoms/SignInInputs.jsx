const SignInInputs = () => {

  const arrayOfInputs = [
    {
      label: "Username",
      text: "Username",
      type: "text",
      id: "username",
    },
    {
      label: "Password",
      text: "Password",
      type: "password",
      id: "password",
    },
    {
      label: "Remember me",
      text: "Remember me",
      type: "checkbox",
      id: "remember-me",
    }
  ]

  return(
    <>
      {arrayOfInputs.map((input, index) => {
        return (
          <div className="input-wrapper" key={`input${index}`}>
            <label htmlFor={input.id}>{input.label}</label>
            <input type={input.type} id={input.id} />
          </div>
        )
      })}
    </>
  )
}

export default SignInInputs