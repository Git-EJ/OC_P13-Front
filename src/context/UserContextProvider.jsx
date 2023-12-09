import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import UserContext from './UserContext'


const UserContextProvider = ({ children }) => {
 
  const [user, setUser] = useState(null)
  const [rememberMe, setRememberMe] = useState(null) 

  useEffect(() => {
    console.log('%c user contextProvider: ', 'color:pink', user)
    console.log('%c rememberMe contextProvider: ', 'color:pink', rememberMe)
  }, [user, rememberMe])

  return (
    <UserContext.Provider value={{ setUser, user, setRememberMe, rememberMe }}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}


export default UserContextProvider;