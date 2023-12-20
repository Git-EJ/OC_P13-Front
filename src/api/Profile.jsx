import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import {setUserFirstName, setUserLastName} from '../rtk/slices/authSlice'
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';


const useUserProfile = () => {

  const HOST = 'http://localhost:3001/api/v1/user/'
  const dispatch = useDispatch()
  
  const putFirstName = useSelector(state => state.auth.userFirstName) 
  const putLastName = useSelector(state => state.auth.userLastName)
  const navigate = useNavigate()

  const token = useSelector(state => state.auth.token)

  useEffect(() => {
    console.log('%c useUserProfile/putFirstName: ', 'color: indianRed', putFirstName)
    console.log('%c useUserProfile/putLastName: ', 'color: indianRed', putLastName)
    console.log('%c useUserProfile/token: ', 'color: indianRed', token)
  }, [putFirstName, putLastName, token])
  

  const postProfile = useCallback(async() => {
    
    try {
      const postProfileResponse = await axios.post(HOST + 'profile', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const { firstName, lastName } = postProfileResponse.data.body;
      
      console.log('%c postProfile/putFirstName: ', 'color:cyan', putFirstName)
      console.log('%c postProfile/putLastName: ', 'color:cyan', putLastName)
      console.log('%c postProfileResponse: ', 'color:cyan', postProfileResponse)
      console.log('%c postProfile/firstName: ', 'color:cyan', firstName)
      console.log('%c postProfile/lastName: ', 'color:cyan', lastName)
      
      dispatch(setUserFirstName(firstName))
      dispatch(setUserLastName(lastName))
      
      
    } catch (err) {
      navigate(`/error/${err.response.status}`, { 
        state: {errorprops: {
          status: err.response.status,
          statusText: err.response.statusText, 
          statusMessage: err.response.data.message
        }}
      })
      console.log('%c Erreur useUserProfile/postProfile: ', 'color:red', err)
    }
  }, [dispatch, token, putFirstName, putLastName, navigate])

  
  const putProfile = useCallback(async() => {

    console.log('%c putProfile/putFirstName: ', 'color:orange', putFirstName)
    console.log('%c putProfile/putLastName: ', 'color:orange', putLastName)
    
    try {
      const requestBody = {
        firstName: putFirstName,
        lastName: putLastName
      }

      const putProfileResponse = await axios.put(HOST + 'profile', requestBody, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        
      console.log('%c putProfile/requestBody: ', 'color:orange', requestBody)
      console.log('%c putProfileResponse.data: ', 'color:orange', putProfileResponse.data) 

    } catch (err) {
      navigate(`/error/${err.response.status}`, { 
        state: {errorprops: {
          status: err.response.status,
          statusText: err.response.statusText, 
          statusMessage: err.response.data.message
        }}
      })
      console.log('%c Erreur useUserProfile/putProfile: ', 'color:red', err)
    }
  }, [token, putFirstName, putLastName, navigate])

  return { postProfile, putProfile }
}


export default useUserProfile