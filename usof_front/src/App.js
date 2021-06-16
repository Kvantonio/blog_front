import './App.css';
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import  {Posts, SinglePost}  from './components/posts'
import  { Login, Logout, Registration, ResetPassword }  from './components/auth/Login'

export default function App() {
  return (
      <>
        <BrowserRouter>

            <Switch>
                
                <Route exact path='/posts' component={ Posts } />
                <Route path='/posts/:post_id' component={ SinglePost } />
                <Route path='/login/' component={ Login } />
                <Route path='/registration/' component={ Registration } />
                <Route path='/logout/' component={ Logout } />
                <Route path='/reset_password/' component={ ResetPassword } />
                
            </Switch>

        </BrowserRouter>
        </>
  );
}

