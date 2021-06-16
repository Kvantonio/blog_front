import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'


// export function Register() {

//   useEffect(() => {
//     axios.post(`http://127.0.0.1:8000/api/auth/logout/`, {header: 'Bearer '+Cookies.get('token')}).then(Cookies.remove('token'));
    
//   }, []);

//   return(
//     <div className="login-wrapper">
//         <h1>Please Log In</h1>
//         <form onSubmit={setToken}>
//           <label>
//             <p>Email</p>
//             <input type="text" onChange={getEmail}/>
//           </label>
//           <label>
//             <p>Password</p>
//             <input type="password" onChange={getPassword}/>
//           </label>
//           <div>
//             <button type="submit">Submit</button>
//           </div>
//         </form>
//       </div>
//   )
// }


export function Logout() {

  useEffect(() => {
    axios.post(`http://127.0.0.1:8000/api/auth/logout/`, {header: 'Bearer '+Cookies.get('token')}).then(Cookies.remove('token'));
    
  }, []);

  return(
    <div>
      Sucsess
    </div>
  )
}


export function Login() {

    let log = {
        email: '',
        password: ''
    }

    const getEmail = e => {
        log.email = e.target.value
    }

    const getPassword = e => {
        log.password = e.target.value
    }

    const setToken = (e) => {
      e.preventDefault()
      axios.post(`http://127.0.0.1:8000/api/auth/login/`, { email: log.email, password: log.password })
      .then(response => Cookies.set('token', response.data.access_token));
    }

    return(
      <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form onSubmit={setToken}>
          <label>
            <p>Email</p>
            <input type="text" onChange={getEmail}/>
          </label>
          <label>
            <p>Password</p>
            <input type="password" onChange={getPassword}/>
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }