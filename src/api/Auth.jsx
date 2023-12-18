import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { clearToken, setToken } from '../rtk/slices/authSlice';
import { useNavigate } from 'react-router';


const useAuth = () => {
  const HOST = 'http://localhost:3001/api/v1/user/'
  const navigate = useNavigate()

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
      
      err.response.data.message === "Error: User not found!" || err.response.data.message === "Error: Password is invalid" 
      ? setError(err) 
      : navigate(`/error/${err.response.status}`, { 
        state: {errorprops: {
          status: err.response.status,
          statusText: err.response.statusText, 
          statusMessage: err.response.data.message
        }}
      })

      console.log('%c Auth-erreur: ', 'color:red', err)
    }
  }, [dispatch, navigate])

  return { message, error, authentificate }
}

export default useAuth