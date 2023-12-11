import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import {setUserFirstName, setUserLastName} from '../rtk/slices/authSlice'


const useUserProfile = () => {

  const HOST = 'http://localhost:3001/api/v1/user/'
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()

  const profile = async() => {
    
    try {
      const profileResponse = await axios.post(HOST + 'profile', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    
    
      const { firstName, lastName } = profileResponse.data.body;
      
      console.log('%c firstName: ', 'color:cyan', firstName)
      console.log('%c lastName: ', 'color:cyan', lastName)
      
      dispatch(setUserFirstName(firstName))
      dispatch(setUserLastName(lastName))
      
      
    } catch (err) {
      console.log('%c Erreur useUserProfile: ', 'color:red', err)
    }
  }
  return { profile }
}


export default useUserProfile;