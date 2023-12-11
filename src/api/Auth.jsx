import { useCallback, useContext, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { clearToken, setToken } from '../rtk/slices/authSlice';
import UserContext from '../context/UserContext';


const useAuth = () => {
  const HOST = 'http://localhost:3001/api/v1/user/';

  const dispatch = useDispatch()
  const rememberMe = useContext(UserContext).rememberMe || localStorage.getItem('rememberMe')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')


  const authentificate = useCallback(async({ email="", password="" }) => {
    try {
      const loginResponse = await axios.post(HOST + 'login', {
        email: email,
        password: password,
      })
      console.log('%c resp.data', 'color:green',  loginResponse.data)


      //TODO check if it is still valid??
      const token = loginResponse.data.body.token

      if (token && typeof token === 'string' && token.length > 0) {
        if (rememberMe) {
          dispatch(setToken(token))
          localStorage.setItem('token', token)
        } else {
          dispatch(setToken(token))
        }
        setMessage("You are logged in")
        
      } else {
        dispatch(clearToken())
        setMessage("Token trouble")
        localStorage.removeItem('token')
      }

    } catch (err) {
      dispatch(clearToken())
      localStorage.clear()
      setError(err)
      console.log('%c Auth-erreur: ', 'color:red', err)
    }
  }, [dispatch, setMessage, setError, rememberMe])

  return { message, error, authentificate }
}

export default useAuth