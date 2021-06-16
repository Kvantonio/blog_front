import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'



export function ResetPassword() {
  const [ isReset, setIsReset ] = useState(false)
  let data = {
    email: '',
    token:'',
    password: '',
    confirm_pass: ''
  }

  const sendToken = (e) => {
    e.preventDefault()
    data.email = e.target.email.value

    axios.post(`http://127.0.0.1:8000/api/auth/password_reset`, { email: data.email })
      .then(() => setIsReset(true));
  };

  const resetPass = (e) => {
    e.preventDefault()
    data.token = e.target.token.value
    data.password = e.target.password.value
    data.confirm_pass = e.target.confirm_pass.value
    
    if (data.password != data.confirm_pass)
      console.log('incorrect pass')
    
    axios.post(`http://127.0.0.1:8000/api/auth/password_reset/${data.token}`, {password: data.password})
      .then(console.log('Sucsess'));
  };

  

  return(
    <div className="login-wrapper">
        {
          !isReset ?
            <>
              <h1>Forgot password</h1>
              <form onSubmit={sendToken}>
                <label>
                  <p>Email</p>
                  <input name="email" type="email"/>
                </label>
                <div>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </> :
            <>
            <h1>Reset password</h1>
              <form onSubmit={resetPass}>
                <label>
                  <p>Token</p>
                  <input name="token" type="text"/>
                </label>
                <br />
                <label>
                  <p>Password</p>
                  <input  name="password" type="password"/>
                </label>
                <label>
                  <p>Confirm password</p>
                  <input name="confirm_pass" type="password"/>
                </label>
                <div>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </>
        }
      </div>
  )
}




export function Registration() {


  let data = {
    name: '',
    email: '',
    password: '',
    confirm_pass: ''
}

  const registrateUser = (e) => {
    e.preventDefault()
    data.name = e.target.name.value
    data.email = e.target.email.value
    data.password = e.target.password.value
    data.confirm_pass = e.target.confirm_pass.value
    
    if (data.password != data.confirm_pass){
      console.log('incorrect pass')
    }
    else{
      axios.post(`http://127.0.0.1:8000/api/auth/registration/`, {
        name: data.name,
        password: data.password,
        email: data.email
      }).then();
    }
  };

  return(
    <div className="login-wrapper">
        <h1>Registration</h1>
        <form onSubmit={registrateUser}>
          <label>
            <p>Login</p>
            <input name="name" type="text"/>
          </label>
          
          <label>
            <p>Email</p>
            <input name="email" type="email"/>
          </label>
          <label>
            <p>Password</p>
            <input  name="password" type="password"/>
          </label>
          <label>
            <p>Confirm password</p>
            <input name="confirm_pass" type="password"/>
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
  )
}




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

    const setToken = (e) => {
      e.preventDefault()

      log.email = e.target.email.value
      log.password = e.target.password.value

      axios.post(`http://127.0.0.1:8000/api/auth/login/`, { email: log.email, password: log.password })
      .then(response => Cookies.set('token', response.data.access_token));
    }

    return(
      <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form onSubmit={setToken}>
          <label>
            <p>Email</p>
            <input type="text" name="email"/>
          </label>
          <label>
            <p>Password</p>
            <input type="password" name="password"/>
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }