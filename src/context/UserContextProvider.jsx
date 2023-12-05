import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import UserContext from './UserContext';


const UserContextProvider = ({ children }) => {
 
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('%c user contextProvider: ', 'color:lime', user)
  }, [user])

  return (
    <UserContext.Provider value={{ setUser, user }}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}


export default UserContextProvider;