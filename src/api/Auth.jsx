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
        localStorage.setItem('token', token)
        console.log('%c User FOUND', 'color:lime')

      } else {
        dispatch(clearToken())
        setMessage("user not found")
        localStorage.removeItem('token')
      }

    } catch (err) {
      dispatch(clearToken())
      setError(err)
      localStorage.removeItem('token')
      localStorage.removeItem('remember-me')
      console.log('%c Erreur: ', 'color:red', err)
    }
  }, [dispatch, setMessage, setError])

  return { message, error, authentificate }
}

export default useAuth