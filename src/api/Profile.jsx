import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import {setUserFirstName, setUserLastName} from '../rtk/slices/authSlice'
import { useEffect } from 'react';


const useUserProfile = () => {

  const HOST = 'http://localhost:3001/api/v1/user/'
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()

  //TODO get data from the store not from the localstorage

  const putFirstName = useSelector(state => state.auth.userFirstName) 
  const putLastName = useSelector(state => state.auth.userLastName)


  
  const postProfile = async() => {
    
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
      console.log('%c Erreur useUserProfile/postProfile: ', 'color:red', err)
    }
  }

  const putProfile = async() => {

    console.log('%c putProfile/putFirstName: ', 'color:orange', putFirstName)
    console.log('%c putProfile/putLastName: ', 'color:orange', putLastName)
    
    try {
      const requestBody = {
        firstName: putFirstName,
        lastName: putLastName
      }
      
      if (!token) {
        console.log('%c putProfile/!token: ', 'color:red', token)
        return
      } else if (!requestBody.firstName) {
        console.log('%c putProfile/!requestBody.firstName: ', 'color:red', requestBody.firstName)
        return
      }else if (!requestBody.lastName) {
        console.log('%c putProfile/!requestBody.lastName: ', 'color:red', requestBody.lastName)
        return

      } else {
        const putProfileResponse = await axios.put(HOST + 'profile', requestBody, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        console.log('%c putProfile/requestBody: ', 'color:orange', requestBody)
        console.log('%c putProfileResponse.data: ', 'color:orange', putProfileResponse.data)
      }  

    } catch (err) {
      console.log('%c Erreur useUserProfile/putProfile: ', 'color:red', err)
    }

  }

  return { postProfile, putProfile }
}


export default useUserProfile