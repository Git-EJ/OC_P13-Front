import { NavLink, useLocation } from "react-router-dom"


const Error = () => {
  const location = useLocation()
  const errorProps = location.state?.errorprops

  const errorCode = errorProps?.status || 404
  const errorStatusText = errorProps?.statusText || 'Not Found'
  const errorMessage = errorProps?.statusMessage || 'Server Error or Page not found'

  
  return (
    <div className="error_container">
      <h1 className="error_code">{errorCode}</h1>
      <NavLink to="/" className='error_homebutton'>Go to Homepage</NavLink>
      <p className="error_text">{errorStatusText}</p>
      <p className="error_text">{errorMessage}</p>
    </div>
  )
}

export default Error