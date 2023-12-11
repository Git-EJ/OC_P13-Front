import { useCallback, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { clearToken, setToken } from '../rtk/slices/authSlice';


const useAuth = () => {
  const HOST = 'http://localhost:3001/api/v1/user/';

  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')


  const authentificate = useCallback(async({ email="", password="" }) => {
    try {
      const loginResponse = await axios.post(HOST + 'login', {
        email: email,
        password: password,
      })
      console.log('%c resp.data', 'color:green',  loginResponse.data)


      const token = loginResponse.data.body.token

      if (token && typeof token === 'string' && token.length > 0) {
        dispatch(setToken(token)) 
        setMessage("You are logged in")

      } else {
        dispatch(clearToken())
        setMessage("Token trouble")
      }

    } catch (err) {
      dispatch(clearToken())
      setError(err)
      console.log('%c Auth-erreur: ', 'color:red', err)
    }
  }, [dispatch, setMessage, setError])

  return { message, error, authentificate }
}

export default useAuth