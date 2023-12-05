import axios from 'axios';
import UserContext from "../context/UserContext";
import { useContext } from 'react';

const useUserProfile = () => {
  const HOST = 'http://localhost:3001/api/v1/user/'

  const { user, setUser } = useContext(UserContext)

  const token = localStorage.getItem('token')

  const profile = async() => {
    try {
      const profileResponse = await axios.post(HOST + 'profile', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    
      const { firstName, lastName } = profileResponse.data.body;
    
      setUser({ firstName, lastName })
      
      console.log('%c USER profile jsx: ', 'color:orange', user)

    } catch (err) {
      console.log('%c Erreur: ', 'color:red', err)
    }
  }
  return { profile }
}

export default useUserProfile;