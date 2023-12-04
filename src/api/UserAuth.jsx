import axios from 'axios';

const url = 'http://localhost:3001/api/v1/user/';

const UserAuth = async () => {
  try {
    const loginResponse = await axios.post(url + 'login', {
      email: "tony@stark.com",
      password: "password123"
    })

    console.log('%c resp.data', 'color:green',  loginResponse.data);
    const token = loginResponse.data.body.token;
    console.log('%c token: ', 'color:lime', token);
    token && localStorage.setItem('token', token);
    console.log('%c localStorage.getItem(token): ', 'color:lime', localStorage.getItem('token'));
    console.log('%c header: ', 'color: green', loginResponse.headers);

    const storedToken = localStorage.getItem('token');
    if (token || storedToken !== null) {
      const profileResponse = await axios.post(url + 'profile', {}, {
        headers: {
          'Authorization': `Bearer ${storedToken}`
        }
      }) 
      console.log('%c TOKEN: ', 'color:lime', localStorage.getItem('token'));
      console.log('%c resp.data', 'color:green', profileResponse.data);
      console.log('%c resp.data', 'color:green', profileResponse.data.body.firstName);
      console.log('%c resp.data', 'color:green', profileResponse.data.body.lastName);
    }
  } catch (err) {
    console.log('%c Erreur: ', 'color:red', err);
  }
}

export default UserAuth;
















// import axios from 'axios'


// const url = 'http://localhost:3001/api/v1/user/'

// const UserAuth = async () => {
  
//   await axios.post(url + 'login', {
//     email: "tony@stark.com",
//     password: "password123"
//   })

//   .then((resp) => {
//     console.log('%c resp.data', 'color:green',  resp.data)
//     const token = resp.data.body.token
//     console.log('%c token: ', 'color:lime', token)
//     token && localStorage.setItem('token', token)
//     console.log('%c localStorage.getItem(token): ', 'color:lime', localStorage.getItem('token'))
//     console.log('%c header: ', 'color: green', resp.headers)
//   })
//   .catch((err) => {
//     console.log('%c Erreur de réponse du serveur: ', 'color: red', err.response.data)
//     console.log('%c Erreur, statut de la réponse du serveur: ', 'color: red', err.response.status)
//     console.log('%c Erreur, headers: ', 'color: red', err.response.headers)
//     console.log('%c Erreur de requete: ', 'color: red', err.request)
//     console.log('%c Error message: ', 'color:red', err.message)
//   })
//   const token = localStorage.getItem('token')

//   if (token !== null) {

//     await axios.post(url + 'profile', {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
      
//       .then((resp) => {
//         console.log('%c TOKEN: ', 'color:lime', localStorage.getItem('token'))
//         console.log('%c resp.data', 'color:green',  resp.data)
//       })

//       .catch((err) => {
//         console.log('%c', 'toto', 'color:red', err)
//       })
//     })
//   }
// }

// export default UserAuth







// const UserAuth = async () => {

//   try {
//     const resp = await axios.post(url, {

//       body: {
//         email: "tony@stark.com",
//         password: "password123"
//       },

//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       },
  
//       withCredentials: true
//     })
    
//     if (resp.ok) {
//       const token = resp.data.body.token
//       console.log('%c Token: ', 'color: lime', token);
//       localStorage.setItem('token', token)
    
//       axios.defaults.headers.common = {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       }
//       console.log('%c Response data: ', 'color: green', resp.data)
//     } else {
//       throw new Error(resp.error)
//     }
  
//   } catch (err) {
//     if (err.response) {
//       console.log('%c Erreur de réponse du serveur: ', 'color: red', err.response.data)
//       console.log('%c Erreur, statut de la réponse du serveur: ', 'color: red', err.response.status)
//       console.log('%c Erreur, headers: ', 'color: red', err.response.headers)
//     } else if (err.request) {
//       console.log('%c Erreur de requete: ', 'color: red', err.request)
//     } else {
//       console.log('%c Error message: ', 'color:red', err.message)
//     }
//   }
// }