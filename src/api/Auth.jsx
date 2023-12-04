import { useCallback, useState } from 'react';
import axios from 'axios';


const useAuth = () => {
  const HOST = 'http://localhost:3001/api/v1/user/';

  const [token, setToken] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const authentificate = useCallback(async({email="", password=""}) => {
    try {
      const loginResponse = await axios.post(HOST + 'login', {
        email: email,
        password: password,
      })

      console.log('%c resp.data', 'color:green',  loginResponse.data)
      console.log('%c header: ', 'color: green', loginResponse.headers)

      const result = loginResponse.data.body.token
      console.log('%c token: ', 'color:lime', result)

      if (result && typeof result === 'string' && result.length > 0) {
        setToken(result)
        localStorage.setItem('token', result)
        await axios.post(HOST + 'profile', {}, {
          headers: {
            'Authorization': `Bearer ${result}`
          }
        })

        // console.log('%c resp.data', 'color:green', profileResponse.data.body.firstName)
        // console.log('%c resp.data', 'color:green', profileResponse.data.body.lastName)
      } else {
        setToken("")
        setMessage("user not found")
        localStorage.removeItem('token')
      }
    } catch (err) {
      console.log('%c Erreur: ', 'color:red', err)
      setToken("")
      setError(err)
      localStorage.removeItem('token')
    }
  }, [setToken, setMessage, setError])

  return { token, message, error, authentificate }
}

export default useAuth