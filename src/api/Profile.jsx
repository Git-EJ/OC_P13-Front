import axios from 'axios';
import UserContext from "../context/UserContext";
import { useContext, useEffect} from 'react';
import { useSelector } from 'react-redux';


const useUserProfile = () => {

  const HOST = 'http://localhost:3001/api/v1/user/'
  const { user, setUser } = useContext(UserContext)
  const token = useSelector(state => state.auth.token) || localStorage.getItem('token')
  
  useEffect(() => {
  console.log('%c USER profile jsx: ', 'color:orange', user)
  }, [user])

  const profile = async() => {

    try {
      const profileResponse = await axios.post(HOST + 'profile', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    
      const { firstName, lastName } = profileResponse.data.body;
      setUser({ firstName, lastName })
      // localStorage.setItem('userFirstName', JSON.stringify(firstName)) //TODO good practice for bank app?
      // localStorage.setItem('userLastName', JSON.stringify(lastName)) //TODO good practice for bank app?
   
    } catch (err) {
      console.log('%c Erreur: ', 'color:red', err)
    }
  }
  return { profile }
}

export default useUserProfile;